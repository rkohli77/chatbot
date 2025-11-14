import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcryptjs';
import jwt from '@tsndr/cloudflare-worker-jwt';

// Input sanitization functions
function sanitizeInput(input) {
  if (typeof input !== 'string') return input;
  return input
    .replace(/[<>"'&]/g, (match) => {
      const entities = { '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#x27;', '&': '&amp;' };
      return entities[match];
    })
    .trim()
    .slice(0, 1000); // Limit length
}

function validateChatbotData(data) {
  return {
    name: sanitizeInput(data.name),
    color: /^#[0-9A-Fa-f]{6}$/.test(data.color) ? data.color : '#667eea',
    welcomeMessage: sanitizeInput(data.welcomeMessage)
  };
}

function logSecurityEvent(c, event, details) {
  console.warn(`[SECURITY] ${event}:`, {
    timestamp: new Date().toISOString(),
    ip: c.req.header('cf-connecting-ip') || 'unknown',
    userAgent: c.req.header('user-agent'),
    ...details
  });
}

async function logError(c, error, context) {
  const errorLog = {
    timestamp: new Date().toISOString(),
    error: error.message,
    stack: error.stack,
    context,
    ip: c.req.header('cf-connecting-ip'),
    userAgent: c.req.header('user-agent'),
    url: c.req.url,
    method: c.req.method,
    severity: 'error'
  };
  
  // Always log to Cloudflare console
  console.error('[ERROR]', errorLog);
  
  // Send to external monitoring services
  try {
    // 1. Sentry (if configured)
    if (c.env.SENTRY_DSN) {
      await fetch('https://sentry.io/api/store/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Sentry-Auth': `Sentry sentry_key=${c.env.SENTRY_KEY}`
        },
        body: JSON.stringify({
          message: error.message,
          level: 'error',
          extra: errorLog
        })
      });
    }
    
    // 2. Custom webhook (Slack, Discord, etc.)
    if (c.env.ERROR_WEBHOOK_URL) {
      await fetch(c.env.ERROR_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: `🚨 Chatbot API Error: ${error.message}`,
          attachments: [{
            color: 'danger',
            fields: [
              { title: 'Context', value: context, short: true },
              { title: 'IP', value: errorLog.ip, short: true },
              { title: 'URL', value: errorLog.url, short: false }
            ]
          }]
        })
      });
    }
    
    // 3. Database logging for critical errors
    if (context === 'CHAT_PROCESSING' || context === 'AUTH_FAILURE' || context === 'CHATBOT_CREATE') {
      const supabase = c.get('supabase');
      const user = c.get('user');
      await supabase.from('error_logs').insert([{
        error_message: error.message,
        context,
        user_id: user?.userId || null,
        ip: errorLog.ip,
        user_agent: errorLog.userAgent,
        url: errorLog.url,
        created_at: new Date().toISOString()
      }]);
    }
  } catch (monitoringError) {
    console.error('[MONITORING_ERROR]', monitoringError.message);
  }
}

async function logActivity(c, action, details = {}) {
  const activityLog = {
    timestamp: new Date().toISOString(),
    action,
    ip: c.req.header('cf-connecting-ip'),
    ...details
  };
  
  console.log(`[ACTIVITY] ${action}:`, activityLog);
  
  // Log important activities to database for audit trail
  if (['ACCOUNT_DELETED', 'DATA_EXPORT', 'PRIVACY_SETTINGS_UPDATED'].includes(action)) {
    try {
      const supabase = c.get('supabase');
      await supabase.from('activity_logs').insert([{
        action,
        user_id: details.userId,
        ip: activityLog.ip,
        details: JSON.stringify(details),
        created_at: new Date().toISOString()
      }]);
    } catch (error) {
      console.error('[ACTIVITY_LOG_ERROR]', error.message);
    }
  }
}

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

app.use('/api/user/*', cors({
  origin: allowedOrigins,
  credentials: true,
}));

// CORS for public routes (widget)
app.use('/api/chat', cors({ origin: '*' }));
app.use('/widget.js', cors({ origin: '*' }));

// Cache utilities
async function getFromCache(c, key) {
  try {
    const cached = await c.env.CHATBOT_CACHE?.get(key);
    return cached ? JSON.parse(cached) : null;
  } catch (error) {
    console.warn('[CACHE_READ_ERROR]', error.message);
    return null;
  }
}

async function setCache(c, key, value, ttl = 300) {
  try {
    await c.env.CHATBOT_CACHE?.put(key, JSON.stringify(value), { expirationTtl: ttl });
  } catch (error) {
    console.warn('[CACHE_WRITE_ERROR]', error.message);
  }
}

// Rate limiting
async function checkRateLimit(c, key, limit = 100, window = 3600) {
  try {
    const rateLimitKey = `rate:${key}`;
    const current = await c.env.CHATBOT_CACHE?.get(rateLimitKey);
    const count = current ? parseInt(current) : 0;
    
    if (count >= limit) {
      return false;
    }
    
    await c.env.CHATBOT_CACHE?.put(rateLimitKey, String(count + 1), { expirationTtl: window });
    return true;
  } catch (error) {
    console.warn('[RATE_LIMIT_ERROR]', error.message);
    return true; // Allow on error
  }
}

// Rate limiting middleware
const rateLimitMiddleware = (limit = 100, window = 3600) => {
  return async (c, next) => {
    const ip = c.req.header('cf-connecting-ip') || 'unknown';
    const allowed = await checkRateLimit(c, ip, limit, window);
    
    if (!allowed) {
      logSecurityEvent(c, 'RATE_LIMIT_EXCEEDED', { ip, limit, window });
      return c.json({ error: 'Rate limit exceeded. Please try again later.' }, 429);
    }
    
    await next();
  };
};

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
app.get('/', (c) => c.json({ message: 'Chatbot API (Cloudflare)', version: '3.4.0' }));

// === AUTH ROUTES ===
app.post('/api/auth/register', async (c) => {
  try {
    const { firstName, lastName, companyName, email, password } = await c.req.json();
    
    // Validate required fields
    if (!firstName?.trim() || !lastName?.trim() || !email || !password) {
      return c.json({ error: 'First name, last name, email and password required' }, 400);
    }
    
    // Validate name fields (letters, spaces, hyphens, apostrophes only)
    const nameRegex = /^[a-zA-Z\s\-']{1,50}$/;
    if (!nameRegex.test(firstName.trim())) {
      return c.json({ error: 'First name contains invalid characters or is too long' }, 400);
    }
    if (!nameRegex.test(lastName.trim())) {
      return c.json({ error: 'Last name contains invalid characters or is too long' }, 400);
    }
    
    // Validate company name if provided (alphanumeric, spaces, common business chars)
    if (companyName?.trim()) {
      const companyRegex = /^[a-zA-Z0-9\s\-'&.,()]{2,100}$/;
      if (!companyRegex.test(companyName.trim())) {
        return c.json({ error: 'Company name contains invalid characters or invalid length' }, 400);
      }
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
    const trialEndsAt = new Date();
    trialEndsAt.setDate(trialEndsAt.getDate() + 14); // 14-day trial
    
    const { data, error } = await supabase
      .from('users')
      .insert([{ 
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        company_name: companyName?.trim() || null,
        email: email.toLowerCase(), 
        password_hash: hash,
        trial_ends_at: trialEndsAt.toISOString()
      }])
      .select()
      .single();

    if (error) throw error;

    const token = await jwt.sign(
      { userId: data.id, email: data.email },
      String(c.env.JWT_SECRET)
    );

    return c.json({ 
      token, 
      user: { 
        id: data.id, 
        email: data.email,
        first_name: data.first_name,
        last_name: data.last_name,
        trial_ends_at: data.trial_ends_at
      } 
    });
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

    return c.json({ 
      token, 
      user: { 
        id: users.id, 
        email: users.email,
        first_name: users.first_name,
        last_name: users.last_name,
        trial_ends_at: users.trial_ends_at
      } 
    });
  } catch (error) {
    return c.json({ error: error.message }, 500);
  }
});

// === USER PROFILE ===
app.get('/api/user/profile', authenticateToken, async (c) => {
  try {
    const user = c.get('user');
    const supabase = c.get('supabase');
    
    const { data, error } = await supabase
      .from('users')
      .select('id,email,first_name,last_name,trial_ends_at,data_processing_consent,marketing_consent')
      .eq('id', user.userId)
      .single();
      
    if (error) throw error;
    logActivity(c, 'PROFILE_ACCESS', { userId: user.userId });
    return c.json(data);
  } catch (error) {
    logError(c, error, 'USER_PROFILE');
    return c.json({ error: error.message }, 500);
  }
});

// === GDPR COMPLIANCE ===
app.get('/api/user/data-export', authenticateToken, async (c) => {
  try {
    const user = c.get('user');
    const supabase = c.get('supabase');
    
    // Export all user data
    const [userData, chatbotsData, documentsData] = await Promise.all([
      supabase.from('users').select('*').eq('id', user.userId).single(),
      supabase.from('chatbots').select('*').eq('user_id', user.userId),
      supabase.from('documents').select('*').eq('user_id', user.userId)
    ]);
    
    const exportData = {
      user: userData.data,
      chatbots: chatbotsData.data || [],
      documents: (documentsData.data || []).map(doc => ({
        ...doc,
        content: doc.content ? '[CONTENT_REDACTED_FOR_EXPORT]' : null
      })),
      exportDate: new Date().toISOString()
    };
    
    logActivity(c, 'DATA_EXPORT', { userId: user.userId });
    return c.json(exportData);
  } catch (error) {
    logError(c, error, 'DATA_EXPORT');
    return c.json({ error: 'Failed to export data' }, 500);
  }
});

app.delete('/api/user/account', authenticateToken, async (c) => {
  try {
    const user = c.get('user');
    const supabase = c.get('supabase');
    
    // Delete all user data (GDPR Right to be Forgotten)
    await Promise.all([
      supabase.from('documents').delete().eq('user_id', user.userId),
      supabase.from('chatbots').delete().eq('user_id', user.userId),
      supabase.from('users').delete().eq('id', user.userId)
    ]);
    
    logActivity(c, 'ACCOUNT_DELETED', { userId: user.userId });
    return c.json({ message: 'Account and all data deleted successfully' });
  } catch (error) {
    logError(c, error, 'ACCOUNT_DELETION');
    return c.json({ error: 'Failed to delete account' }, 500);
  }
});

app.put('/api/user/privacy-settings', authenticateToken, async (c) => {
  try {
    const user = c.get('user');
    const { dataProcessingConsent, marketingConsent } = await c.req.json();
    const supabase = c.get('supabase');
    
    const { error } = await supabase
      .from('users')
      .update({
        data_processing_consent: dataProcessingConsent,
        marketing_consent: marketingConsent,
        consent_updated_at: new Date().toISOString()
      })
      .eq('id', user.userId);
    
    if (error) throw error;
    logActivity(c, 'PRIVACY_SETTINGS_UPDATED', { userId: user.userId });
    return c.json({ message: 'Privacy settings updated' });
  } catch (error) {
    logError(c, error, 'PRIVACY_SETTINGS');
    return c.json({ error: 'Failed to update privacy settings' }, 500);
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
    const rawData = await c.req.json();
    const sanitized = validateChatbotData(rawData);
    const id = 'cb_' + Math.random().toString(36).substr(2, 9);

    const supabase = c.get('supabase');
    const { data, error } = await supabase
      .from('chatbots')
      .insert([{
        id,
        user_id: user.userId,
        name: sanitized.name || 'My Chatbot',
        color: sanitized.color,
        welcome_message: sanitized.welcomeMessage || 'Hi!'
      }])
      .select()
      .single();

    if (error) throw error;
    return c.json(data);
  } catch (error) {
    logError(c, error, 'CHATBOT_CREATE');
    return c.json({ error: 'Failed to create chatbot' }, 500);
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

    // File size validation (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      return c.json({ error: 'File size exceeds 10MB limit' }, 400);
    }

    let content;
    try {
      const buffer = await file.arrayBuffer();
      content = new TextDecoder('utf-8', { fatal: true }).decode(buffer);
      
      // Check if content is readable (not just binary data)
      if (!content.trim() || content.length < 10) {
        return c.json({ error: 'File appears to be empty or unreadable. Please upload a text-based document.' }, 400);
      }
      
      // Check for binary content indicators
      if (content.includes('\0') || /[\x00-\x08\x0E-\x1F\x7F-\xFF]{10,}/.test(content)) {
        return c.json({ error: 'File appears to be binary or corrupted. Please upload a text document (TXT, CSV) or try a different file.' }, 400);
      }
      
    } catch (decodeError) {
      return c.json({ error: 'File encoding is not supported or file is corrupted. Please upload a UTF-8 text file.' }, 400);
    }

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
app.post('/api/chat', rateLimitMiddleware(50, 3600), async (c) => {
  try {
    const { chatbotId, message } = await c.req.json();
    if (!chatbotId || !message) {
      return c.json({ error: 'Missing required parameters' }, 400);
    }

    // Sanitize and validate chat input
    const sanitizedMessage = sanitizeInput(message);
    if (sanitizedMessage.length > 500) {
      logSecurityEvent(c, 'LONG_MESSAGE_BLOCKED', { length: message.length });
      return c.json({ error: 'Message too long' }, 400);
    }

    const supabase = c.get('supabase');
    const { data: documents } = await supabase
      .from('documents')
      .select('content')
      .eq('chatbot_id', chatbotId);

    if (!documents || documents.length === 0) {
      return c.json({ response: "I apologize, but I don't have enough information to answer your question at the moment. Please contact our support team for assistance." });
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
    logError(c, error, 'CHAT_PROCESSING');
    return c.json({ error: 'Failed to process chat message' }, 500);
  }
});

// Public chatbot config (no auth) - with caching
app.get('/public/chatbots/:id', cors({ origin: '*' }), rateLimitMiddleware(1000, 3600), async (c) => {
  try {
    const chatbotId = c.req.param('id');
    const cacheKey = `chatbot:${chatbotId}`;
    
    // Try cache first
    let data = await getFromCache(c, cacheKey);
    
    if (!data) {
      const supabase = c.get('supabase');
      const { data: dbData, error } = await supabase
        .from('chatbots')
        .select('name,color,welcome_message,is_deployed')
        .eq('id', chatbotId)
        .single();

      if (error || !dbData || !dbData.is_deployed) {
        return c.json({ error: 'Not found' }, 404);
      }

      data = {
        name: dbData.name,
        color: dbData.color,
        welcomeMessage: dbData.welcome_message
      };
      
      // Cache for 5 minutes
      await setCache(c, cacheKey, data, 300);
    }

    return c.json(data);
  } catch (err) {
    await logError(c, err, 'CHATBOT_CONFIG');
    return c.json({ error: 'Failed to load config' }, 500);
  }
});

// Serve widget.js with CDN caching
app.get('/widget.js', rateLimitMiddleware(200, 3600), async (c) => {
  // Set CDN cache headers
  c.header('Cache-Control', 'public, max-age=3600, s-maxage=86400'); // 1 hour browser, 24 hour CDN
  c.header('Content-Type', 'application/javascript');
  c.header('ETag', `"widget-v${Date.now()}"`);
  const widgetCode = `(async function() {
    if (!window.chatbotConfig) {
        console.error('Chatbot configuration not found!');
        return;
    }

    const cfg = window.chatbotConfig;
    if (!cfg.chatbotId || !cfg.apiUrl) {
        console.error('Missing required chatbot configuration!');
        return;
    }

    let live = {};
    try {
        const apiUrl = \`\${cfg.apiUrl}/public/chatbots/\${cfg.chatbotId}\`;
        console.log('Fetching chatbot config from:', apiUrl);
        const res = await fetch(apiUrl, { cache: 'no-store' });
        if (res.ok) {
            live = await res.json();
            console.log('Chatbot config loaded successfully');
        } else {
            console.log(\`Chatbot not deployed or not found. Status: \${res.status}, ID: \${cfg.chatbotId}\`);
            return;
        }
    } catch (e) {
        console.log('Chatbot not available:', e.message);
        return;
    }

    const config = {
        ...cfg,
        name: live.name || cfg.name || 'AI Chat',
        color: live.color || cfg.color || '#667eea',
        welcomeMessage: live.welcomeMessage || cfg.welcomeMessage
    };

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

    const chatHeader = document.createElement('div');
    chatHeader.style.cssText = \`
        padding: 15px;
        background: \${config.color || '#667eea'};
        color: white;
        font-family: system-ui, -apple-system, sans-serif;
        font-weight: 600;
        display: flex;
        justify-content: space-between;
        align-items: center;
    \`;
    
    const chatTitle = document.createElement('span');
    chatTitle.textContent = config.name || 'AI Chat';
    
    const headerButtons = document.createElement('div');
    headerButtons.style.cssText = \`
        display: flex;
        gap: 8px;
    \`;
    
    const minimizeBtn = document.createElement('button');
    minimizeBtn.innerHTML = '−';
    minimizeBtn.style.cssText = \`
        background: none;
        border: none;
        color: white;
        font-size: 18px;
        cursor: pointer;
        padding: 2px 6px;
        border-radius: 3px;
    \`;
    minimizeBtn.onmouseover = () => minimizeBtn.style.background = 'rgba(255,255,255,0.2)';
    minimizeBtn.onmouseout = () => minimizeBtn.style.background = 'none';
    
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '×';
    closeBtn.style.cssText = \`
        background: none;
        border: none;
        color: white;
        font-size: 18px;
        cursor: pointer;
        padding: 2px 6px;
        border-radius: 3px;
    \`;
    closeBtn.onmouseover = () => closeBtn.style.background = 'rgba(255,255,255,0.2)';
    closeBtn.onmouseout = () => closeBtn.style.background = 'none';
    
    headerButtons.appendChild(minimizeBtn);
    headerButtons.appendChild(closeBtn);
    chatHeader.appendChild(chatTitle);
    chatHeader.appendChild(headerButtons);

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

    inputContainer.appendChild(input);
    inputContainer.appendChild(sendButton);
    chatWindow.appendChild(chatHeader);
    chatWindow.appendChild(messagesContainer);
    chatWindow.appendChild(inputContainer);
    chatbotContainer.appendChild(chatWindow);
    chatbotContainer.appendChild(toggleButton);
    document.body.appendChild(chatbotContainer);

    function addMessage(text, isUser = false) {
        const message = document.createElement('div');
        message.style.cssText = \`
            padding: 10px 15px;
            border-radius: 10px;
            max-width: 80%;
            \${isUser ? 'background: ' + (config.color || '#667eea') + '; color: white; align-self: flex-end;' 
                    : 'background: white; border: 1px solid #e5e7eb; align-self: flex-start;'}
            font-family: system-ui, -apple-system, sans-serif;
            font-size: 14px;
        \`;
        message.textContent = text;
        messagesContainer.appendChild(message);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    function addTypingIndicator() {
        const typing = document.createElement('div');
        typing.id = 'typing-indicator';
        typing.style.cssText = \`
            padding: 10px 15px;
            border-radius: 10px;
            max-width: 80%;
            background: white;
            border: 1px solid #e5e7eb;
            align-self: flex-start;
            font-family: system-ui, -apple-system, sans-serif;
            font-size: 14px;
            color: #6b7280;
            font-style: italic;
        \`;
        typing.textContent = 'Agent is typing...';
        messagesContainer.appendChild(typing);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        return typing;
    }

    async function sendMessage(text) {
        if (!text.trim()) return;
        
        addMessage(text, true);
        input.value = '';
        input.disabled = true;
        sendButton.disabled = true;
        
        const typingIndicator = addTypingIndicator();

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
            typingIndicator.remove();
            
            if (data.error) {
                if (data.error.includes('training data')) {
                    addMessage("I apologize, but I don't have enough information to answer your question at the moment. Please contact our support team for assistance.");
                } else {
                    throw new Error(data.error);
                }
            } else {
                addMessage(data.response);
            }
        } catch (error) {
            typingIndicator.remove();
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

    let welcomeShown = false;
    
    function showChat() {
        chatWindow.style.display = 'flex';
        input.focus();
        if (!welcomeShown && config.welcomeMessage) {
            addMessage(config.welcomeMessage);
            welcomeShown = true;
        }
    }
    
    function hideChat() {
        chatWindow.style.display = 'none';
    }
    
    toggleButton.onclick = () => {
        const isVisible = chatWindow.style.display === 'flex';
        if (isVisible) {
            hideChat();
        } else {
            showChat();
        }
    };
    
    minimizeBtn.onclick = hideChat;
    closeBtn.onclick = hideChat;
})();`;
  
  return c.text(widgetCode, 200);
});

export default app;