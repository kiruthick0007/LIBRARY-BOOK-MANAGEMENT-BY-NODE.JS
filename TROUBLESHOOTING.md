# Troubleshooting Guide

## Backend "Application exited early" Error

### ✅ Fixed Issues

1. **Server starts before database connection**
   - Solution: Made server startup wait for DB connection
   - Server now binds to `0.0.0.0` (required for Render)

2. **Deprecated Mongoose options**
   - Removed `useNewUrlParser` and `useUnifiedTopology`
   - These are now default in Mongoose 6+

3. **Node.js version**
   - Added `engines` field requiring Node >= 18

### Common Causes & Solutions

#### 1. Missing Environment Variables
**Check Render Dashboard → Environment**

Required variables:
```env
MONGODB_URI=mongodb+srv://library:admin%40123@cluster.mogckr0.mongodb.net/library-management?retryWrites=true&w=majority&appName=Cluster
JWT_SECRET=b0d54138498cddde45b72ff7c76b246565a0e004415c1ae3e8550c3c82a05a59
JWT_EXPIRE=7d
NODE_ENV=production
PORT=5000
```

#### 2. MongoDB Connection Failed
**Symptoms**: Error about MongoDB connection

**Solutions**:
- Verify MongoDB Atlas IP whitelist includes `0.0.0.0/0`
- Check username/password in connection string
- Ensure database user has read/write permissions
- Verify cluster is active (not paused)

#### 3. Port Binding Issues
**Symptoms**: "EADDRINUSE" or port errors

**Solution**: 
- Render automatically assigns PORT
- Server now listens on `0.0.0.0` not `localhost`

#### 4. Dependencies Installation Failed
**Symptoms**: "Cannot find module" errors

**Solutions**:
- Check `package.json` is valid JSON
- Clear build cache: Render Dashboard → Manual Deploy → Clear build cache
- Check Node version compatibility

#### 5. Import/Export Errors
**Symptoms**: "SyntaxError: Cannot use import statement"

**Solution**: Verify `"type": "module"` in `package.json` ✅

---

## Debugging Steps

### 1. Check Render Logs
```
Render Dashboard → Your Service → Logs
```

Look for:
- `MongoDB Connected: cluster.mogckr0.mongodb.net` ✅
- `Server running on port 5000` ✅
- Any error messages ❌

### 2. Verify Environment Variables
In Render Shell:
```bash
env | grep MONGODB
env | grep JWT
```

### 3. Test MongoDB Connection
In Render Shell:
```bash
node -e "console.log(process.env.MONGODB_URI)"
```

### 4. Check Package Installation
```bash
npm list mongoose express dotenv
```

---

## Testing Locally

### 1. Set Local Environment
Create `backend/.env`:
```env
MONGODB_URI=mongodb+srv://library:admin%40123@cluster.mogckr0.mongodb.net/library-management?retryWrites=true&w=majority&appName=Cluster
JWT_SECRET=b0d54138498cddde45b72ff7c76b246565a0e004415c1ae3e8550c3c82a05a59
JWT_EXPIRE=7d
NODE_ENV=development
PORT=5000
```

### 2. Run Locally
```bash
cd backend
npm install
npm start
```

Expected output:
```
MongoDB Connected: cluster.mogckr0.mongodb.net
Server running on port 5000
```

### 3. Test API
```bash
curl http://localhost:5000/
```

Should return:
```json
{"message":"Welcome to Library Management System API"}
```

---

## Render-Specific Issues

### Auto-Deploy Not Working
- Check GitHub connection in Render
- Verify branch is `main`
- Check for build errors in logs

### Service Keeps Restarting
- Check logs for crash loop errors
- Verify all environment variables set
- Check MongoDB connection is stable

### Timeout on First Request
- Normal on free tier (service sleeps after 15 min)
- First request takes 30-60 seconds to wake up
- Upgrade to paid tier to avoid sleep

---

## Quick Fixes

### Clear Everything and Redeploy
```bash
# On Render Dashboard
1. Manual Deploy → Clear build cache & deploy
2. Check environment variables are set
3. Wait for deployment to complete
```

### Reset MongoDB Connection
```bash
# In Render Shell
node -e "require('mongoose').connect(process.env.MONGODB_URI).then(() => console.log('OK')).catch(e => console.log(e))"
```

### Force Restart
```bash
# Render Dashboard
Settings → Suspend Service → Resume Service
```

---

## Getting Help

If issues persist:

1. **Check Render Logs** - Most errors shown here
2. **MongoDB Atlas Logs** - Check for connection attempts
3. **GitHub Actions** - If using CI/CD
4. **Render Status** - https://status.render.com

## Success Indicators

✅ Logs show: `MongoDB Connected`  
✅ Logs show: `Server running on port`  
✅ Health check returns JSON  
✅ No error messages in logs  
✅ Service status: "Live"
