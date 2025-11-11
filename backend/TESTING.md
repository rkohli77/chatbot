# Testing Guide - Pre-Production Checklist

## 🧪 Testing Your Chatbot Before Production

### Prerequisites
1. ✅ All dependencies installed: `npm install`
2. ✅ Environment variables configured in `.env`
3. ✅ Server runs without errors: `npm run dev`

---

## 1. Basic Server Health Tests

### Test 1: Server Startup
```bash
cd backend
npm run dev
```
**Expected**: Server starts on port 3001 (or your configured PORT)

### Test 2: Health Endpoint
```bash
curl http://localhost:3001/health
```
**Expected**: `{"status":"ok","timestamp":"..."}`

### Test 3: Root Endpoint
```bash
curl http://localhost:3001/
```
**Expected**: `{"message":"Chatbot API (Supabase)","version":"2.0.0"}`

---

## 2. Authentication Tests

### Test 4: User Registration (Valid)
```bash
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -H "Origin: http://localhost:3000" \
  -d '{
    "email": "test@example.com",
    "password": "testpass123"
  }'
```
**Expected**: 
- Status: 200
- Response contains `token` and `user` object
- Email is normalized (lowercase)

### Test 5: User Registration (Invalid Email)
```bash
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -H "Origin: http://localhost:3000" \
  -d '{
    "email": "invalid-email",
    "password": "testpass123"
  }'
```
**Expected**: 
- Status: 400
- Error message about invalid email

### Test 6: User Registration (Short Password)
```bash
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -H "Origin: http://localhost:3000" \
  -d '{
    "email": "test2@example.com",
    "password": "12345"
  }'
```
**Expected**: 
- Status: 400
- Error about password length

### Test 7: User Login (Valid)
```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -H "Origin: http://localhost:3000" \
  -d '{
    "email": "test@example.com",
    "password": "testpass123"
  }'
```
**Expected**: 
- Status: 200
- Response contains `token` and `user` object
- Save the token for next tests

### Test 8: User Login (Invalid Credentials)
```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -H "Origin: http://localhost:3000" \
  -d '{
    "email": "test@example.com",
    "password": "wrongpassword"
  }'
```
**Expected**: 
- Status: 401
- Generic error: "Invalid credentials" (doesn't reveal if email exists)

---

## 3. Chatbot Management Tests

### Test 9: Get Chatbots (Authenticated)
```bash
# Replace YOUR_TOKEN with token from Test 7
curl http://localhost:3001/api/chatbots \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Origin: http://localhost:3000"
```
**Expected**: 
- Status: 200
- Array of chatbots (may be empty)

### Test 10: Create Chatbot
```bash
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
**Expected**: 
- Status: 200
- Response contains chatbot with ID starting with `cb_`
- Save the chatbot ID for widget tests

### Test 11: Get Chatbots (Unauthenticated)
```bash
curl http://localhost:3001/api/chatbots
```
**Expected**: 
- Status: 401
- Error: "Token required"

---

## 4. Widget Chat Endpoint Tests

### Test 12: Chat Request (Valid)
```bash
# Replace CHATBOT_ID with ID from Test 10
curl -X POST http://localhost:3001/api/chat \
  -H "Content-Type: application/json" \
  -H "Origin: http://example.com" \
  -d '{
    "chatbotId": "CHATBOT_ID",
    "message": "Hello, what can you help me with?"
  }'
```
**Expected**: 
- Status: 200
- Response contains `response` with AI-generated text

### Test 13: Chat Request (Invalid Chatbot ID)
```bash
curl -X POST http://localhost:3001/api/chat \
  -H "Content-Type: application/json" \
  -H "Origin: http://example.com" \
  -d '{
    "chatbotId": "invalid_id",
    "message": "Hello"
  }'
```
**Expected**: 
- Status: 400
- Error: "Invalid chatbot ID format"

### Test 14: Chat Request (Missing Parameters)
```bash
curl -X POST http://localhost:3001/api/chat \
  -H "Content-Type: application/json" \
  -H "Origin: http://example.com" \
  -d '{
    "chatbotId": "cb_abc123xyz"
  }'
```
**Expected**: 
- Status: 400
- Validation error

### Test 15: Chat Request (Message Too Long)
```bash
# Create a message longer than 2000 characters
LONG_MESSAGE=$(python3 -c "print('a' * 2001)")
curl -X POST http://localhost:3001/api/chat \
  -H "Content-Type: application/json" \
  -H "Origin: http://example.com" \
  -d "{\"chatbotId\": \"CHATBOT_ID\", \"message\": \"$LONG_MESSAGE\"}"
```
**Expected**: 
- Status: 400
- Error about message length

### Test 16: Rate Limiting Test
```bash
# Make 21 requests quickly (limit is 20 per minute)
for i in {1..21}; do
  curl -X POST http://localhost:3001/api/chat \
    -H "Content-Type: application/json" \
    -H "Origin: http://example.com" \
    -d '{
      "chatbotId": "CHATBOT_ID",
      "message": "Test message"
    }'
  echo ""
done
```
**Expected**: 
- First 20 requests: Status 200 or 400/404 (depending on chatbot)
- 21st request: Status 429 "Too many requests"

---

## 5. CORS Tests

### Test 17: OPTIONS Preflight (Widget Endpoint)
```bash
curl -X OPTIONS http://localhost:3001/api/chat \
  -H "Origin: http://example.com" \
  -H "Access-Control-Request-Method: POST" \
  -H "Access-Control-Request-Headers: Content-Type" \
  -v
```
**Expected**: 
- Status: 204
- Headers include: `Access-Control-Allow-Origin: *`
- Headers include: `Access-Control-Allow-Methods: GET, POST, OPTIONS`

### Test 18: CORS from Different Origin
```bash
curl -X POST http://localhost:3001/api/chat \
  -H "Content-Type: application/json" \
  -H "Origin: https://different-domain.com" \
  -d '{
    "chatbotId": "CHATBOT_ID",
    "message": "Test"
  }'
```
**Expected**: 
- Status: 200 or 400 (not 403 CORS error)
- Headers include: `Access-Control-Allow-Origin: *`

---

## 6. Security Tests

### Test 19: XSS Attempt in Message
```bash
curl -X POST http://localhost:3001/api/chat \
  -H "Content-Type: application/json" \
  -H "Origin: http://example.com" \
  -d '{
    "chatbotId": "CHATBOT_ID",
    "message": "<script>alert(\"XSS\")</script>Hello"
  }'
```
**Expected**: 
- Status: 200 or 400
- Response should NOT contain `<script>` tags
- HTML tags should be sanitized

### Test 20: SQL Injection Attempt
```bash
curl -X POST http://localhost:3001/api/chat \
  -H "Content-Type: application/json" \
  -H "Origin: http://example.com" \
  -d '{
    "chatbotId": "cb_abc123xyz\"; DROP TABLE users; --",
    "message": "Test"
  }'
```
**Expected**: 
- Status: 400
- Error: "Invalid chatbot ID format"
- Database should be safe (Supabase uses parameterized queries)

### Test 21: Request Size Limit
```bash
# Create a large JSON payload (>1MB)
LARGE_PAYLOAD=$(python3 -c "print('{\"chatbotId\": \"cb_abc123xyz\", \"message\": \"' + 'a' * 1048576 + '\"}')")
curl -X POST http://localhost:3001/api/chat \
  -H "Content-Type: application/json" \
  -H "Origin: http://example.com" \
  -d "$LARGE_PAYLOAD"
```
**Expected**: 
- Status: 413 (Payload Too Large) or 400
- Request should be rejected

---

## 7. Widget Integration Test

### Test 22: Widget.js File Accessible
```bash
curl http://localhost:3001/widget.js
```
**Expected**: 
- Status: 200
- Returns JavaScript file content
- Headers include CORS headers

### Test 23: Widget in HTML Page
1. Create a test HTML file:
```html
<!DOCTYPE html>
<html>
<head>
  <title>Widget Test</title>
</head>
<body>
  <h1>Widget Test Page</h1>
  
  <script>
    window.chatbotConfig = {
      chatbotId: "YOUR_CHATBOT_ID",
      apiUrl: "http://localhost:3001",
      name: "Test Bot",
      color: "#6366f1"
    };
  </script>
  <script src="http://localhost:3001/widget.js"></script>
</body>
</html>
```

2. Open in browser
3. Check browser console for errors
4. Click chat button and send a message

**Expected**: 
- Widget loads without errors
- Chat button appears
- Can send messages
- Responses appear

---

## 8. Error Handling Tests

### Test 24: Invalid Route
```bash
curl http://localhost:3001/api/invalid-route
```
**Expected**: 
- Status: 404
- Error: "Not found"

### Test 25: Server Error Handling
```bash
# Test with invalid chatbot (should trigger error)
curl -X POST http://localhost:3001/api/chat \
  -H "Content-Type: application/json" \
  -H "Origin: http://example.com" \
  -d '{
    "chatbotId": "cb_nonexist",
    "message": "Test"
  }'
```
**Expected**: 
- Status: 404 or 500
- Generic error message (no internal details leaked)

---

## 9. Performance Tests

### Test 26: Response Time
```bash
time curl -X POST http://localhost:3001/api/chat \
  -H "Content-Type: application/json" \
  -H "Origin: http://example.com" \
  -d '{
    "chatbotId": "CHATBOT_ID",
    "message": "Quick test"
  }'
```
**Expected**: 
- Response time < 5 seconds (depends on OpenAI API)

---

## 10. Production Readiness Checklist

Before deploying, verify:

### Environment Variables
- [ ] `SUPABASE_URL` is set
- [ ] `SUPABASE_KEY` is set
- [ ] `OPENAI_API_KEY` is set
- [ ] `JWT_SECRET` is set (strong, random string)
- [ ] `PORT` is set (if not using default)
- [ ] `NODE_ENV=production` (for production)

### Security
- [ ] All tests pass
- [ ] No sensitive data in code
- [ ] `.env` file is in `.gitignore`
- [ ] Error messages don't leak information
- [ ] Rate limiting works
- [ ] CORS configured correctly

### Functionality
- [ ] User registration works
- [ ] User login works
- [ ] Chatbot creation works
- [ ] Chat endpoint works
- [ ] Widget loads correctly
- [ ] File uploads work (if using)

### Performance
- [ ] Response times acceptable
- [ ] Rate limiting prevents abuse
- [ ] No memory leaks
- [ ] Server handles concurrent requests

---

## Quick Test Script

Save this as `test-api.sh`:

```bash
#!/bin/bash
BASE_URL="http://localhost:3001"

echo "🧪 Testing Chatbot API..."
echo ""

echo "1. Health Check..."
curl -s "$BASE_URL/health" | jq .
echo ""

echo "2. Register User..."
REGISTER_RESPONSE=$(curl -s -X POST "$BASE_URL/api/auth/register" \
  -H "Content-Type: application/json" \
  -H "Origin: http://localhost:3000" \
  -d '{"email":"test@example.com","password":"testpass123"}')
echo "$REGISTER_RESPONSE" | jq .
TOKEN=$(echo "$REGISTER_RESPONSE" | jq -r '.token')
echo ""

echo "3. Login..."
LOGIN_RESPONSE=$(curl -s -X POST "$BASE_URL/api/auth/login" \
  -H "Content-Type: application/json" \
  -H "Origin: http://localhost:3000" \
  -d '{"email":"test@example.com","password":"testpass123"}')
echo "$LOGIN_RESPONSE" | jq .
echo ""

echo "4. Get Chatbots..."
curl -s "$BASE_URL/api/chatbots" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Origin: http://localhost:3000" | jq .
echo ""

echo "✅ Basic tests complete!"
```

Make it executable: `chmod +x test-api.sh`
Run: `./test-api.sh`

---

## 🚀 Ready for Production?

Once all tests pass, you're ready to deploy! 🎉

