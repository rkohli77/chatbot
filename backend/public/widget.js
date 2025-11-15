(async function() {
    // Configuration validation
    if (!window.chatbotConfig) {
        return;
    }

    const cfg = window.chatbotConfig;
    if (!cfg.chatbotId || !cfg.apiUrl) {
        return;
    }

    // Load live settings - exit if not deployed
    let live = {};
    try {
        const apiUrl = `${cfg.apiUrl}/public/chatbots/${cfg.chatbotId}`;
        const res = await fetch(apiUrl, { cache: 'no-store' });
        if (res.ok) {
            live = await res.json();
        } else {
            return;
        }
    } catch (e) {
        return;
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
        display: flex;
        justify-content: space-between;
        align-items: center;
    `;
    
    const chatTitle = document.createElement('span');
    chatTitle.textContent = config.name || 'AI Chat';
    
    const headerButtons = document.createElement('div');
    headerButtons.style.cssText = `
        display: flex;
        gap: 8px;
    `;
    
    const minimizeBtn = document.createElement('button');
    minimizeBtn.innerHTML = '−';
    minimizeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 18px;
        cursor: pointer;
        padding: 2px 6px;
        border-radius: 3px;
    `;
    minimizeBtn.onmouseover = () => minimizeBtn.style.background = 'rgba(255,255,255,0.2)';
    minimizeBtn.onmouseout = () => minimizeBtn.style.background = 'none';
    
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '×';
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 18px;
        cursor: pointer;
        padding: 2px 6px;
        border-radius: 3px;
    `;
    closeBtn.onmouseover = () => closeBtn.style.background = 'rgba(255,255,255,0.2)';
    closeBtn.onmouseout = () => closeBtn.style.background = 'none';
    
    headerButtons.appendChild(minimizeBtn);
    headerButtons.appendChild(closeBtn);
    chatHeader.appendChild(chatTitle);
    chatHeader.appendChild(headerButtons);

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

    function addTypingIndicator() {
        const typing = document.createElement('div');
        typing.id = 'typing-indicator';
        typing.style.cssText = `
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
        `;
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

    // Show welcome message when chat opens
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
})(); 