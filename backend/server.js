require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const OpenAI = require('openai');
const helmet = require('helmet');
const { body, validationResult } = require('express-validator');
// Top of server.js
const pdf = require('pdf-parse');
const mammoth = require('mammoth');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const PORT = process.env.PORT || 3001;

// Trust proxy for accurate IP addresses (important for rate limiting)
app.set('trust proxy', 1);

// Security headers with Helmet
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"], // Allow inline scripts for widget
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'", "*"], // Allow API calls from widget
    },
  },
  crossOriginEmbedderPolicy: false, // Allow embedding widget
  crossOriginResourcePolicy: { policy: "cross-origin" } // Allow widget to load
}));

// Request size limits
app.use(express.json({ limit: '1mb' })); // Limit JSON payload size
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// Simple rate limiting for chat endpoint (prevent abuse)
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 20; // 20 requests per minute per IP

const rateLimitMiddleware = (req, res, next) => {
  const ip = req.ip || req.connection.remoteAddress || 'unknown';
  const now = Date.now();
  
  if (!rateLimitMap.has(ip)) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return next();
  }
  
  const limit = rateLimitMap.get(ip);
  
  if (now > limit.resetTime) {
    // Reset window
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return next();
  }
  
  if (limit.count >= RATE_LIMIT_MAX_REQUESTS) {
    return res.status(429).json({ 
      error: 'Too many requests. Please try again later.',
      retryAfter: Math.ceil((limit.resetTime - now) / 1000)
    });
  }
  
  limit.count++;
  next();
};

// Clean up old entries periodically
setInterval(() => {
  const now = Date.now();
  for (const [ip, limit] of rateLimitMap.entries()) {
    if (now > limit.resetTime) {
      rateLimitMap.delete(ip);
    }
  }
}, RATE_LIMIT_WINDOW);

// Initialize Supabase client
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// CORS configuration
const allowedOrigins = process.env.NODE_ENV === 'production'
  ? [process.env.FRONTEND_URL]
  : [
      'http://localhost:3000',
      'http://localhost:3001',
      'http://localhost:3002',
      'http://localhost:3003',
      'http://127.0.0.1:3000',
      'http://127.0.0.1:3001',
      'http://127.0.0.1:3002',
      'http://127.0.0.1:3003'
    ];

// CORS options for authenticated routes
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) {
      callback(null, true);
      return;
    }
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
};

// CORS options for public widget endpoints (allow all origins)
const corsOptionsPublic = {
  origin: '*', // Allow all origins for widget (use '*' for public APIs)
  credentials: false,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'X-Requested-With', 'Accept', 'Origin'],
  preflightContinue: false,
  optionsSuccessStatus: 204 // 204 No Content is standard for OPTIONS
};

// Middleware - CORS for all routes (will be overridden by route-specific CORS)
app.use(cors(corsOptionsPublic));

// Input validation middleware
const validateInput = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      error: 'Validation failed', 
      details: errors.array().map(e => e.msg) 
    });
  }
  next();
};

// Sanitization helpers
const sanitizeString = (str, maxLength = 10000) => {
  if (typeof str !== 'string') return '';
  return str.trim().slice(0, maxLength).replace(/[<>]/g, ''); // Remove potential HTML tags
};

const validateChatbotId = (id) => {
  // Chatbot IDs should match pattern: cb_ followed by alphanumeric
  return /^cb_[a-z0-9]{9}$/.test(id);
};

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 255;
};

const validatePassword = (password) => {
  // At least 6 characters
  return password && password.length >= 6 && password.length <= 128;
};

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
app.post('/api/auth/register', 
  cors(corsOptions),
  [
    body('email').isEmail().normalizeEmail().withMessage('Invalid email address'),
    body('password').isLength({ min: 6, max: 128 }).withMessage('Password must be between 6 and 128 characters')
  ],
  validateInput,
  async (req, res) => {
    console.log('📝 Register:', req.body.email);
    try {
      const { email, password } = req.body;
      
      // Additional validation
      if (!validateEmail(email)) {
        return res.status(400).json({ error: 'Invalid email format' });
      }
      if (!validatePassword(password)) {
        return res.status(400).json({ error: 'Password must be between 6 and 128 characters' });
      }

      const { data: existing } = await supabase.from('users').select('id').eq('email', email.toLowerCase());
      if (existing?.length > 0)
        return res.status(400).json({ error: 'Email already registered' });

      const hash = await bcrypt.hash(password, 10); // Increased salt rounds for better security
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
      res.status(500).json({ error: 'Registration failed. Please try again.' }); // Generic error message
    }
  }
);

app.post('/api/auth/login',
  cors(corsOptions),
  [
    body('email').isEmail().normalizeEmail().withMessage('Invalid email address'),
    body('password').notEmpty().withMessage('Password is required')
  ],
  validateInput,
  async (req, res) => {
    console.log('🔑 Login:', req.body.email);
    try {
      const { email, password } = req.body;
      
      if (!validateEmail(email)) {
        return res.status(400).json({ error: 'Invalid email format' });
      }

      const { data: users, error } = await supabase.from('users').select('*').eq('email', email.toLowerCase()).single();
      if (error || !users)
        return res.status(401).json({ error: 'Invalid credentials' }); // Generic message for security

      const valid = await bcrypt.compare(password, users.password_hash);
      if (!valid)
        return res.status(401).json({ error: 'Invalid credentials' }); // Generic message for security

      const token = jwt.sign({ userId: users.id, email: users.email }, process.env.JWT_SECRET, { expiresIn: '7d' });
      console.log('✅ Login success:', email);
      res.json({ token, user: { id: users.id, email: users.email } });
    } catch (error) {
      console.error('❌ Login error:', error.message);
      res.status(500).json({ error: 'Login failed. Please try again.' }); // Generic error message
    }
  }
);

// === CHATBOTS ===
app.get('/api/chatbots', cors(corsOptions), authenticateToken, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('chatbots')
      .select('*')
      .eq('user_id', req.user.userId)
      .order('created_at', { ascending: false });
    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/chatbots', cors(corsOptions), authenticateToken, async (req, res) => {
  try {
    const { name, color, welcomeMessage } = req.body;
    const id = 'cb_' + Math.random().toString(36).substr(2, 9);

    const { data, error } = await supabase
      .from('chatbots')
      .insert([
        {
          id,
          user_id: req.user.userId,
          name: name || 'My Chatbot',
          color: color || '#667eea',
          welcome_message: welcomeMessage || 'Hi!'
        }
      ])
      .select()
      .single();

    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/chatbots/:id', cors(corsOptions), authenticateToken, async (req, res) => {
  try {
    const { name, color, welcomeMessage, isDeployed } = req.body;
    const { data, error } = await supabase
      .from('chatbots')
      .update({ name, color, welcome_message: welcomeMessage, is_deployed: isDeployed })
      .eq('id', req.params.id)
      .eq('user_id', req.user.userId)
      .select()
      .single();

    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// === DOCUMENTS ===
app.get('/api/chatbots/:id/documents', cors(corsOptions), authenticateToken, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('documents')
      .select('*')
      .eq('chatbot_id', req.params.id);
    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Inside the document upload route
app.post('/api/chatbots/:id/documents', cors(corsOptions), authenticateToken, upload.single('file'), async (req, res) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ error: 'No file uploaded' });

    let content = '';

    // Use pdf-parse for PDF files with try/catch
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

    const { data, error } = await supabase
      .from('documents')
      .insert([
        {
          chatbot_id: req.params.id,
          filename: file.originalname,
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
    console.error('❌ Upload error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/chatbots/:id/documents/:docId', cors(corsOptions), authenticateToken, async (req, res) => {
  try {
    const { error } = await supabase
      .from('documents')
      .delete()
      .eq('id', req.params.docId)
      .eq('chatbot_id', req.params.id);
    if (error) throw error;
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// === MISC ===
// Serve static files from public directory with CORS headers for widget
app.use('/widget.js', cors(corsOptionsPublic), express.static('public/widget.js'));
app.use(express.static('public'));

// Chat endpoint for widget (public, allow all origins)
// CORS middleware will automatically handle OPTIONS preflight
// Rate limiting protects against abuse
app.post('/api/chat', 
  cors(corsOptionsPublic), 
  rateLimitMiddleware,
  [
    body('chatbotId').notEmpty().trim().withMessage('Chatbot ID is required'),
    body('message').notEmpty().trim().isLength({ min: 1, max: 2000 }).withMessage('Message must be between 1 and 2000 characters')
  ],
  validateInput,
  async (req, res) => {
    try {
      let { chatbotId, message } = req.body;
      
      // Sanitize inputs
      chatbotId = sanitizeString(chatbotId, 20);
      message = sanitizeString(message, 2000);
      
      // Validate chatbotId format
      if (!validateChatbotId(chatbotId)) {
        return res.status(400).json({ error: 'Invalid chatbot ID format' });
      }
      
      if (!message || message.length === 0) {
        return res.status(400).json({ error: 'Message cannot be empty' });
      }

    // Get chatbot documents
    const { data: documents, error: docError } = await supabase
      .from('documents')
      .select('content')
      .eq('chatbot_id', chatbotId);
    
    if (docError) {
      console.error('Database error:', docError);
      return res.status(500).json({ error: 'Failed to retrieve chatbot data' });
    }

    if (!documents || documents.length === 0) {
      return res.status(404).json({ error: 'No training data found for this chatbot' });
    }

    // Combine all document content
    const context = documents.map(doc => doc.content).join('\n\n');

    // Generate response using OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are a helpful AI assistant. Use the following context to answer questions: ${context}`
        },
        {
          role: "user",
          content: message
        }
      ],
      max_tokens: 150
    });

    res.json({ response: completion.choices[0].message.content });
  } catch (error) {
    console.error('Chat error:', error.message);
    // Don't leak internal error details
    if (error.response?.status === 429) {
      return res.status(429).json({ error: 'OpenAI API rate limit exceeded. Please try again later.' });
    }
    if (error.response?.status === 401) {
      return res.status(500).json({ error: 'API authentication failed' });
    }
    res.status(500).json({ error: 'Failed to process chat message. Please try again.' });
  }
});

// Error handling middleware (must be after all routes)
app.use((err, req, res, next) => {
  console.error('❌ Server error:', err.message);
  console.error('Stack:', err.stack); // Log full stack for debugging
  
  // For CORS errors, still send CORS headers
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With, Accept, Origin');
    return res.status(200).end();
  }
  
  // Don't leak internal error details to clients
  const statusCode = err.status || 500;
  const message = statusCode === 500 
    ? 'Internal server error' 
    : (err.message || 'An error occurred');
  
  res.status(statusCode).json({ error: message });
});

app.use((req, res) => {
  console.log('❌ 404:', req.method, req.url);
  res.status(404).json({ error: 'Not found', path: req.url });
});

app.listen(PORT, () => {
  console.log(`🚀 Server: http://localhost:${PORT}`);
  console.log(`✅ Using Supabase database`);
});