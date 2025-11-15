import React, { useState, useEffect } from 'react';
import api from '../services/api';

export default function Conversations({ chatbotId }) {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSession, setSelectedSession] = useState(null);

  useEffect(() => {
    loadConversations();
  }, [chatbotId]);

  const loadConversations = async () => {
    try {
      setLoading(true);
      const data = await api.getConversations(chatbotId);
      const conversations = data.conversations || [];
      
      // Sort messages within each session in ascending order (oldest first)
      const sortedConversations = conversations.map(session => ({
        ...session,
        messages: [...session.messages].sort((a, b) => 
          new Date(a.created_at) - new Date(b.created_at)
        )
      }));
      
      setConversations(sortedConversations);
      if (sortedConversations.length > 0) {
        setSelectedSession(sortedConversations[0]);
      }
    } catch (error) {
      console.error('Failed to load conversations:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <div style={{ textAlign: 'center', padding: '48px', color: '#6b7280' }}>
      <div style={{ fontSize: '18px' }}>Loading conversations...</div>
    </div>
  );

  return (
    <div>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1f2937', marginBottom: '24px' }}>Chat History</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '20px', height: '600px' }}>
        {/* Sessions List */}
        <div style={{
          background: 'white',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <div style={{
            padding: '16px 20px',
            borderBottom: '2px solid #e5e7eb',
            fontWeight: '600',
            fontSize: '16px',
            color: '#1f2937',
            background: '#f9fafb'
          }}>
            💬 Sessions ({conversations.length})
          </div>
          <div style={{ flex: 1, overflowY: 'auto' }}>
            {conversations.length === 0 ? (
              <div style={{ padding: '32px', textAlign: 'center', color: '#9ca3af' }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>💭</div>
                <div>No conversations yet</div>
              </div>
            ) : (
              conversations.map((session, idx) => (
                <div
                  key={session.session_id}
                  onClick={() => setSelectedSession(session)}
                  style={{
                    padding: '16px 20px',
                    cursor: 'pointer',
                    borderBottom: '1px solid #f3f4f6',
                    background: selectedSession?.session_id === session.session_id ? '#eff6ff' : 'white',
                    borderLeft: selectedSession?.session_id === session.session_id ? '4px solid #667eea' : '4px solid transparent',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    if (selectedSession?.session_id !== session.session_id) {
                      e.currentTarget.style.background = '#f9fafb';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedSession?.session_id !== session.session_id) {
                      e.currentTarget.style.background = 'white';
                    }
                  }}
                >
                  <div style={{ fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '4px' }}>
                    Session #{conversations.length - idx}
                  </div>
                  <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>
                    {new Date(session.started_at).toLocaleString()}
                  </div>
                  <div style={{ fontSize: '12px', color: '#9ca3af' }}>
                    {session.messages.length} messages
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Messages View */}
        <div style={{
          background: 'white',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <div style={{
            padding: '16px 20px',
            borderBottom: '2px solid #e5e7eb',
            fontWeight: '600',
            fontSize: '16px',
            color: '#1f2937',
            background: '#f9fafb'
          }}>
            💬 Messages
          </div>
          {!selectedSession ? (
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9ca3af' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>👈</div>
                <div>Select a session to view messages</div>
              </div>
            </div>
          ) : (
            <div style={{
              flex: 1,
              overflowY: 'auto',
              padding: '20px',
              background: '#f9fafb',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}>
              {selectedSession.messages.map((msg) => (
                <div
                  key={msg.id}
                  style={{
                    display: 'flex',
                    justifyContent: msg.is_user_message ? 'flex-end' : 'flex-start'
                  }}
                >
                  <div style={{
                    maxWidth: '70%',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    background: msg.is_user_message 
                      ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
                      : 'white',
                    color: msg.is_user_message ? 'white' : '#1f2937',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                  }}>
                    <div style={{ fontSize: '14px', lineHeight: '1.5', marginBottom: '6px' }}>
                      {msg.message || msg.response}
                    </div>
                    <div style={{
                      fontSize: '11px',
                      opacity: 0.7,
                      display: 'flex',
                      gap: '8px',
                      alignItems: 'center'
                    }}>
                      <span>{new Date(msg.created_at).toLocaleTimeString()}</span>
                      {msg.response_time_ms && <span>• {msg.response_time_ms}ms</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
