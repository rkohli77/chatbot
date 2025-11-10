# Quick Testing Guide - 5 Minutes

## ✅ Step-by-Step Testing

### Step 1: Start Your Server (2 minutes)

```bash
cd backend
npm run dev
```

**What to check:**
- ✅ Server starts without errors
- ✅ You see: `🚀 Server: http://localhost:3001`
- ✅ You see: `✅ Using Supabase database`

**If you see errors:**
- Check your `.env` file has all required variables
- Make sure dependencies are installed: `npm install`

---

### Step 2: Test Basic Endpoints (1 minute)

Open a new terminal and run:

```bash
# Test 1: Health check
curl http://localhost:3001/health

# Expected: {"status":"ok","timestamp":"..."}
```

```bash
# Test 2: Root endpoint
curl http://localhost:3001/

# Expected: {"message":"Chatbot API (Supabase)","version":"2.0.0"}
```

**✅ If both work, your server is running correctly!**

---

### Step 3: Test Authentication (2 minutes)

#### 3a. Register a User
```bash
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -H "Origin: http://localhost:3000" \
  -d '{
    "email": "test@example.com",
    "password": "testpass123"
  }'
```

**Expected:** 
- Status 200
- Response with `token` and `user` object
- **Save the token!**

#### 3b. Login
```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -H "Origin: http://localhost:3000" \
  -d '{
    "email": "test@example.com",
    "password": "testpass123"
  }'
```

**Expected:** Status 200 with token

**✅ If both work, authentication is working!**

---

### Step 4: Test Widget in Browser (2 minutes)

#### 4a. Create a Chatbot First
```bash
# Replace YOUR_TOKEN with token from Step 3a
curl -X POST http://localhost:3001/api/chatbots \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -H "Origin: http://localhost:3000" \
  -d '{
    "name": "Test Bot",
    "color": "#6366f1",
    "welcomeMessage": "Hello!"
  }'
```

**Expected:** Response with chatbot ID (starts with `cb_`)
**Save the chatbot ID!**

#### 4b. Test Widget in Browser

1. Open `frontend/test_widget.html` in a text editor
2. Replace `YOUR_CHATBOT_ID` with the chatbot ID from Step 4a
3. Make sure `apiUrl` is `http://localhost:3001`
4. Save the file
5. Open it in your browser (double-click the file)

**What to check:**
- ✅ Chat button appears in bottom-right corner
- ✅ Clicking it opens the chat window
- ✅ You can type a message
- ✅ Message sends (no errors in browser console)
- ✅ You get a response (or error if no documents uploaded)

**Open browser console (F12) and check for errors:**
- ❌ Red errors = Something is wrong
- ✅ No errors = Everything working!

---

### Step 5: Test Chat Endpoint Directly (1 minute)

```bash
# Replace CHATBOT_ID with your chatbot ID
curl -X POST http://localhost:3001/api/chat \
  -H "Content-Type: application/json" \
  -H "Origin: http://example.com" \
  -d '{
    "chatbotId": "CHATBOT_ID",
    "message": "Hello, test message"
  }'
```

**Expected:**
- If chatbot has documents: Status 200 with AI response
- If no documents: Status 404 "No training data found"

**✅ If you get a response (or expected error), chat endpoint works!**

---

## 🎯 Quick Status Check

After testing, you should have:

- ✅ Server running on port 3001
- ✅ Health endpoint responds
- ✅ Can register users
- ✅ Can login
- ✅ Can create chatbots
- ✅ Widget loads in browser
- ✅ Chat endpoint responds

---

## ❌ Common Issues & Fixes

### Issue: "Cannot find module 'helmet'"
**Fix:** Run `npm install` in the backend directory

### Issue: "Missing environment variables"
**Fix:** Check your `.env` file has:
- SUPABASE_URL
- SUPABASE_KEY
- OPENAI_API_KEY
- JWT_SECRET

### Issue: Widget doesn't load
**Fix:** 
- Check server is running
- Check browser console for errors
- Verify `apiUrl` in test_widget.html is correct

### Issue: CORS errors in browser
**Fix:** 
- Make sure server is running
- Check CORS configuration in server.js
- Verify Origin header matches allowed origins

### Issue: "No training data found"
**Fix:** This is normal if you haven't uploaded documents yet. Upload a document to your chatbot first.

---

## ✅ Ready for Production?

If all tests pass:
1. ✅ Server starts without errors
2. ✅ Authentication works
3. ✅ Widget loads in browser
4. ✅ Chat endpoint responds
5. ✅ No errors in browser console

**Then you're ready to deploy!** 🚀

---

## 🚨 Still Having Issues?

1. Check server logs for errors
2. Check browser console (F12) for errors
3. Verify all environment variables are set
4. Make sure dependencies are installed: `npm install`
5. Review the full `TESTING.md` guide for detailed tests

