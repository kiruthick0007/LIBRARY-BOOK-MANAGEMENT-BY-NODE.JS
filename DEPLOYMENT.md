# Render Deployment Guide - Library Management System

## Prerequisites
- GitHub repository connected to Render
- MongoDB Atlas account (for database)

## Deployment Steps

### 1. Set Up MongoDB Atlas
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster (M0 tier)
3. Create a database user with read/write access
4. Whitelist IP address: `0.0.0.0/0` (required for Render)
5. Get your connection string:
   - Format: `mongodb+srv://username:password@cluster.mongodb.net/library-management`
   - Replace `<password>` with actual password
   - Add database name: `/library-management`

📖 **Detailed MongoDB Atlas guide**: See [`MONGODB_ATLAS_SETUP.md`](MONGODB_ATLAS_SETUP.md)

### 2. Deploy Backend (Web Service)

**On Render Dashboard:**
1. Click "New +" → "Web Service"
2. Connect your GitHub repository
3. Configure:
   - **Name**: `library-backend`
   - **Region**: Oregon (US West)
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: Free

4. **Environment Variables** (Add these):
   ```
   NODE_ENV=production
   PORT=5000
   MONGODB_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=your_random_secret_key_here
   JWT_EXPIRE=7d
   ```

5. Click "Create Web Service"
6. **Save the backend URL** (e.g., `https://library-backend.onrender.com`)

### 3. Deploy Frontend (Static Site)

**On Render Dashboard:**
1. Click "New +" → "Static Site"
2. Connect the same GitHub repository
3. Configure:
   - **Name**: `library-frontend`
   - **Branch**: `main`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`

4. **Environment Variables**:
   ```
   VITE_API_URL=https://your-backend-url.onrender.com
   ```

5. Click "Create Static Site"

### 4. Update Frontend API Configuration
Your frontend will use the environment variable to connect to the backend.

## Important Notes

- **Free Tier Limitations**: Services spin down after 15 minutes of inactivity
- **First Request**: May take 30-60 seconds to wake up
- **Database**: Use MongoDB Atlas free tier
- **CORS**: Already configured in backend

## Environment Variables Reference

### Backend (.env)
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/library-management
JWT_SECRET=your_super_secret_jwt_key_change_this
JWT_EXPIRE=7d
```

### Frontend
```env
VITE_API_URL=https://your-backend-url.onrender.com
```

## URLs After Deployment
- **Backend API**: `https://library-backend.onrender.com`
- **Frontend**: `https://library-frontend.onrender.com`
- **API Health Check**: `https://library-backend.onrender.com/`

## Troubleshooting

### Backend won't start
- Check environment variables are set
- Verify MongoDB connection string
- Check Render logs for errors

### Frontend can't connect to backend
- Verify `VITE_API_URL` is set correctly
- Check CORS settings
- Ensure backend is running

### Database connection failed
- Check MongoDB Atlas IP whitelist (use 0.0.0.0/0 for Render)
- Verify connection string format
- Check database user credentials

## Post-Deployment

1. **Seed Database** (Optional):
   - SSH into backend service on Render
   - Run: `npm run seed`

2. **Monitor**:
   - Check Render dashboard for logs
   - Monitor application metrics

## Cost
- **Free Tier**: Both services can run on free tier
- **Paid Options**: Upgrade for better performance and no spin-down
