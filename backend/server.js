require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const OpenAI = require('openai');
const pdf = require('pdf-parse');
const mammoth = require('mammoth');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const PORT = process.env.PORT || 3001;

// Security middleware
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP'
});
app.use(limiter);

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: 'Too many authentication attempts'
});

const chatLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  message: 'Too many chat requests'
});

// Initialize Supabase client
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// CORS configuration
const corsOptionsPublic = {
  origin: '*',
  credentials: false,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'X-Requested-With', 'Accept', 'Origin']
};

// Apply CORS
if (process.env.NODE_ENV === 'production') {
  const corsOptions = {
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
  };
  app.use(cors(corsOptions));
} else {
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
    if (req.method === 'OPTIONS') {
      res.sendStatus(200);
    } else {
      next();
    }
  });
}

app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

app.use((req, res, next) => {
  console.log(`📨 ${req.method} ${req.url}`);
  next();
});

// Test Supabase connection
(async () => {
  const { data, error } = await supabase.from('users').select('id').limit(1);
  if (error) console.error('❌ Supabase connection failed:', error.message);
  else console.log('✅ Supabase connected');
})();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }
});

// Auth middleware
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Token required' });
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = user;
    next();
  });
};

// Basic routes
app.get('/health', (req, res) => res.json({ status: 'ok', timestamp: new Date().toISOString() }));
app.get('/', (req, res) => res.json({ message: 'Chatbot API (Supabase)', version: '2.0.0' }));

// === AUTH ROUTES ===
app.post('/api/auth/register', authLimiter, async (req, res) => {
  console.log('📝 Register:', req.body.email);
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ error: 'Email and password required' });

    if (password.length < 8) {
      return res.status(400).json({ error: 'Password must be at least 8 characters' });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    const { data: existing } = await supabase.from('users').select('id').eq('email', email.toLowerCase());
    if (existing?.length > 0)
      return res.status(400).json({ error: 'Email already registered' });

    const hash = await bcrypt.hash(password, 12);
    const { data, error } = await supabase
      .from('users')
      .insert([{ email: email.toLowerCase(), password_hash: hash }])
      .select()
      .single();

    if (error) throw error;

    const token = jwt.sign({ userId: data.id, email: data.email }, process.env.JWT_SECRET, { expiresIn: '7d' });
    console.log('✅ Registered:', email);
    res.json({ token, user: { id: data.id, email: data.email } });
  } catch (error) {
    console.error('❌ Register error:', error.message);
    res.status(500).json({ error: 'Registration failed' });
  }
});

app.post('/api/auth/login', authLimiter, async (req, res) => {
  console.log('🔑 Login:', req.body.email);
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ error: 'Email and password required' });

    const { data: users, error } = await supabase.from('users').select('*').eq('email', email.toLowerCase()).single();
    if (error || !users)
      return res.status(401).json({ error: 'Invalid credentials' });

    const valid = await bcrypt.compare(password, users.password_hash);
    if (!valid)
      return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ userId: users.id, email: users.email }, process.env.JWT_SECRET, { expiresIn: '7d' });
    console.log('✅ Login success:', email);
    res.json({ token, user: { id: users.id, email: users.email } });
  } catch (error) {
    console.error('❌ Login error:', error.message);
    res.status(500).json({ error: 'Login failed' });
  }
});

// === CHATBOTS ===
app.get('/api/chatbots', authenticateToken, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('chatbots')
      .select('*')
      .eq('user_id', req.user.userId)
      .order('created_at', { ascending: false });
    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch chatbots' });
  }
});

app.post('/api/chatbots', authenticateToken, async (req, res) => {
  try {
    const { name, color, welcomeMessage } = req.body;
    
    const sanitizedName = (name || 'My Chatbot').replace(/<[^>]*>/g, '').substring(0, 100);
    const sanitizedMessage = (welcomeMessage || 'Hi!').replace(/<[^>]*>/g, '').substring(0, 500);
    const sanitizedColor = /^#[0-9A-F]{6}$/i.test(color) ? color : '#667eea';
    
    const id = 'cb_' + Math.random().toString(36).substr(2, 9);

    const { data, error } = await supabase
      .from('chatbots')
      .insert([
        {
          id,
          user_id: req.user.userId,
          name: sanitizedName,
          color: sanitizedColor,
          welcome_message: sanitizedMessage
        }
      ])
      .select()
      .single();

    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create chatbot' });
  }
});

app.put('/api/chatbots/:id', authenticateToken, async (req, res) => {
  try {
    const { name, color, welcomeMessage, isDeployed } = req.body;
    
    const updateData = {};
    if (name) updateData.name = name.replace(/<[^>]*>/g, '').substring(0, 100);
    if (color && /^#[0-9A-F]{6}$/i.test(color)) updateData.color = color;
    if (welcomeMessage) updateData.welcome_message = welcomeMessage.replace(/<[^>]*>/g, '').substring(0, 500);
    if (typeof isDeployed === 'boolean') updateData.is_deployed = isDeployed;
    
    const { data, error } = await supabase
      .from('chatbots')
      .update(updateData)
      .eq('id', req.params.id)
      .eq('user_id', req.user.userId)
      .select()
      .single();

    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update chatbot' });
  }
});

// === DOCUMENTS ===
app.get('/api/chatbots/:id/documents', authenticateToken, async (req, res) => {
  try {
    const { data: chatbot } = await supabase
      .from('chatbots')
      .select('user_id')
      .eq('id', req.params.id)
      .single();
    
    if (!chatbot || chatbot.user_id !== req.user.userId) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const { data, error } = await supabase
      .from('documents')
      .select('*')
      .eq('chatbot_id', req.params.id);
    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch documents' });
  }
});

app.post('/api/chatbots/:id/documents', authenticateToken, upload.single('file'), async (req, res) => {
  try {
    const { data: chatbot } = await supabase
      .from('chatbots')
      .select('user_id')
      .eq('id', req.params.id)
      .single();
    
    if (!chatbot || chatbot.user_id !== req.user.userId) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const file = req.file;
    if (!file) return res.status(400).json({ error: 'No file uploaded' });
    
    const allowedTypes = ['application/pdf', 'text/plain', 'text/markdown'];
    if (!allowedTypes.includes(file.mimetype)) {
      return res.status(400).json({ error: 'Invalid file type' });
    }

    let content = '';

    if (file.mimetype === 'application/pdf') {
      try {
        const data = await pdf(file.buffer);
        content = data.text;
      } catch (err) {
        return res.status(400).json({ error: 'Failed to parse PDF file' });
      }
    } else {
      content = file.buffer.toString('utf-8');
    }

    content = content.replace(/<script[^>]*>.*?<\/script>/gi, '')
                    .replace(/<[^>]*>/g, '')
                    .substring(0, 50000);

    const { data, error } = await supabase
      .from('documents')
      .insert([
        {
          chatbot_id: req.params.id,
          filename: file.originalname.replace(/[^a-zA-Z0-9.-]/g, ''),
          content,
          file_type: file.mimetype,
          file_size: file.size,
          status: 'ready'
        }
      ])
      .select()
      .single();

    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Upload failed' });
  }
});

app.delete('/api/chatbots/:id/documents/:docId', authenticateToken, async (req, res) => {
  try {
    const { data: chatbot } = await supabase
      .from('chatbots')
      .select('user_id')
      .eq('id', req.params.id)
      .single();
    
    if (!chatbot || chatbot.user_id !== req.user.userId) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const { error } = await supabase
      .from('documents')
      .delete()
      .eq('id', req.params.docId)
      .eq('chatbot_id', req.params.id);
    if (error) throw error;
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete document' });
  }
});

// === WIDGET ENDPOINTS ===
app.use('/widget.js', cors(corsOptionsPublic), express.static('public/widget.js'));
app.use(express.static('public'));

app.post('/api/chat', cors(corsOptionsPublic), chatLimiter, async (req, res) => {
  try {
    const { chatbotId, message } = req.body;
    if (!chatbotId || !message) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }
    
    if (typeof message !== 'string' || message.length > 1000) {
      return res.status(400).json({ error: 'Invalid message format or too long' });
    }
    if (typeof chatbotId !== 'string' || !/^cb_[a-z0-9]+$/.test(chatbotId)) {
      return res.status(400).json({ error: 'Invalid chatbot ID' });
    }

    const sanitizedMessage = message.replace(/<script[^>]*>.*?<\/script>/gi, '')
                                    .replace(/<[^>]*>/g, '')
                                    .trim();

    const { data: documents } = await supabase
      .from('documents')
      .select('content')
      .eq('chatbot_id', chatbotId);

    if (!documents || documents.length === 0) {
      return res.status(404).json({ error: 'No training data found for this chatbot' });
    }

    const context = documents.map(doc => doc.content).join('\n\n');

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are a helpful AI assistant. Use the following context to answer questions: ${context.substring(0, 8000)}`
        },
        {
          role: "user",
          content: sanitizedMessage
        }
      ],
      max_tokens: 150,
      temperature: 0.7
    });

    res.json({ response: completion.choices[0].message.content });
  } catch (error) {
    console.error('Chat error:', error.message);
    if (error.code === 'insufficient_quota') {
      return res.status(429).json({ error: 'Service temporarily unavailable' });
    }
    res.status(500).json({ error: 'Failed to process chat message' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('❌ Server error:', err.message);
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With, Accept, Origin');
    return res.status(200).end();
  }
  res.status(err.status || 500).json({ error: err.message || 'Internal server error' });
});

app.use((req, res) => {
  console.log('❌ 404:', req.method, req.url);
  res.status(404).json({ error: 'Not found', path: req.url });
});

app.listen(PORT, () => {
  console.log(`🚀 Server: http://localhost:${PORT}`);
  console.log(`✅ Using Supabase database`);
});