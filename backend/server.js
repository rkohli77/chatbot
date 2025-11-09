require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const OpenAI = require('openai');
// Top of server.js
const pdf = require('pdf-parse');
const mammoth = require('mammoth');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const PORT = process.env.PORT || 3001;

// Initialize Supabase client
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// Middleware
app.use(cors());
app.use(express.json());

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
app.post('/api/auth/register', async (req, res) => {
  console.log('📝 Register:', req.body.email);
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ error: 'Email and password required' });

    const { data: existing } = await supabase.from('users').select('id').eq('email', email.toLowerCase());
    if (existing?.length > 0)
      return res.status(400).json({ error: 'Email already registered' });

    const hash = await bcrypt.hash(password, 6);
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
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/auth/login', async (req, res) => {
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
    res.status(500).json({ error: error.message });
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
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/chatbots', authenticateToken, async (req, res) => {
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

app.put('/api/chatbots/:id', authenticateToken, async (req, res) => {
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
app.get('/api/chatbots/:id/documents', authenticateToken, async (req, res) => {
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
app.post('/api/chatbots/:id/documents', authenticateToken, upload.single('file'), async (req, res) => {
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

app.delete('/api/chatbots/:id/documents/:docId', authenticateToken, async (req, res) => {
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
app.get('/widget.js', (req, res) => {
  res.setHeader('Content-Type', 'application/javascript');
  res.send('console.log("Widget loaded via Supabase backend");');
});

app.use((req, res) => {
  console.log('❌ 404:', req.method, req.url);
  res.status(404).json({ error: 'Not found', path: req.url });
});

app.listen(PORT, () => {
  console.log(`🚀 Server: http://localhost:${PORT}`);
  console.log(`✅ Using Supabase database`);
});