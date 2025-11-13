import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { user, chatbots, documents } from '../services/api';

function Dashboard({ setAuth }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('chatbots');
  const [allChatbots, setAllChatbots] = useState([]);
  const [selectedChatbot, setSelectedChatbot] = useState(null);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [notification, setNotification] = useState(null);
  const [userProfile, setUserProfile] = useState(null);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    if (type === 'success') {
      setTimeout(() => setNotification(null), 4000);
    }
  };

  const clearNotification = () => {
    setNotification(null);
  };
  
  // Form states
  const [chatbotName, setChatbotName] = useState('My Support Bot');
  const [chatbotColor, setChatbotColor] = useState('#667eea');
  const [welcomeMessage, setWelcomeMessage] = useState('Hi! How can I help you today?');
  const [showNewBotForm, setShowNewBotForm] = useState(false);

  const loadUserProfile = useCallback(async () => {
    try {
      const response = await user.getProfile();
      setUserProfile(response.data);
    } catch (error) {
      console.error('Error loading user profile:', error);
    }
  }, []);

  const loadChatbots = useCallback(async () => {
    try {
      const response = await chatbots.getAll();
      setAllChatbots(response.data);
      if (response.data.length > 0 && !selectedChatbot) {
        setSelectedChatbot(response.data[0]);
      }
    } catch (error) {
      console.error('Error loading chatbots:', error);
    } finally {
      setLoading(false);
    }
  }, [selectedChatbot]);

  useEffect(() => {
    loadUserProfile();
    loadChatbots();
  }, [loadUserProfile, loadChatbots]);

  useEffect(() => {
    if (selectedChatbot) {
      loadDocuments(selectedChatbot.id);
      setChatbotName(selectedChatbot.name);
      setChatbotColor(selectedChatbot.color);
      setWelcomeMessage(selectedChatbot.welcome_message);
    }
  }, [selectedChatbot]);


  const loadDocuments = async (chatbotId) => {
    try {
      const response = await documents.getAll(chatbotId);
      setFiles(response.data);
    } catch (error) {
      console.error('Error loading documents:', error);
    }
  };

  const handleCreateChatbot = async () => {
    try {
      const response = await chatbots.create({
        name: chatbotName || 'New Chatbot',
        color: chatbotColor,
        welcomeMessage: welcomeMessage
      });
      setAllChatbots([response.data, ...allChatbots]);
      setSelectedChatbot(response.data);
      setShowNewBotForm(false);
      showNotification('Chatbot created successfully!');
    } catch (error) {
      showNotification('Failed to create chatbot: ' + (error.response?.data?.error || 'Unknown error'), 'error');
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || !selectedChatbot) return;
    try {
      const response = await documents.upload(selectedChatbot.id, file);
      setFiles([response.data, ...files]);
      showNotification('Document uploaded successfully!');
    } catch (error) {
      showNotification('Failed to upload document: ' + (error.response?.data?.error || 'Unknown error'), 'error');
    }
  };

  const handleDeleteFile = async (docId) => {
    if (!window.confirm('Are you sure you want to delete this document? This action cannot be undone.')) return;
    
    try {
      await documents.delete(selectedChatbot.id, docId);
      setFiles(files.filter(f => f.id !== docId));
    } catch (error) {
      showNotification('Failed to delete document: ' + (error.response?.data?.error || 'Unknown error'), 'error');
    }
  };

  const handleUpdateChatbot = async () => {
    if (!selectedChatbot) return;
    
    try {
      await chatbots.update(selectedChatbot.id, {
        name: chatbotName,
        color: chatbotColor,
        welcomeMessage: welcomeMessage
      });
      showNotification('Chatbot settings updated successfully!');
      loadChatbots();
    } catch (error) {
      showNotification('Failed to update chatbot: ' + (error.response?.data?.error || 'Unknown error'), 'error');
    }
  };

  const handleTabChange = (tab) => {
    clearNotification();
    setActiveTab(tab);
  };

  const handleDeploy = async () => {
    if (!selectedChatbot) {
      showNotification('Please create a chatbot before deploying', 'warning');
      return;
    }
    
    if (files.length === 0) {
      showNotification('Please upload at least one document before deploying your chatbot', 'warning');
      return;
    }

    try {
      await chatbots.update(selectedChatbot.id, { isDeployed: true });
      showNotification('Chatbot deployed successfully! Your widget is now live.');
      loadChatbots();
    } catch (error) {
      showNotification('Failed to deploy chatbot: ' + (error.response?.data?.error || 'Unknown error'), 'error');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setAuth(false);
    navigate('/login');
  };

  const widgetCode = selectedChatbot ? `<!-- Chatbot Widget -->
  <script>
    window.chatbotConfig = {
      chatbotId: "${selectedChatbot.id}",
      apiUrl: "${process.env.REACT_APP_API_URL || window.location.origin}"
    };
  </script>
  <script src="${process.env.REACT_APP_API_URL || window.location.origin}/widget.js"></script>` : '';
  
  const handleCopyCode = () => {
    navigator.clipboard.writeText(widgetCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }}>
        <div style={{ color: 'white', fontSize: '18px' }}>Loading...</div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '40px 20px'
    }}>
      {/* Inline Notification */}
      {notification && (
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto 24px auto',
          background: notification.type === 'error' ? 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)' : 
                     notification.type === 'warning' ? 'linear-gradient(135deg, #fef3c7 0%, #fed7aa 100%)' : 
                     'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)',
          border: `2px solid ${notification.type === 'error' ? '#f87171' : 
                               notification.type === 'warning' ? '#fbbf24' : '#34d399'}`,
          borderRadius: '12px',
          padding: '18px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: notification.type === 'error' ? '#ef4444' : 
                         notification.type === 'warning' ? '#f59e0b' : '#10b981',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '18px'
            }}>
              {notification.type === 'error' ? '✕' : notification.type === 'warning' ? '⚠' : '✓'}
            </div>
            <span style={{
              color: notification.type === 'error' ? '#7f1d1d' : 
                     notification.type === 'warning' ? '#92400e' : '#064e3b',
              fontSize: '16px',
              fontWeight: '600',
              lineHeight: '1.5'
            }}>
              {notification.message}
            </span>
          </div>
          {(notification.type === 'error' || notification.type === 'warning') && (
            <button
              onClick={clearNotification}
              style={{
                background: notification.type === 'error' ? '#ef4444' : '#f59e0b',
                border: 'none',
                color: 'white',
                fontSize: '16px',
                cursor: 'pointer',
                padding: '8px 12px',
                borderRadius: '6px',
                fontWeight: '600',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.opacity = '0.8'}
              onMouseLeave={(e) => e.target.style.opacity = '1'}
            >
              ×
            </button>
          )}
        </div>
      )}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {/* Header */}
        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '32px',
          marginBottom: '24px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '16px'
          }}>
            <div>
              <div style={{
                fontSize: '18px',
                color: '#667eea',
                fontWeight: '500',
                marginBottom: '8px'
              }}>
                {(() => {
                  const hour = new Date().getHours();
                  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
                  const name = userProfile?.first_name && userProfile?.last_name ? 
                    `${userProfile.first_name.charAt(0).toUpperCase() + userProfile.first_name.slice(1)} ${userProfile.last_name.charAt(0).toUpperCase() + userProfile.last_name.slice(1)}` : 
                    'There';
                  return `${greeting}, ${name}!`;
                })()} 
              </div>
              <h1 style={{
                fontSize: '32px',
                fontWeight: 'bold',
                color: '#1f2937',
                margin: '0 0 8px 0'
              }}>
                ChatBot Dashboard
              </h1>
              <p style={{
                color: '#6b7280',
                margin: 0,
                fontSize: '16px'
              }}>
                Manage your AI-powered chatbots
              </p>
            </div>
            <button
              onClick={handleLogout}
              style={{
                background: '#ef4444',
                color: 'white',
                padding: '12px 24px',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'background 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.background = '#dc2626'}
              onMouseLeave={(e) => e.target.style.background = '#ef4444'}
            >
              Logout
            </button>
          </div>

          {/* Tabs */}
          <div style={{
            display: 'flex',
            gap: '8px',
            borderBottom: '2px solid #e5e7eb',
            marginTop: '24px'
          }}>
            {['chatbots', 'upload', 'customize', 'deploy'].map(tab => (
              <button
                key={tab}
                onClick={() => handleTabChange(tab)}
                style={{
                  padding: '12px 24px',
                  background: activeTab === tab ? '#667eea' : 'transparent',
                  color: activeTab === tab ? 'white' : '#6b7280',
                  border: 'none',
                  borderRadius: '8px 8px 0 0',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  textTransform: 'capitalize',
                  transition: 'all 0.2s'
                }}
              >
                {tab === 'upload' ? 'Documents' : tab}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '32px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
        }}>
          {/* Chatbots Tab */}
          {activeTab === 'chatbots' && (
            <div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '24px'
              }}>
                <h2 style={{
                  fontSize: '24px',
                  fontWeight: 'bold',
                  color: '#1f2937',
                  margin: 0
                }}>
                  Your Chatbots
                </h2>
                <button
                  onClick={() => setShowNewBotForm(!showNewBotForm)}
                  style={{
                    background: '#10b981',
                    color: 'white',
                    padding: '12px 24px',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => e.target.style.background = '#059669'}
                  onMouseLeave={(e) => e.target.style.background = '#10b981'}
                >
                  + New Chatbot
                </button>
              </div>

              {showNewBotForm && (
                <div style={{
                  background: '#f9fafb',
                  padding: '24px',
                  borderRadius: '12px',
                  marginBottom: '24px',
                  border: '1px solid #e5e7eb'
                }}>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: '#1f2937' }}>
                    Create New Chatbot
                  </h3>
                  <div style={{ marginBottom: '16px' }}>
                    <label style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: '500',
                      color: '#374151',
                      marginBottom: '8px'
                    }}>
                      Chatbot Name
                    </label>
                    <input
                      type="text"
                      value={chatbotName}
                      onChange={(e) => setChatbotName(e.target.value)}
                      placeholder="e.g., Customer Support Bot"
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        border: '1px solid #d1d5db',
                        borderRadius: '8px',
                        fontSize: '16px',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>
                  <div style={{ marginBottom: '16px' }}>
                    <label style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: '500',
                      color: '#374151',
                      marginBottom: '8px'
                    }}>
                      Theme Color
                    </label>
                    <input
                      type="color"
                      value={chatbotColor}
                      onChange={(e) => setChatbotColor(e.target.value)}
                      style={{
                        width: '100px',
                        height: '44px',
                        border: '1px solid #d1d5db',
                        borderRadius: '8px',
                        cursor: 'pointer'
                      }}
                    />
                  </div>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <button
                      onClick={handleCreateChatbot}
                      style={{
                        background: '#667eea',
                        color: 'white',
                        padding: '12px 24px',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '16px',
                        fontWeight: '600',
                        cursor: 'pointer'
                      }}
                    >
                      Create
                    </button>
                    <button
                      onClick={() => setShowNewBotForm(false)}
                      style={{
                        background: '#e5e7eb',
                        color: '#374151',
                        padding: '12px 24px',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '16px',
                        fontWeight: '600',
                        cursor: 'pointer'
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {allChatbots.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '48px', color: '#6b7280' }}>
                  <p style={{ fontSize: '18px', marginBottom: '16px' }}>No chatbots yet</p>
                  <p>Click "New Chatbot" to create your first one</p>
                </div>
              ) : (
                <>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
                    {allChatbots.map(bot => (
                      <div
                        key={bot.id}
                        onClick={() => setSelectedChatbot(bot)}
                        style={{
                          padding: '24px',
                          border: selectedChatbot?.id === bot.id ? `3px solid ${bot.color}` : '1px solid #e5e7eb',
                          borderRadius: '12px',
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                          background: selectedChatbot?.id === bot.id ? '#f0f9ff' : 'white'
                        }}
                      >
                        <div style={{
                          width: '48px',
                          height: '48px',
                          borderRadius: '12px',
                          background: bot.color,
                          marginBottom: '16px'
                        }}></div>
                        <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px', color: '#1f2937' }}>
                          {bot.name}
                        </h3>
                        <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>
                          {bot.is_deployed ? '✓ Deployed' : 'Not deployed'}
                        </p>
                      </div>
                    ))}
                  </div>
                  
                  {(() => {
                    // Debug: Always show a message to test
                    if (!userProfile) {
                      return (
                        <div style={{
                          marginTop: '24px',
                          padding: '16px',
                          background: '#e0e7ff',
                          border: '1px solid #c7d2fe',
                          borderRadius: '8px',
                          color: '#3730a3',
                          textAlign: 'center'
                        }}>
                          Loading trial information...
                        </div>
                      );
                    }
                    
                    if (!userProfile.trial_ends_at) {
                      return (
                        <div style={{
                          marginTop: '24px',
                          padding: '16px',
                          background: '#e0e7ff',
                          border: '1px solid #c7d2fe',
                          borderRadius: '8px',
                          color: '#3730a3',
                          textAlign: 'center'
                        }}>
                          No trial data found.
                        </div>
                      );
                    }
                    
                    const trialEndsAt = new Date(userProfile.trial_ends_at);
                    const now = new Date();
                    const daysLeft = Math.ceil((trialEndsAt - now) / (1000 * 60 * 60 * 24));
                    
                    if (daysLeft <= 0) {
                      return (
                        <div style={{
                          marginTop: '24px',
                          padding: '16px',
                          background: '#fee2e2',
                          border: '1px solid #fecaca',
                          borderRadius: '8px',
                          color: '#991b1b',
                          textAlign: 'center'
                        }}>
                          ⚠️ Your trial has expired. Upgrade to continue using your chatbots.
                        </div>
                      );
                    }
                    
                    return (
                      <div style={{
                        marginTop: '24px',
                        padding: '16px',
                        background: '#fef3c7',
                        border: '1px solid #fed7aa',
                        borderRadius: '8px',
                        color: '#92400e',
                        textAlign: 'center'
                      }}>
                        ⏰ Your trial ends in {daysLeft} day{daysLeft !== 1 ? 's' : ''}.
                      </div>
                    );
                  })()} 
                </>
              )}
            </div>
          )}

          {/* Upload Documents Tab */}
          {activeTab === 'upload' && selectedChatbot && (
            <div>
              <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1f2937', marginBottom: '8px' }}>
                Upload Documents
              </h2>
              <p style={{ color: '#6b7280', marginBottom: '24px' }}>
                Upload FAQs, PDFs, or text documents to train your chatbot
              </p>

              <label htmlFor="file-upload">
                <div style={{
                  border: '2px dashed #d1d5db',
                  borderRadius: '12px',
                  padding: '48px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  marginBottom: '24px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#667eea';
                  e.currentTarget.style.background = '#f0f9ff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#d1d5db';
                  e.currentTarget.style.background = 'transparent';
                }}>
                  <div style={{ fontSize: '48px', marginBottom: '16px' }}>📄</div>
                  <p style={{ fontSize: '18px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                    Drop files here or click to upload
                  </p>
                  <p style={{ fontSize: '14px', color: '#6b7280' }}>
                    PDF, TXT, DOC, DOCX, CSV (Max 10MB)
                  </p>
                </div>
                <input
                  id="file-upload"
                  type="file"
                  accept=".pdf,.txt,.doc,.docx,.csv"
                  onChange={handleFileUpload}
                  style={{ display: 'none' }}
                />
              </label>

              {files.length > 0 && (
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: '#1f2937' }}>
                    Uploaded Files ({files.length})
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {files.map(file => (
                      <div key={file.id} style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '16px',
                        background: '#f9fafb',
                        borderRadius: '8px',
                        border: '1px solid #e5e7eb'
                      }}>
                        <div>
                          <p style={{ fontWeight: '600', color: '#1f2937', margin: '0 0 4px 0' }}>
                            {file.filename}
                          </p>
                          <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>
                            {(file.file_size / 1024).toFixed(2)} KB • {file.status}
                          </p>
                        </div>
                        <button
                          onClick={() => handleDeleteFile(file.id)}
                          style={{
                            background: '#fee2e2',
                            color: '#dc2626',
                            padding: '8px 16px',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontWeight: '600'
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Customize Tab */}
          {activeTab === 'customize' && selectedChatbot && (
            <div>
              <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1f2937', marginBottom: '8px' }}>
                Customize Chatbot
              </h2>
              <p style={{ color: '#6b7280', marginBottom: '24px' }}>
                Personalize your chatbot's appearance
              </p>

              <div style={{ maxWidth: '600px' }}>
                <div style={{ marginBottom: '24px' }}>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#374151',
                    marginBottom: '8px'
                  }}>
                    Chatbot Name
                  </label>
                  <input
                    type="text"
                    value={chatbotName}
                    onChange={(e) => setChatbotName(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '1px solid #d1d5db',
                      borderRadius: '8px',
                      fontSize: '16px',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <div style={{ marginBottom: '24px' }}>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#374151',
                    marginBottom: '8px'
                  }}>
                    Theme Color
                  </label>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <input
                      type="color"
                      value={chatbotColor}
                      onChange={(e) => setChatbotColor(e.target.value)}
                      style={{
                        width: '80px',
                        height: '44px',
                        border: '1px solid #d1d5db',
                        borderRadius: '8px',
                        cursor: 'pointer'
                      }}
                    />
                    <input
                      type="text"
                      value={chatbotColor}
                      onChange={(e) => setChatbotColor(e.target.value)}
                      style={{
                        flex: 1,
                        padding: '12px 16px',
                        border: '1px solid #d1d5db',
                        borderRadius: '8px',
                        fontSize: '16px'
                      }}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '24px' }}>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#374151',
                    marginBottom: '8px'
                  }}>
                    Welcome Message
                  </label>
                  <textarea
                    value={welcomeMessage}
                    onChange={(e) => setWelcomeMessage(e.target.value)}
                    rows={3}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '1px solid #d1d5db',
                      borderRadius: '8px',
                      fontSize: '16px',
                      fontFamily: 'inherit',
                      boxSizing: 'border-box',
                      resize: 'vertical'
                    }}
                  />
                </div>

                <button
                  onClick={handleUpdateChatbot}
                  style={{
                    background: '#667eea',
                    color: 'white',
                    padding: '12px 32px',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'background 0.2s'
                  }}
                  onMouseEnter={(e) => e.target.style.background = '#5568d3'}
                  onMouseLeave={(e) => e.target.style.background = '#667eea'}
                >
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {/* Deploy Tab */}
          {activeTab === 'deploy' && selectedChatbot && (
            <div>
              <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1f2937', marginBottom: '8px' }}>
                Deploy Your Chatbot
              </h2>
              <p style={{ color: '#6b7280', marginBottom: '24px' }}>
                Copy and paste this code into your website
              </p>

              <button
                onClick={handleDeploy}
                style={{
                  background: '#10b981',
                  color: 'white',
                  padding: '12px 32px',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  marginBottom: '24px'
                }}
              >
                Deploy Chatbot
              </button>

              <div style={{
                background: '#1f2937',
                borderRadius: '12px',
                padding: '24px',
                position: 'relative',
                marginBottom: '24px'
              }}>
                <button
                  onClick={handleCopyCode}
                  style={{
                    position: 'absolute',
                    top: '16px',
                    right: '16px',
                    background: '#374151',
                    color: 'white',
                    padding: '8px 16px',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '14px',
                    cursor: 'pointer',
                    fontWeight: '600'
                  }}
                >
                  {copied ? '✓ Copied!' : 'Copy Code'}
                </button>
                <pre style={{
                  color: '#10b981',
                  fontSize: '14px',
                  overflow: 'auto',
                  margin: 0,
                  fontFamily: 'monospace',
                  lineHeight: '1.6'
                }}>
                  <code>{widgetCode}</code>
                </pre>
              </div>

              <div style={{
                background: '#eff6ff',
                border: '1px solid #bfdbfe',
                borderRadius: '12px',
                padding: '24px'
              }}>
                <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1e40af', marginBottom: '12px' }}>
                  📋 Quick Start Guide
                </h3>
                <ol style={{ color: '#1e40af', paddingLeft: '20px', margin: 0, lineHeight: '1.8' }}>
                  <li>Copy the widget code above</li>
                  <li>Paste it into your website's HTML before the closing &lt;/body&gt; tag</li>
                  <li>Save and publish your website</li>
                  <li>Your chatbot will appear in the bottom-right corner!</li>
                </ol>
              </div>
            </div>
          )}

          {!selectedChatbot && activeTab !== 'chatbots' && (
            <div style={{ textAlign: 'center', padding: '48px', color: '#6b7280' }}>
              <p style={{ fontSize: '18px' }}>Please select or create a chatbot first</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Add CSS animation for toast
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
`;
if (!document.head.querySelector('style[data-toast]')) {
  style.setAttribute('data-toast', 'true');
  document.head.appendChild(style);
}

export default Dashboard;