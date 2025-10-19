# All Deployment Commands - Complete Reference

## 🔧 Backend Deployment (Render)

### Service Configuration
- **Type**: Web Service
- **Root Directory**: `backend`
- **Build Command**: `npm install`
- **Start Command**: `npm start`

### Environment Variables (5 required)
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://library:admin%40123@cluster.mogckr0.mongodb.net/library-management?retryWrites=true&w=majority&appName=Cluster
JWT_SECRET=b0d54138498cddde45b72ff7c76b246565a0e004415c1ae3e8550c3c82a05a59
JWT_EXPIRE=7d
```

---

## 🎨 Frontend Deployment (Render)

### Service Configuration
- **Type**: Static Site
- **Root Directory**: `frontend`
- **Build Command**: `npm install && npm run build`
- **Publish Directory**: `dist`

### Environment Variables (1 required)
```env
VITE_API_URL=https://YOUR-BACKEND-URL.onrender.com/api
```

---

## 📦 Local Testing Commands

### Test Backend Locally
```bash
cd backend
npm install
npm start
# Should run on http://localhost:5000
```

### Test Frontend Locally
```bash
cd frontend
npm install
npm run dev
# Should run on http://localhost:3000
```

### Build Frontend Locally
```bash
cd frontend
npm run build
# Output to frontend/dist
```

---

## 🗄️ Database Commands

### MongoDB Atlas
- Already configured with connection string
- Database: `library-management`
- User: `library`
- Password: `admin@123` (URL-encoded: `admin%40123`)

### Seed Database (in Render Shell)
```bash
npm run seed
```

### Check MongoDB Connection
```bash
node -e "require('dotenv').config(); const mongoose = require('mongoose'); mongoose.connect(process.env.MONGODB_URI).then(() => console.log('Connected!')).catch(err => console.log(err));"
```

---

## 🚀 Git Commands

### Initial Setup (Already Done)
```bash
git init
git remote add origin https://github.com/kiruthick0007/LIBRARY-BOOK-MANAGEMENT-BY-NODE.JS.git
git add .
git commit -m "Initial commit"
git push -u origin main
```

### Update Deployment
```bash
git add .
git commit -m "Update message"
git push
# Render auto-deploys on push
```

---

## 🔍 Troubleshooting Commands

### Check Node/NPM Versions
```bash
node --version  # Should be v18+
npm --version
```

### Clear NPM Cache
```bash
npm cache clean --force
```

### Reinstall Dependencies
```bash
rm -rf node_modules package-lock.json
npm install
```

### View Environment Variables (Render Shell)
```bash
env | grep MONGODB
env | grep JWT
```

### Test API Endpoints
```bash
# Health check
curl https://your-backend-url.onrender.com/

# Test auth endpoint
curl https://your-backend-url.onrender.com/api/auth/login
```

---

## 📝 Deployment Checklist

### ✅ Pre-Deployment
- [x] Git repository connected
- [x] MongoDB Atlas configured
- [x] Environment variables ready
- [x] Code pushed to GitHub

### ✅ Backend Deployment
- [ ] Create Web Service on Render
- [ ] Set root directory: `backend`
- [ ] Build: `npm install`
- [ ] Start: `npm start`
- [ ] Add 5 environment variables
- [ ] Deploy and wait for success
- [ ] Copy backend URL

### ✅ Frontend Deployment
- [ ] Create Static Site on Render
- [ ] Set root directory: `frontend`
- [ ] Build: `npm install && npm run build`
- [ ] Publish: `dist`
- [ ] Add VITE_API_URL with backend URL
- [ ] Deploy and wait for success

### ✅ Post-Deployment
- [ ] Test backend URL
- [ ] Test frontend URL
- [ ] Seed database (optional)
- [ ] Create admin account
- [ ] Test login/registration

---

## 🌐 Expected URLs

### Backend
```
https://library-backend-XXXX.onrender.com
```

### Frontend
```
https://library-frontend-XXXX.onrender.com
```

### API Endpoints
```
POST /api/auth/register
POST /api/auth/login
GET  /api/books
POST /api/books (admin)
GET  /api/borrowings
POST /api/borrowings
```

---

## ⚠️ Important Notes

1. **Free Tier**: Services sleep after 15 min inactivity
2. **First Request**: May take 30-60 seconds to wake up
3. **Auto-Deploy**: Enabled on git push to main branch
4. **Logs**: Available in Render Dashboard
5. **Database**: MongoDB Atlas free tier (512MB)

---

## 🔗 Quick Links

- Render Dashboard: https://dashboard.render.com
- MongoDB Atlas: https://cloud.mongodb.com
- GitHub Repo: https://github.com/kiruthick0007/LIBRARY-BOOK-MANAGEMENT-BY-NODE.JS
