-- Database Optimization for Chatbot System
-- Run these queries in your Supabase SQL editor

-- 1. Create tables for logging (if not exists)
CREATE TABLE IF NOT EXISTS error_logs (
    id SERIAL PRIMARY KEY,
    error_message TEXT NOT NULL,
    context VARCHAR(100),
    user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    ip INET,
    user_agent TEXT,
    url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS activity_logs (
    id SERIAL PRIMARY KEY,
    action VARCHAR(100) NOT NULL,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    ip INET,
    details JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Add missing columns for GDPR compliance and error tracking (if not exists)
ALTER TABLE users ADD COLUMN IF NOT EXISTS data_processing_consent BOOLEAN DEFAULT true;
ALTER TABLE users ADD COLUMN IF NOT EXISTS marketing_consent BOOLEAN DEFAULT false;
ALTER TABLE users ADD COLUMN IF NOT EXISTS consent_updated_at TIMESTAMPTZ;

-- Add user_id to error_logs if it doesn't exist
ALTER TABLE error_logs ADD COLUMN IF NOT EXISTS user_id INTEGER REFERENCES users(id) ON DELETE SET NULL;

-- 3. INDEXES for better query performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_chatbots_user_id ON chatbots(user_id);
CREATE INDEX IF NOT EXISTS idx_chatbots_deployed ON chatbots(is_deployed) WHERE is_deployed = true;
CREATE INDEX IF NOT EXISTS idx_documents_chatbot_id ON documents(chatbot_id);
CREATE INDEX IF NOT EXISTS idx_documents_status ON documents(status);
CREATE INDEX IF NOT EXISTS idx_error_logs_created_at ON error_logs(created_at);
CREATE INDEX IF NOT EXISTS idx_error_logs_user_id ON error_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_activity_logs_user_id ON activity_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_activity_logs_created_at ON activity_logs(created_at);

-- 4. COMPOSITE INDEXES for complex queries
CREATE INDEX IF NOT EXISTS idx_chatbots_user_deployed ON chatbots(user_id, is_deployed);
CREATE INDEX IF NOT EXISTS idx_documents_chatbot_status ON documents(chatbot_id, status);

-- 5. PARTIAL INDEXES for specific conditions
-- Note: Partial index with NOW() removed as it's not immutable
-- CREATE INDEX IF NOT EXISTS idx_users_trial_active ON users(trial_ends_at) 
-- WHERE trial_ends_at > NOW();
CREATE INDEX IF NOT EXISTS idx_users_trial_ends_at ON users(trial_ends_at);

-- 6. Add foreign key constraints for data integrity
-- Note: documents table doesn't have user_id column, skipping this constraint
-- ALTER TABLE documents ADD CONSTRAINT fk_documents_user_id 
-- FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;

-- 7. Enable Row Level Security (RLS) for better security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE chatbots ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;

-- 8. Create RLS policies
-- Note: RLS policies commented out as they require auth.uid() which may not match integer IDs
-- CREATE POLICY "Users can only see their own data" ON users
-- FOR ALL USING (auth.uid() = id);

-- CREATE POLICY "Users can only manage their own chatbots" ON chatbots
-- FOR ALL USING (auth.uid() = user_id);

-- CREATE POLICY "Users can only manage their own documents" ON documents
-- FOR ALL USING (auth.uid() = user_id);

-- 9. Optimize for connection pooling (Supabase handles this automatically)
-- But you can set these for manual connections:
-- SET max_connections = 100;
-- SET shared_buffers = '256MB';
-- SET effective_cache_size = '1GB';

-- 10. Create materialized view for analytics (optional)
CREATE MATERIALIZED VIEW IF NOT EXISTS chatbot_stats AS
SELECT 
    u.id as user_id,
    COUNT(c.id) as total_chatbots,
    COUNT(CASE WHEN c.is_deployed THEN 1 END) as deployed_chatbots,
    COUNT(d.id) as total_documents,
    SUM(d.file_size) as total_storage_used
FROM users u
LEFT JOIN chatbots c ON u.id = c.user_id
LEFT JOIN documents d ON c.id = d.chatbot_id
GROUP BY u.id;

-- Refresh the materialized view periodically
-- CREATE OR REPLACE FUNCTION refresh_chatbot_stats()
-- RETURNS void AS $$
-- BEGIN
--     REFRESH MATERIALIZED VIEW chatbot_stats;
-- END;
-- $$ LANGUAGE plpgsql;

-- 11. Add cleanup job for old logs (optional)
-- DELETE FROM error_logs WHERE created_at < NOW() - INTERVAL '30 days';
-- DELETE FROM activity_logs WHERE created_at < NOW() - INTERVAL '90 days';