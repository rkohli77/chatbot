# Pre-Deployment Checklist

## ✅ Before Deploying to Production

### 1. Environment Setup
- [ ] All environment variables are set in production
- [ ] `NODE_ENV=production` is set
- [ ] `.env` file is NOT committed to git (check `.gitignore`)
- [ ] Strong `JWT_SECRET` is generated (use: `openssl rand -base64 32`)
- [ ] `OPENAI_API_KEY` is valid and has usage limits set
- [ ] `SUPABASE_URL` and `SUPABASE_KEY` are correct

### 2. Code Review
- [ ] No hardcoded secrets or API keys
- [ ] No console.log statements with sensitive data
- [ ] Error messages are generic (no internal details)
- [ ] All TODO/FIXME comments addressed
- [ ] Code is clean and well-commented

### 3. Testing
- [ ] Run `./test-api.sh` - all tests pass
- [ ] Test user registration and login
- [ ] Test chatbot creation
- [ ] Test chat endpoint with valid chatbot
- [ ] Test widget on a test HTML page
- [ ] Test rate limiting (make 21+ requests)
- [ ] Test input validation (invalid emails, short passwords)
- [ ] Test CORS from different origins
- [ ] Test error handling (404, 500, etc.)

### 4. Security
- [ ] Helmet.js security headers enabled
- [ ] Rate limiting configured
- [ ] Input validation on all endpoints
- [ ] Input sanitization working
- [ ] CORS properly configured
- [ ] JWT tokens expire (7 days is set)
- [ ] Passwords hashed with bcrypt (10 rounds)
- [ ] Request size limits set (1MB)

### 5. Performance
- [ ] Response times are acceptable (< 5s for chat)
- [ ] Rate limiting prevents abuse
- [ ] No memory leaks detected
- [ ] Server handles concurrent requests

### 6. Dependencies
- [ ] All dependencies installed: `npm install`
- [ ] No security vulnerabilities: `npm audit`
- [ ] Dependencies are up to date
- [ ] `package-lock.json` is committed

### 7. Database
- [ ] Supabase connection works
- [ ] Database tables exist and are properly configured
- [ ] Indexes are set up (if needed)
- [ ] Backup strategy in place

### 8. Monitoring & Logging
- [ ] Error logging is working
- [ ] Request logging is enabled
- [ ] Monitoring/alerting set up (optional but recommended)
- [ ] Logs don't contain sensitive information

### 9. Deployment
- [ ] Server starts successfully: `npm start`
- [ ] Health endpoint responds: `/health`
- [ ] HTTPS is enabled (if using custom domain)
- [ ] Domain/DNS configured (if applicable)
- [ ] SSL certificate valid (if using HTTPS)

### 10. Widget Testing
- [ ] Widget.js loads from production URL
- [ ] Widget works on test website
- [ ] CORS allows widget from any origin
- [ ] Chat responses work correctly
- [ ] No console errors in browser

### 11. Documentation
- [ ] API documentation is up to date
- [ ] Installation guide is clear
- [ ] Environment variables documented
- [ ] Deployment steps documented

### 12. Rollback Plan
- [ ] Know how to rollback if issues occur
- [ ] Previous version is accessible
- [ ] Database migrations are reversible (if any)

---

## 🚨 Critical Checks

### Must Have Before Production:
1. ✅ Strong JWT_SECRET (not default/weak)
2. ✅ Environment variables set correctly
3. ✅ No secrets in code
4. ✅ Error messages don't leak information
5. ✅ Rate limiting enabled
6. ✅ Input validation working
7. ✅ CORS configured correctly
8. ✅ All tests pass

---

## 📝 Quick Test Commands

```bash
# 1. Run automated tests
cd backend
./test-api.sh

# 2. Check for security vulnerabilities
npm audit

# 3. Test server startup
npm start

# 4. Test health endpoint
curl http://localhost:3001/health

# 5. Test widget
# Open test_widget.html in browser with production URL
```

---

## 🎯 Production Deployment Steps

1. **Set Environment Variables** in your hosting platform (Render, Heroku, etc.)
2. **Deploy Code** (git push, or upload)
3. **Verify Deployment** - Check logs for errors
4. **Test Production URL** - Run health check
5. **Test Widget** - Embed on test website
6. **Monitor** - Watch for errors in first 24 hours

---

## ⚠️ Common Issues to Watch For

1. **CORS Errors**: Check CORS configuration matches your frontend URL
2. **Database Connection**: Verify Supabase credentials
3. **OpenAI API**: Check API key and rate limits
4. **Rate Limiting**: Too strict? Adjust limits if needed
5. **Memory Issues**: Monitor server memory usage
6. **Slow Responses**: Check OpenAI API response times

---

## ✅ Ready to Deploy?

If all items above are checked, you're ready! 🚀

Good luck with your deployment!

