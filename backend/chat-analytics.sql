-- Chat History and Analytics Tables (Compatible with existing schema)
-- Run this in Supabase SQL editor

-- 1. Enhance existing conversations table
ALTER TABLE conversations ADD COLUMN IF NOT EXISTS response_time_ms INTEGER;
ALTER TABLE conversations ADD COLUMN IF NOT EXISTS ip_address INET;
ALTER TABLE conversations ADD COLUMN IF NOT EXISTS user_agent TEXT;
ALTER TABLE conversations ADD COLUMN IF NOT EXISTS is_user_message BOOLEAN DEFAULT true;

-- 2. Create chat sessions table for analytics
CREATE TABLE IF NOT EXISTS chat_sessions (
    id SERIAL PRIMARY KEY,
    chatbot_id VARCHAR(50) NOT NULL REFERENCES chatbots(id) ON DELETE CASCADE,
    session_id VARCHAR(255) NOT NULL UNIQUE,
    ip_address INET,
    user_agent TEXT,
    started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ended_at TIMESTAMP,
    message_count INTEGER DEFAULT 0,
    satisfaction_rating INTEGER CHECK (satisfaction_rating >= 1 AND satisfaction_rating <= 5),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Analytics Metrics Table
CREATE TABLE IF NOT EXISTS chat_analytics (
    id SERIAL PRIMARY KEY,
    chatbot_id VARCHAR(50) NOT NULL REFERENCES chatbots(id) ON DELETE CASCADE,
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    total_sessions INTEGER DEFAULT 0,
    total_messages INTEGER DEFAULT 0,
    avg_response_time_ms FLOAT DEFAULT 0,
    avg_session_length_minutes FLOAT DEFAULT 0,
    satisfaction_score FLOAT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(chatbot_id, date)
);

-- 4. Indexes for Performance
CREATE INDEX IF NOT EXISTS idx_chat_sessions_chatbot_id ON chat_sessions(chatbot_id);
CREATE INDEX IF NOT EXISTS idx_chat_sessions_started_at ON chat_sessions(started_at);
CREATE INDEX IF NOT EXISTS idx_chat_sessions_session_id ON chat_sessions(session_id);
CREATE INDEX IF NOT EXISTS idx_conversations_session_id ON conversations(session_id);
CREATE INDEX IF NOT EXISTS idx_conversations_created_at ON conversations(created_at);
CREATE INDEX IF NOT EXISTS idx_chat_analytics_chatbot_date ON chat_analytics(chatbot_id, date);

-- 5. Function to Update Analytics (called daily)
CREATE OR REPLACE FUNCTION update_chat_analytics()
RETURNS void AS $$
BEGIN
    INSERT INTO chat_analytics (chatbot_id, date, total_sessions, total_messages, avg_response_time_ms, avg_session_length_minutes, satisfaction_score)
    SELECT 
        cs.chatbot_id,
        CURRENT_DATE,
        COUNT(DISTINCT cs.id) as total_sessions,
        COUNT(c.id) as total_messages,
        AVG(c.response_time_ms) as avg_response_time_ms,
        AVG(EXTRACT(EPOCH FROM (cs.ended_at - cs.started_at))/60) as avg_session_length_minutes,
        AVG(cs.satisfaction_rating) as satisfaction_score
    FROM chat_sessions cs
    LEFT JOIN conversations c ON cs.session_id = c.session_id
    WHERE DATE(cs.started_at) = CURRENT_DATE
    GROUP BY cs.chatbot_id
    ON CONFLICT (chatbot_id, date) 
    DO UPDATE SET
        total_sessions = EXCLUDED.total_sessions,
        total_messages = EXCLUDED.total_messages,
        avg_response_time_ms = EXCLUDED.avg_response_time_ms,
        avg_session_length_minutes = EXCLUDED.avg_session_length_minutes,
        satisfaction_score = EXCLUDED.satisfaction_score;
END;
$$ LANGUAGE plpgsql;

-- 6. Function to increment session message count
CREATE OR REPLACE FUNCTION increment_session_messages(session_id_param VARCHAR)
RETURNS void AS $$
BEGIN
    UPDATE chat_sessions 
    SET message_count = message_count + 1
    WHERE session_id = session_id_param;
END;
$$ LANGUAGE plpgsql;