# Backend Deployment Commands - Render

## Render Configuration

### Build Command
```bash
npm install
```

### Start Command
```bash
npm start
```

### Root Directory
```
backend
```

---

## Alternative Build Commands (if needed)

### Standard Build
```bash
npm install
```

### With Clean Install
```bash
npm ci
```

### With Production Dependencies Only
```bash
npm install --production
```

### With Cache Clear
```bash
npm cache clean --force && npm install
```

---

## Environment Variables (Required)

```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://library:admin%40123@cluster.mogckr0.mongodb.net/library-management?retryWrites=true&w=majority&appName=Cluster
JWT_SECRET=b0d54138498cddde45b72ff7c76b246565a0e004415c1ae3e8550c3c82a05a59
JWT_EXPIRE=7d
```

---

## Post-Deployment Commands (Render Shell)

### Seed Database
```bash
npm run seed
```

### Check Node Version
```bash
node --version
```

### Check NPM Version
```bash
npm --version
```

### List Environment Variables
```bash
env
```

### View Package Info
```bash
npm list
```

### Check MongoDB Connection
```bash
node -e "console.log(process.env.MONGODB_URI)"
```

---

## Troubleshooting Commands

### Check Logs (on Render)
- Go to Render Dashboard → Your Service → Logs

### Restart Service
- Render Dashboard → Manual Deploy → "Clear build cache & deploy"

### Test Locally Before Deploy
```bash
cd backend
npm install
npm start
```

---

## Complete Render Setup (Copy-Paste Ready)

**Service Type**: Web Service

**Repository**: `kiruthick0007/LIBRARY-BOOK-MANAGEMENT-BY-NODE.JS`

**Configuration**:
- Name: `library-backend`
- Region: `Oregon (US West)`
- Branch: `main`
- Root Directory: `backend`
- Runtime: `Node`
- Build Command: `npm install`
- Start Command: `npm start`
- Instance Type: `Free`

**Environment Variables**: (Copy all 5 variables from above)

---

## Expected Output After Deployment

```
MongoDB Connected: cluster.mogckr0.mongodb.net
Server running on port 5000
```

## Health Check

**Test Backend URL**:
```
https://your-backend-url.onrender.com/
```

Should return:
```json
{
  "message": "Welcome to Library Management System API"
}
```
