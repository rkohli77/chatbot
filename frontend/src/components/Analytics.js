import React, { useState, useEffect } from 'react';
import api from '../services/api';

export default function Analytics({ chatbotId }) {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnalytics();
  }, [chatbotId]);

  const loadAnalytics = async () => {
    try {
      setLoading(true);
      const data = await api.getAnalytics(chatbotId, 7);
      setAnalytics(data);
    } catch (error) {
      console.error('Failed to load analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <div style={{ textAlign: 'center', padding: '48px', color: '#6b7280' }}>
      <div style={{ fontSize: '18px' }}>Loading analytics...</div>
    </div>
  );
  
  if (!analytics) return (
    <div style={{ textAlign: 'center', padding: '48px', color: '#6b7280' }}>
      <div style={{ fontSize: '18px' }}>No data available</div>
    </div>
  );

  const { realTimeStats } = analytics;

  return (
    <div>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1f2937', marginBottom: '16px' }}>Analytics Dashboard</h2>
      <div style={{ textAlign: 'center', padding: '24px 48px', color: '#6b7280' }}>
        
        <div style={{ display: 'flex', justifyContent: 'left', gap: '40px', fontSize: '16px' }}>
          <div>
            <div style={{ color: '#9ca3af', marginBottom: '8px' }}>Today's Sessions</div>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#667eea' }}>{realTimeStats?.todaySessions || 0}</div>
          </div>
          <div>
            <div style={{ color: '#9ca3af', marginBottom: '8px' }}>Today's Messages</div>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#f093fb' }}>{realTimeStats?.todayMessages || 0}</div>
          </div>
          <div>
            <div style={{ color: '#9ca3af', marginBottom: '8px' }}>Avg Response Time</div>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#4facfe' }}>
              {realTimeStats?.avgResponseTime ? `${Math.round(realTimeStats.avgResponseTime)}ms` : 'N/A'}
            </div>
          </div>
          <div>
            <div style={{ color: '#9ca3af', marginBottom: '8px' }}>Satisfaction</div>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#43e97b' }}>
              {realTimeStats?.avgSatisfaction ? `${realTimeStats.avgSatisfaction.toFixed(1)}/5` : 'N/A'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
