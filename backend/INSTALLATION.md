# Chatbot Widget Installation Guide

## Plug-and-Play Installation

This chatbot widget can be embedded on **any website** without requiring domain-specific configuration. The widget works across all client websites automatically.

## Quick Installation

Add these two lines to your HTML page (before the closing `</body>` tag):

```html
<script>
  window.chatbotConfig = {
    chatbotId: "YOUR_CHATBOT_ID",  // Get this from your dashboard
    apiUrl: "https://chatbot-4u1j.onrender.com",  // Your deployed API URL
    name: "Support Bot",  // Optional: Chatbot name
    color: "#6366f1",  // Optional: Button color (hex code)
    welcomeMessage: "Hi! How can I help you?"  // Optional: Welcome message
  };
</script>
<script src="https://chatbot-4u1j.onrender.com/widget.js"></script>
```

## Configuration Options

| Option | Required | Description |
|-------|----------|-------------|
| `chatbotId` | ✅ Yes | Your chatbot ID from the dashboard |
| `apiUrl` | ✅ Yes | Your deployed API server URL (e.g., `https://chatbot-4u1j.onrender.com`) |
| `name` | ❌ No | Display name for the chatbot (default: "AI Chat") |
| `color` | ❌ No | Button and header color (default: "#667eea") |
| `welcomeMessage` | ❌ No | Initial message shown when chat opens |

## Example: Complete HTML Page

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>My Website</title>
</head>
<body>
  <h1>Welcome to My Website</h1>
  <p>Your content here...</p>

  <!-- Chatbot Widget -->
  <script>
    window.chatbotConfig = {
      chatbotId: "cb_abc123xyz",
      apiUrl: "https://chatbot-4u1j.onrender.com",
      name: "Support Assistant",
      color: "#6366f1",
      welcomeMessage: "Hello! How can I assist you today?"
    };
  </script>
  <script src="https://chatbot-4u1j.onrender.com/widget.js"></script>
</body>
</html>
```

## Important Notes

1. **No Domain Configuration Needed**: The widget works on any domain automatically. You don't need to configure `FRONTEND_URL` for each client website.

2. **FRONTEND_URL Usage**: The `FRONTEND_URL` environment variable is only used for the **admin dashboard** (authenticated routes), not for the widget. Set it to your admin dashboard URL (e.g., `https://admin.yourdomain.com`).

3. **CORS**: The widget endpoints (`/api/chat` and `/widget.js`) accept requests from any origin, so they work on any website.

4. **Deployment**: Deploy your backend to a service like Render, Heroku, or Railway. The widget will work from any website that loads it.

## Testing

1. Deploy your backend server
2. Get your `chatbotId` from the dashboard
3. Add the widget code to any HTML page
4. The chatbot will appear in the bottom-right corner

## Support

For issues or questions, check that:
- Your `apiUrl` points to your deployed server
- Your `chatbotId` is correct
- The chatbot has documents uploaded (training data)
- Your server is running and accessible

