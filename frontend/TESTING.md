# Frontend Testing Guide

## 🧪 Testing Your Frontend

You have two frontend components to test:
1. **React Dashboard** (Admin panel for managing chatbots)
2. **Widget** (Embeddable chatbot for client websites)

---

## Part 1: Testing the React Dashboard

### Step 1: Start the React App

```bash
cd frontend
npm install  # If you haven't already
npm start
```

**Expected:**
- Server starts on `http://localhost:3000`
- Browser opens automatically
- You see the login/register page

### Step 2: Test User Registration

1. Click "Register" or go to register page
2. Enter:
   - Email: `test@example.com`
   - Password: `testpass123` (min 6 characters)
3. Click "Register"

**Expected:**
- ✅ Registration successful
- ✅ Redirected to dashboard
- ✅ You see your chatbots (empty list initially)

**If you see errors:**
- Check browser console (F12) for errors
- Verify backend server is running on port 3001
- Check CORS configuration

### Step 3: Test User Login

1. Logout (if logged in)
2. Enter credentials:
   - Email: `test@example.com`
   - Password: `testpass123`
3. Click "Login"

**Expected:**
- ✅ Login successful
- ✅ Redirected to dashboard
- ✅ Token stored in localStorage

### Step 4: Test Dashboard Features

#### 4a. Create a Chatbot
1. Click "Create New Chatbot" or similar button
2. Fill in:
   - Name: "Test Bot"
   - Color: Pick a color
   - Welcome Message: "Hello! How can I help?"
3. Click "Create"

**Expected:**
- ✅ Chatbot created
- ✅ Appears in your chatbot list
- ✅ You get a chatbot ID (starts with `cb_`)
- **Save this ID for widget testing!**

#### 4b. Upload Documents
1. Click on your chatbot
2. Find "Upload Document" or "Add Document"
3. Upload a test file (PDF, TXT, or DOCX)
4. Wait for upload to complete

**Expected:**
- ✅ File uploads successfully
- ✅ Document appears in chatbot's document list
- ✅ Status shows "ready" or "processed"

#### 4c. Edit Chatbot
1. Click "Edit" on a chatbot
2. Change name, color, or welcome message
3. Save changes

**Expected:**
- ✅ Changes saved
- ✅ Updated info appears in dashboard

#### 4d. Delete Chatbot (Optional)
1. Click "Delete" on a chatbot
2. Confirm deletion

**Expected:**
- ✅ Chatbot removed from list

---

## Part 2: Testing the Widget

### Step 1: Get Your Chatbot ID

From the dashboard, copy the chatbot ID (starts with `cb_`)

### Step 2: Update test_widget.html

1. Open `frontend/test_widget.html` in a text editor
2. Replace `YOUR_CHATBOT_ID` with your actual chatbot ID
3. Make sure `apiUrl` is `http://localhost:3001` (for local testing)
4. Save the file

```html
<script>
  window.chatbotConfig = {
    chatbotId: "cb_abc123xyz",  // ← Your actual chatbot ID
    apiUrl: "http://localhost:3001",  // ← Backend URL
    color: "#6366f1",
    name: "Support Bot",
    welcomeMessage: "Hi! How can I help you today?"
  };
</script>
```

### Step 3: Open in Browser

**Option A: Direct File Open**
1. Double-click `test_widget.html`
2. Or right-click → Open with → Browser

**Option B: Local Server (Recommended)**
```bash
# In the frontend directory
python3 -m http.server 8000
# Then open: http://localhost:8000/test_widget.html
```

### Step 4: Test Widget Functionality

#### 4a. Visual Check
- ✅ Chat button appears in bottom-right corner
- ✅ Button has the color you specified
- ✅ Button shows the chatbot name or icon

#### 4b. Open Chat Window
1. Click the chat button
2. **Expected:**
   - ✅ Chat window opens
   - ✅ Shows welcome message (if set)
   - ✅ Input field is visible
   - ✅ Send button is visible

#### 4c. Send a Message
1. Type a message: "Hello, what can you help me with?"
2. Click "Send" or press Enter
3. **Expected:**
   - ✅ Your message appears in chat
   - ✅ Loading indicator (optional)
   - ✅ AI response appears
   - ✅ No errors in console

#### 4d. Check Browser Console
1. Open Developer Tools (F12 or Right-click → Inspect)
2. Go to "Console" tab
3. **Expected:**
   - ✅ No red errors
   - ✅ Only info/warning messages (if any)

**If you see errors:**
- ❌ CORS errors → Check backend CORS configuration
- ❌ 404 errors → Check chatbot ID is correct
- ❌ 500 errors → Check backend server logs
- ❌ "Failed to load resource" → Check backend is running

### Step 5: Test Widget on Different Origins

To test CORS (important for production):

1. Create a simple HTML file on a different port:
```bash
# Create test.html
cat > /tmp/test-widget.html << 'EOF'
<!DOCTYPE html>
<html>
<head><title>Widget Test</title></head>
<body>
  <h1>Widget Test from Different Origin</h1>
  <script>
    window.chatbotConfig = {
      chatbotId: "YOUR_CHATBOT_ID",
      apiUrl: "http://localhost:3001"
    };
  </script>
  <script src="http://localhost:3001/widget.js"></script>
</body>
</html>
EOF

# Serve it on different port
cd /tmp && python3 -m http.server 8080
```

2. Open: `http://localhost:8080/test-widget.html`
3. **Expected:**
   - ✅ Widget loads
   - ✅ Can send messages
   - ✅ No CORS errors

---

## Part 3: Testing Checklist

### React Dashboard ✅
- [ ] App starts without errors
- [ ] Can register new user
- [ ] Can login with credentials
- [ ] Dashboard loads after login
- [ ] Can create chatbot
- [ ] Can upload documents
- [ ] Can edit chatbot
- [ ] Can view chatbot list
- [ ] Logout works

### Widget ✅
- [ ] Widget.js loads from backend
- [ ] Chat button appears
- [ ] Chat window opens
- [ ] Can type messages
- [ ] Messages send successfully
- [ ] AI responses appear
- [ ] No console errors
- [ ] Works on different origins (CORS)
- [ ] Welcome message displays
- [ ] Custom color applies

### Integration ✅
- [ ] Backend server running
- [ ] Frontend connects to backend
- [ ] API calls work
- [ ] Authentication works
- [ ] Widget can access chat endpoint
- [ ] CORS allows cross-origin requests

---

## Common Issues & Fixes

### Issue: "Cannot connect to backend"
**Fix:**
- Check backend is running: `curl http://localhost:3001/health`
- Verify `apiUrl` in frontend code matches backend URL
- Check CORS configuration in backend

### Issue: "Widget not loading"
**Fix:**
- Check browser console for errors
- Verify `widget.js` is accessible: `http://localhost:3001/widget.js`
- Check chatbot ID is correct
- Ensure backend server is running

### Issue: "CORS errors in console"
**Fix:**
- Backend CORS should allow frontend origin
- Check `allowedOrigins` in `server.js` includes `http://localhost:3000`
- For widget, CORS should allow all origins (`origin: '*'`)

### Issue: "No response from chat"
**Fix:**
- Check chatbot has documents uploaded
- Verify chatbot ID is correct
- Check backend logs for errors
- Verify OpenAI API key is set

### Issue: "Authentication fails"
**Fix:**
- Check backend is running
- Verify API URL in `frontend/src/services/api.js`
- Check CORS allows frontend origin
- Verify JWT_SECRET is set in backend

---

## Quick Test Commands

```bash
# 1. Start backend
cd backend && npm run dev

# 2. Start frontend (in new terminal)
cd frontend && npm start

# 3. Test widget (in browser)
# Open: frontend/test_widget.html
```

---

## Production Testing

Before deploying, test with production URLs:

1. Update `apiUrl` in widget config:
```javascript
apiUrl: "https://your-production-api.com"
```

2. Test widget on a real website (not localhost)

3. Test from different domains to verify CORS

4. Test on mobile devices

5. Test with slow network (throttle in browser DevTools)

---

## 🎯 Success Criteria

Your frontend is working correctly if:

✅ React dashboard loads and functions
✅ Can create and manage chatbots
✅ Widget loads on test page
✅ Can send messages and get responses
✅ No errors in browser console
✅ Works from different origins
✅ Responsive design works on mobile

---

## 🚀 Ready for Production?

If all tests pass, you're ready to deploy! 🎉

