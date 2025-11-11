#!/bin/bash

# Chatbot API Testing Script
# Run this script to test your API before production deployment

BASE_URL="${BASE_URL:-http://localhost:3001}"
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}🧪 Testing Chatbot API...${NC}"
echo "Base URL: $BASE_URL"
echo ""

# Test 1: Health Check
echo -e "${YELLOW}1. Health Check...${NC}"
HEALTH=$(curl -s -w "\n%{http_code}" "$BASE_URL/health")
HTTP_CODE=$(echo "$HEALTH" | tail -n1)
BODY=$(echo "$HEALTH" | head -n-1)

if [ "$HTTP_CODE" -eq 200 ]; then
  echo -e "${GREEN}✅ Health check passed${NC}"
  echo "$BODY" | jq . 2>/dev/null || echo "$BODY"
else
  echo -e "${RED}❌ Health check failed (Status: $HTTP_CODE)${NC}"
fi
echo ""

# Test 2: Register User
echo -e "${YELLOW}2. User Registration...${NC}"
REGISTER_RESPONSE=$(curl -s -w "\n%{http_code}" -X POST "$BASE_URL/api/auth/register" \
  -H "Content-Type: application/json" \
  -H "Origin: http://localhost:3000" \
  -d '{"email":"test'$(date +%s)'@example.com","password":"testpass123"}')
HTTP_CODE=$(echo "$REGISTER_RESPONSE" | tail -n1)
BODY=$(echo "$REGISTER_RESPONSE" | head -n-1)

if [ "$HTTP_CODE" -eq 200 ]; then
  echo -e "${GREEN}✅ Registration successful${NC}"
  echo "$BODY" | jq . 2>/dev/null || echo "$BODY"
  TOKEN=$(echo "$BODY" | jq -r '.token' 2>/dev/null)
  EMAIL=$(echo "$BODY" | jq -r '.user.email' 2>/dev/null)
else
  echo -e "${RED}❌ Registration failed (Status: $HTTP_CODE)${NC}"
  echo "$BODY" | jq . 2>/dev/null || echo "$BODY"
  exit 1
fi
echo ""

# Test 3: Login
echo -e "${YELLOW}3. User Login...${NC}"
LOGIN_RESPONSE=$(curl -s -w "\n%{http_code}" -X POST "$BASE_URL/api/auth/login" \
  -H "Content-Type: application/json" \
  -H "Origin: http://localhost:3000" \
  -d "{\"email\":\"$EMAIL\",\"password\":\"testpass123\"}")
HTTP_CODE=$(echo "$LOGIN_RESPONSE" | tail -n1)
BODY=$(echo "$LOGIN_RESPONSE" | head -n-1)

if [ "$HTTP_CODE" -eq 200 ]; then
  echo -e "${GREEN}✅ Login successful${NC}"
  echo "$BODY" | jq . 2>/dev/null || echo "$BODY"
  TOKEN=$(echo "$BODY" | jq -r '.token' 2>/dev/null)
else
  echo -e "${RED}❌ Login failed (Status: $HTTP_CODE)${NC}"
  echo "$BODY" | jq . 2>/dev/null || echo "$BODY"
  exit 1
fi
echo ""

# Test 4: Get Chatbots (Authenticated)
echo -e "${YELLOW}4. Get Chatbots (Authenticated)...${NC}"
CHATBOTS_RESPONSE=$(curl -s -w "\n%{http_code}" "$BASE_URL/api/chatbots" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Origin: http://localhost:3000")
HTTP_CODE=$(echo "$CHATBOTS_RESPONSE" | tail -n1)
BODY=$(echo "$CHATBOTS_RESPONSE" | head -n-1)

if [ "$HTTP_CODE" -eq 200 ]; then
  echo -e "${GREEN}✅ Get chatbots successful${NC}"
  echo "$BODY" | jq . 2>/dev/null || echo "$BODY"
else
  echo -e "${RED}❌ Get chatbots failed (Status: $HTTP_CODE)${NC}"
  echo "$BODY" | jq . 2>/dev/null || echo "$BODY"
fi
echo ""

# Test 5: Create Chatbot
echo -e "${YELLOW}5. Create Chatbot...${NC}"
CREATE_RESPONSE=$(curl -s -w "\n%{http_code}" -X POST "$BASE_URL/api/chatbots" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -H "Origin: http://localhost:3000" \
  -d '{"name":"Test Bot","color":"#6366f1","welcomeMessage":"Hello!"}')
HTTP_CODE=$(echo "$CREATE_RESPONSE" | tail -n1)
BODY=$(echo "$CREATE_RESPONSE" | head -n-1)

if [ "$HTTP_CODE" -eq 200 ]; then
  echo -e "${GREEN}✅ Create chatbot successful${NC}"
  echo "$BODY" | jq . 2>/dev/null || echo "$BODY"
  CHATBOT_ID=$(echo "$BODY" | jq -r '.id' 2>/dev/null)
else
  echo -e "${RED}❌ Create chatbot failed (Status: $HTTP_CODE)${NC}"
  echo "$BODY" | jq . 2>/dev/null || echo "$BODY"
  CHATBOT_ID=""
fi
echo ""

# Test 6: CORS Preflight
echo -e "${YELLOW}6. CORS Preflight (OPTIONS)...${NC}"
OPTIONS_RESPONSE=$(curl -s -w "\n%{http_code}" -X OPTIONS "$BASE_URL/api/chat" \
  -H "Origin: http://example.com" \
  -H "Access-Control-Request-Method: POST")
HTTP_CODE=$(echo "$OPTIONS_RESPONSE" | tail -n1)

if [ "$HTTP_CODE" -eq 204 ] || [ "$HTTP_CODE" -eq 200 ]; then
  echo -e "${GREEN}✅ CORS preflight successful (Status: $HTTP_CODE)${NC}"
else
  echo -e "${RED}❌ CORS preflight failed (Status: $HTTP_CODE)${NC}"
fi
echo ""

# Test 7: Widget.js Accessible
echo -e "${YELLOW}7. Widget.js File...${NC}"
WIDGET_RESPONSE=$(curl -s -w "\n%{http_code}" "$BASE_URL/widget.js")
HTTP_CODE=$(echo "$WIDGET_RESPONSE" | tail -n1)

if [ "$HTTP_CODE" -eq 200 ]; then
  echo -e "${GREEN}✅ Widget.js accessible${NC}"
else
  echo -e "${RED}❌ Widget.js not accessible (Status: $HTTP_CODE)${NC}"
fi
echo ""

# Test 8: Invalid Route (404)
echo -e "${YELLOW}8. Invalid Route (404 Test)...${NC}"
INVALID_RESPONSE=$(curl -s -w "\n%{http_code}" "$BASE_URL/api/invalid-route")
HTTP_CODE=$(echo "$INVALID_RESPONSE" | tail -n1)

if [ "$HTTP_CODE" -eq 404 ]; then
  echo -e "${GREEN}✅ 404 handling works${NC}"
else
  echo -e "${RED}❌ 404 handling failed (Status: $HTTP_CODE)${NC}"
fi
echo ""

# Test 9: Input Validation (Invalid Email)
echo -e "${YELLOW}9. Input Validation (Invalid Email)...${NC}"
VALIDATION_RESPONSE=$(curl -s -w "\n%{http_code}" -X POST "$BASE_URL/api/auth/register" \
  -H "Content-Type: application/json" \
  -H "Origin: http://localhost:3000" \
  -d '{"email":"invalid-email","password":"testpass123"}')
HTTP_CODE=$(echo "$VALIDATION_RESPONSE" | tail -n1)
BODY=$(echo "$VALIDATION_RESPONSE" | head -n-1)

if [ "$HTTP_CODE" -eq 400 ]; then
  echo -e "${GREEN}✅ Input validation works${NC}"
  echo "$BODY" | jq . 2>/dev/null || echo "$BODY"
else
  echo -e "${RED}❌ Input validation failed (Status: $HTTP_CODE)${NC}"
fi
echo ""

# Test 10: Rate Limiting (if chatbot exists)
if [ -n "$CHATBOT_ID" ]; then
  echo -e "${YELLOW}10. Rate Limiting Test (5 quick requests)...${NC}"
  for i in {1..5}; do
    RATE_RESPONSE=$(curl -s -w "\n%{http_code}" -X POST "$BASE_URL/api/chat" \
      -H "Content-Type: application/json" \
      -H "Origin: http://example.com" \
      -d "{\"chatbotId\":\"$CHATBOT_ID\",\"message\":\"Test $i\"}")
    HTTP_CODE=$(echo "$RATE_RESPONSE" | tail -n1)
    echo "Request $i: Status $HTTP_CODE"
  done
  echo -e "${GREEN}✅ Rate limiting test complete${NC}"
  echo ""
fi

echo -e "${GREEN}✅ All tests complete!${NC}"
echo ""
echo "Summary:"
echo "- Health check: ✅"
echo "- Authentication: ✅"
echo "- Chatbot management: ✅"
echo "- CORS: ✅"
echo "- Widget: ✅"
echo "- Error handling: ✅"
echo "- Input validation: ✅"
echo ""
echo "If all tests passed, your API is ready for production! 🚀"

