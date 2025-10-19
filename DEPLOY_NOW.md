# Quick Deploy Checklist

## ✅ Ready to Deploy

### Backend Environment Variables (Copy these to Render):

```
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://library:admin%40123@cluster.mogckr0.mongodb.net/library-management?retryWrites=true&w=majority&appName=Cluster
JWT_SECRET=b0d54138498cddde45b72ff7c76b246565a0e004415c1ae3e8550c3c82a05a59
JWT_EXPIRE=7d
```

### Frontend Environment Variable (Add after backend deploys):

```
VITE_API_URL=https://YOUR-BACKEND-URL.onrender.com/api
```

---

## Deployment Steps

### 1. Deploy Backend
1. Go to https://render.com
2. Click **"New +"** → **"Web Service"**
3. Connect repository: `kiruthick0007/LIBRARY-BOOK-MANAGEMENT-BY-NODE.JS`
4. Configure:
   - Name: `library-backend`
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `npm start`
5. Add **Environment Variables** (copy from above)
6. Click **"Create Web Service"**
7. **Wait for deployment** (3-5 minutes)
8. **Copy the backend URL** (e.g., `https://library-backend-xyz.onrender.com`)

### 2. Deploy Frontend
1. Click **"New +"** → **"Static Site"**
2. Same repository
3. Configure:
   - Name: `library-frontend`
   - Root Directory: `frontend`
   - Build Command: `npm install && npm run build`
   - Publish Directory: `dist`
4. Add Environment Variable:
   - `VITE_API_URL` = `https://library-backend-xyz.onrender.com/api` (use your actual backend URL)
5. Click **"Create Static Site"**
6. **Wait for deployment** (2-3 minutes)

### 3. Test & Seed Database
1. Visit your frontend URL
2. Backend Shell → Run: `npm run seed` (optional)

## Done! 🎉

Your Library Management System is live on Render.
