import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcryptjs';
import jwt from '@tsndr/cloudflare-worker-jwt';

const app = new Hono();

// CORS configuration
const allowedOrigins = [
  'http://localhost:3000',
  'https://chatbot.prosperonline.ca'
];

// CORS for authenticated routes
app.use('/api/auth/*', cors({
  origin: allowedOrigins,
  credentials: true,
}));

app.use('/api/chatbots/*', cors({
  origin: allowedOrigins,
  credentials: true,
}));

// CORS for public routes (widget)
app.use('/api/chat', cors({
  origin: '*',
}));

app.use('/widget.js', cors({
  origin: '*',
}));

// Middleware to initialize Supabase
app.use('*', async (c, next) => {
  const supabase = createClient(c.env.SUPABASE_URL, c.env.SUPABASE_KEY);
  c.set('supabase', supabase);
  await next();
});

// Auth middleware
const authenticateToken = async (c, next) => {
  const authHeader = c.req.header('authorization');
  const token = authHeader?.split(' ')[1];
  
  if (!token) {
    return c.json({ error: 'Token required' }, 401);
  }

  try {
    const isValid = await jwt.verify(token, String(c.env.JWT_SECRET));
    if (!isValid) {
      return c.json({ error: 'Invalid token' }, 403);
    }
    
    const payload = jwt.decode(token);
    c.set('user', payload.payload);
    await next();
  } catch (error) {
    return c.json({ error: 'Invalid token' }, 403);
  }
};

// Basic routes
app.get('/health', (c) => c.json({ status: 'ok', timestamp: new Date().toISOString() }));
app.get('/', (c) => c.json({ message: 'Chatbot API (Cloudflare)', version: '3.3.0' }));

// === AUTH ROUTES ===
app.post('/api/auth/register', async (c) => {
  try {
    const { email, password } = await c.req.json();
    if (!email || !password) {
      return c.json({ error: 'Email and password required' }, 400);
    }

    const supabase = c.get('supabase');
    
    const { data: existing } = await supabase
      .from('users')
      .select('id')
      .eq('email', email.toLowerCase());
      
    if (existing?.length > 0) {
      return c.json({ error: 'Email already registered' }, 400);
    }

    const hash = await bcrypt.hash(password, 10);
    const { data, error } = await supabase
      .from('users')
      .insert([{ email: email.toLowerCase(), password_hash: hash }])
      .select()
      .single();

    if (error) throw error;

    const token = await jwt.sign(
      { userId: data.id, email: data.email },
      String(c.env.JWT_SECRET)
    );

    return c.json({ token, user: { id: data.id, email: data.email } });
  } catch (error) {
    return c.json({ error: error.message }, 500);
  }
});

app.post('/api/auth/login', async (c) => {
  try {
    const { email, password } = await c.req.json();
    if (!email || !password) {
      return c.json({ error: 'Email and password required' }, 400);
    }

    const supabase = c.get('supabase');
    const { data: users, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email.toLowerCase())
      .single();
      
    if (error || !users) {
      return c.json({ error: 'Invalid credentials' }, 401);
    }

    const valid = await bcrypt.compare(password, users.password_hash);
    if (!valid) {
      return c.json({ error: 'Invalid credentials' }, 401);
    }

    const token = await jwt.sign(
      { userId: users.id, email: users.email },
      String(c.env.JWT_SECRET)
    );

    return c.json({ token, user: { id: users.id, email: users.email } });
  } catch (error) {
    return c.json({ error: error.message }, 500);
  }
});

// === CHATBOTS ===
app.get('/api/chatbots', authenticateToken, async (c) => {
  try {
    const user = c.get('user');
    const supabase = c.get('supabase');
    
    const { data, error } = await supabase
      .from('chatbots')
      .select('*')
      .eq('user_id', user.userId)
      .order('created_at', { ascending: false });
      
    if (error) throw error;
    return c.json(data);
  } catch (error) {
    return c.json({ error: error.message }, 500);
  }
});

app.post('/api/chatbots', authenticateToken, async (c) => {
  try {
    const user = c.get('user');
    const { name, color, welcomeMessage } = await c.req.json();
    const id = 'cb_' + Math.random().toString(36).substr(2, 9);

    const supabase = c.get('supabase');
    const { data, error } = await supabase
      .from('chatbots')
      .insert([{
        id,
        user_id: user.userId,
        name: name || 'My Chatbot',
        color: color || '#667eea',
        welcome_message: welcomeMessage || 'Hi!'
      }])
      .select()
      .single();

    if (error) throw error;
    return c.json(data);
  } catch (error) {
    return c.json({ error: error.message }, 500);
  }
});

app.put('/api/chatbots/:id', authenticateToken, async (c) => {
  try {
    const user = c.get('user');
    const { name, color, welcomeMessage, isDeployed } = await c.req.json();
    const chatbotId = c.req.param('id');

    const supabase = c.get('supabase');
    const { data, error } = await supabase
      .from('chatbots')
      .update({ name, color, welcome_message: welcomeMessage, is_deployed: isDeployed })
      .eq('id', chatbotId)
      .eq('user_id', user.userId)
      .select()
      .single();

    if (error) throw error;
    return c.json(data);
  } catch (error) {
    return c.json({ error: error.message }, 500);
  }
});

// === DOCUMENTS ===
app.get('/api/chatbots/:id/documents', authenticateToken, async (c) => {
  try {
    const chatbotId = c.req.param('id');
    const supabase = c.get('supabase');
    
    const { data, error } = await supabase
      .from('documents')
      .select('*')
      .eq('chatbot_id', chatbotId);
      
    if (error) throw error;
    return c.json(data);
  } catch (error) {
    return c.json({ error: error.message }, 500);
  }
});

app.post('/api/chatbots/:id/documents', authenticateToken, async (c) => {
  try {
    const chatbotId = c.req.param('id');
    const formData = await c.req.formData();
    const file = formData.get('file');
    
    if (!file) {
      return c.json({ error: 'No file uploaded' }, 400);
    }

    const buffer = await file.arrayBuffer();
    const content = new TextDecoder().decode(buffer);

    const supabase = c.get('supabase');
    const { data, error } = await supabase
      .from('documents')
      .insert([{
        chatbot_id: chatbotId,
        filename: file.name,
        content,
        file_type: file.type,
        file_size: file.size,
        status: 'ready'
      }])
      .select()
      .single();

    if (error) throw error;
    return c.json(data);
  } catch (error) {
    return c.json({ error: error.message }, 500);
  }
});

app.delete('/api/chatbots/:id/documents/:docId', authenticateToken, async (c) => {
  try {
    const chatbotId = c.req.param('id');
    const docId = c.req.param('docId');
    
    const supabase = c.get('supabase');
    const { error } = await supabase
      .from('documents')
      .delete()
      .eq('id', docId)
      .eq('chatbot_id', chatbotId);
      
    if (error) throw error;
    return c.json({ success: true });
  } catch (error) {
    return c.json({ error: error.message }, 500);
  }
});

// === CHAT ENDPOINT ===
app.post('/api/chat', async (c) => {
  try {
    const { chatbotId, message } = await c.req.json();
    if (!chatbotId || !message) {
      return c.json({ error: 'Missing required parameters' }, 400);
    }

    const supabase = c.get('supabase');
    const { data: documents } = await supabase
      .from('documents')
      .select('content')
      .eq('chatbot_id', chatbotId);

    if (!documents || documents.length === 0) {
      return c.json({ error: 'No training data found for this chatbot' }, 404);
    }

    const context = documents.map(doc => doc.content).join('\\n\\n');

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${c.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: `You are a helpful AI assistant. Use the following context to answer questions: ${context}`
          },
          {
            role: 'user',
            content: message
          }
        ],
        max_tokens: 150
      })
    });

    const data = await response.json();
    return c.json({ response: data.choices[0].message.content });
  } catch (error) {
    return c.json({ error: 'Failed to process chat message' }, 500);
  }
});

// Serve widget.js
app.get('/widget.js', async (c) => {
  const widgetCode = `
(function() {
    if (!window.chatbotConfig) {
        console.error('Chatbot configuration not found!');
        return;
    }

    const config = window.chatbotConfig;
    if (!config.chatbotId || !config.apiUrl) {
        console.error('Missing required chatbot configuration!');
        return;
    }

    // Create chatbot UI
    const chatbotContainer = document.createElement('div');
    chatbotContainer.id = 'ai-chatbot-container';
    chatbotContainer.style.cssText = \`
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 1000;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
    \`;

    // Create chat window
    const chatWindow = document.createElement('div');
    chatWindow.id = 'ai-chatbot-window';
    chatWindow.style.cssText = \`
        display: none;
        width: 350px;
        height: 500px;
        background: white;
        border-radius: 10px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        margin-bottom: 10px;
        overflow: hidden;
        flex-direction: column;
    \`;

    // Chat header
    const chatHeader = document.createElement('div');
    chatHeader.style.cssText = \`
        padding: 15px;
        background: \${config.color || '#667eea'};
        color: white;
        font-family: system-ui, -apple-system, sans-serif;
        font-weight: 600;
    \`;
    chatHeader.textContent = config.name || 'AI Chat';

    // Chat messages container
    const messagesContainer = document.createElement('div');
    messagesContainer.style.cssText = \`
        flex: 1;
        padding: 15px;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        gap: 10px;
        background: #f9fafb;
    \`;

    // Input container
    const inputContainer = document.createElement('div');
    inputContainer.style.cssText = \`
        padding: 15px;
        border-top: 1px solid #e5e7eb;
        display: flex;
        gap: 10px;
        background: white;
    \`;

    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Type your message...';
    input.style.cssText = \`
        flex: 1;
        padding: 8px 12px;
        border: 1px solid #d1d5db;
        border-radius: 6px;
        font-size: 14px;
        outline: none;
    \`;

    const sendButton = document.createElement('button');
    sendButton.textContent = 'Send';
    sendButton.style.cssText = \`
        padding: 8px 16px;
        background: \${config.color || '#667eea'};
        color: white;
        border: none;
        border-radius: 6px;
        font-weight: 600;
        cursor: pointer;
    \`;

    // Toggle button
    const toggleButton = document.createElement('button');
    toggleButton.style.cssText = \`
        width: 60px;
        height: 60px;
        border-radius: 30px;
        background: \${config.color || '#667eea'};
        color: white;
        border: none;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 24px;
    \`;
    toggleButton.innerHTML = '💬';

    // Assemble UI
    inputContainer.appendChild(input);
    inputContainer.appendChild(sendButton);

    chatWindow.appendChild(chatHeader);
    chatWindow.appendChild(messagesContainer);
    chatWindow.appendChild(inputContainer);

    chatbotContainer.appendChild(chatWindow);
    chatbotContainer.appendChild(toggleButton);

    document.body.appendChild(chatbotContainer);

    // Event handlers
    toggleButton.onclick = () => {
        const isVisible = chatWindow.style.display === 'flex';
        chatWindow.style.display = isVisible ? 'none' : 'flex';
        if (!isVisible) input.focus();
    };

    // Message handling
    function addMessage(text, isUser = false) {
        const message = document.createElement('div');
        message.style.cssText = \`
            padding: 10px 15px;
            border-radius: 10px;
            max-width: 80%;
            \${isUser ? 'background: ' + config.color + '; color: white; align-self: flex-end;' 
                    : 'background: white; border: 1px solid #e5e7eb; align-self: flex-start;'}
            font-family: system-ui, -apple-system, sans-serif;
            font-size: 14px;
        \`;
        message.textContent = text;
        messagesContainer.appendChild(message);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    async function sendMessage(text) {
        if (!text.trim()) return;
        
        addMessage(text, true);
        input.value = '';
        input.disabled = true;
        sendButton.disabled = true;

        try {
            const response = await fetch(\`\${config.apiUrl}/api/chat\`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chatbotId: config.chatbotId,
                    message: text
                })
            });

            const data = await response.json();
            if (data.error) {
                throw new Error(data.error);
            }

            addMessage(data.response);
        } catch (error) {
            addMessage('Sorry, I encountered an error. Please try again later.');
            console.error('Chat error:', error);
        } finally {
            input.disabled = false;
            sendButton.disabled = false;
            input.focus();
        }
    }

    sendButton.onclick = () => sendMessage(input.value);
    input.onkeypress = (e) => {
        if (e.key === 'Enter') sendMessage(input.value);
    };

    // Add welcome message if provided
    if (config.welcomeMessage) {
        addMessage(config.welcomeMessage);
    }
})();
  `;
  
  return c.text(widgetCode, 200, {
    'Content-Type': 'application/javascript',
  });
});

export default app;