# Quick Render Deployment Steps

## 1. MongoDB Atlas Setup
1. Go to https://www.mongodb.com/cloud/atlas/register
2. Create free cluster → Choose AWS → Region: US-East
3. Security → Database Access → Add Database User (save password!)
4. Security → Network Access → Add IP: `0.0.0.0/0` (Allow from anywhere)
5. Get connection string: `mongodb+srv://<username>:<password>@cluster.mongodb.net/library-management`
6. **Replace** `<password>` with actual password and add `/library-management` as database name

📖 **Detailed guide**: See [`MONGODB_ATLAS_SETUP.md`](MONGODB_ATLAS_SETUP.md)

## 2. Deploy to Render

### Option A: Blueprint (Recommended - Fastest)
1. Go to https://render.com and sign in with GitHub
2. Dashboard → "New +" → "Blueprint"
3. Connect repository: `kiruthick0007/LIBRARY-BOOK-MANAGEMENT-BY-NODE.JS`
4. Render detects `render.yaml`
5. Add environment variables when prompted:
   - **Backend**: `MONGO_URI`, `JWT_SECRET`
   - **Frontend**: `VITE_API_URL` (add after backend deploys)
6. Click "Apply" → Both services deploy automatically

### Option B: Manual Setup

#### Backend Web Service
1. Dashboard → "New +" → "Web Service"
2. Repository: `kiruthick0007/LIBRARY-BOOK-MANAGEMENT-BY-NODE.JS`
3. Settings:
   - Name: `library-backend`
   - Root Directory: `backend`
   - Runtime: `Node`
   - Build: `npm install`
   - Start: `npm start`
4. Environment Variables:
   ```
   NODE_ENV=production
   PORT=5000
   MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/library-management
   JWT_SECRET=generate_random_32_char_string
   JWT_EXPIRE=7d
   ```
5. Create → Wait for deployment
6. **Copy backend URL**: e.g., `https://library-backend-xxxx.onrender.com`

#### Frontend Static Site
1. Dashboard → "New +" → "Static Site"
2. Same repository
3. Settings:
   - Name: `library-frontend`
   - Root Directory: `frontend`
   - Build: `npm install && npm run build`
   - Publish: `dist`
4. Environment Variables:
   ```
   VITE_API_URL=https://library-backend-xxxx.onrender.com/api
   ```
5. Create → Wait for deployment

## 3. Generate JWT Secret
Run in terminal:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## 4. Test Deployment
- Backend: `https://your-backend.onrender.com/` (should show welcome message)
- Frontend: `https://your-frontend.onrender.com/` (should load app)

## 5. Initial Database Seed (Optional)
1. In Render Dashboard → Backend service → "Shell"
2. Run: `npm run seed`

## Important Notes
- **First load takes 30-60 seconds** (free tier spins down)
- Free tier includes 750 hours/month
- Both services can run on free tier
- Update `VITE_API_URL` after backend deploys

## Troubleshooting
- **Backend Error**: Check Render logs, verify MongoDB connection
- **Frontend blank**: Check console, verify `VITE_API_URL`
- **CORS Error**: Backend already configured, check URL format
