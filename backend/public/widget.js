(async function() {
    // Configuration validation
    if (!window.chatbotConfig) {
        console.error('Chatbot configuration not found!');
        return;
    }

    const cfg = window.chatbotConfig;
    if (!cfg.chatbotId || !cfg.apiUrl) {
        console.error('Missing required chatbot configuration!');
        return;
    }

    // Load live settings
    let live = {};
    try {
        const res = await fetch(`${cfg.apiUrl}/public/chatbots/${cfg.chatbotId}`, { cache: 'no-store' });
        if (res.ok) {
            live = await res.json();
        }
    } catch (e) {
        console.warn('Failed to fetch live chatbot settings, falling back to embed values.', e);
    }

    const config = {
        ...cfg,
        name: live.name || cfg.name || 'AI Chat',
        color: live.color || cfg.color || '#667eea',
        welcomeMessage: live.welcomeMessage || cfg.welcomeMessage
    };

    // Create chatbot UI
    const chatbotContainer = document.createElement('div');
    chatbotContainer.id = 'ai-chatbot-container';
    chatbotContainer.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 1000;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
    `;

    // Create chat window
    const chatWindow = document.createElement('div');
    chatWindow.id = 'ai-chatbot-window';
    chatWindow.style.cssText = `
        display: none;
        width: 350px;
        height: 500px;
        background: white;
        border-radius: 10px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        margin-bottom: 10px;
        overflow: hidden;
        flex-direction: column;
    `;

    // Chat header
    const chatHeader = document.createElement('div');
    chatHeader.style.cssText = `
        padding: 15px;
        background: ${config.color || '#667eea'};
        color: white;
        font-family: system-ui, -apple-system, sans-serif;
        font-weight: 600;
    `;
    chatHeader.textContent = config.name || 'AI Chat';

    // Chat messages container
    const messagesContainer = document.createElement('div');
    messagesContainer.style.cssText = `
        flex: 1;
        padding: 15px;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        gap: 10px;
        background: #f9fafb;
    `;

    // Input container
    const inputContainer = document.createElement('div');
    inputContainer.style.cssText = `
        padding: 15px;
        border-top: 1px solid #e5e7eb;
        display: flex;
        gap: 10px;
        background: white;
    `;

    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Type your message...';
    input.style.cssText = `
        flex: 1;
        padding: 8px 12px;
        border: 1px solid #d1d5db;
        border-radius: 6px;
        font-size: 14px;
        outline: none;
    `;

    const sendButton = document.createElement('button');
    sendButton.textContent = 'Send';
    sendButton.style.cssText = `
        padding: 8px 16px;
        background: ${config.color || '#667eea'};
        color: white;
        border: none;
        border-radius: 6px;
        font-weight: 600;
        cursor: pointer;
    `;

    // Toggle button
    const toggleButton = document.createElement('button');
    toggleButton.style.cssText = `
        width: 60px;
        height: 60px;
        border-radius: 30px;
        background: ${config.color || '#667eea'};
        color: white;
        border: none;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 24px;
    `;
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
        message.style.cssText = `
            padding: 10px 15px;
            border-radius: 10px;
            max-width: 80%;
            ${isUser ? 'background: ' + config.color + '; color: white; align-self: flex-end;' 
                    : 'background: white; border: 1px solid #e5e7eb; align-self: flex-start;'}
            font-family: system-ui, -apple-system, sans-serif;
            font-size: 14px;
        `;
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
            const response = await fetch(`${config.apiUrl}/api/chat`, {
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