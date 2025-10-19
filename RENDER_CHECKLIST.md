# Render Deployment Checklist

## ✅ Environment Variables (CRITICAL)

Verify ALL 5 variables are set in Render Dashboard:

```
MONGODB_URI=mongodb+srv://library:admin%40123@cluster.mogckr0.mongodb.net/library-management?retryWrites=true&w=majority&appName=Cluster
JWT_SECRET=b0d54138498cddde45b72ff7c76b246565a0e004415c1ae3e8550c3c82a05a59
JWT_EXPIRE=7d
NODE_ENV=production
PORT=5000
```

## ✅ Backend Configuration

- Root Directory: `backend`
- Build Command: `npm install`
- Start Command: `npm start`
- Node Version: >= 18

## ✅ MongoDB Atlas

- IP Whitelist: `0.0.0.0/0`
- Database: `library-management`
- User: `library` / Password: `admin@123`

## Common Issues

### "Application exited early"
- Missing environment variables (most common)
- MongoDB connection failed
- Check Render logs for exact error

### How to Fix
1. Render Dashboard → Your Service
2. Environment → Verify all 5 variables set
3. Manual Deploy → Clear build cache & deploy
4. Check logs for "MongoDB Connected" message
