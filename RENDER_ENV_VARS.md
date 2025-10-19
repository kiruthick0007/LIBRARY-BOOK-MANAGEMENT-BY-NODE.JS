# Your Render Environment Variables

Use these exact values when deploying to Render:

## Backend Environment Variables

Add these in Render Dashboard → Backend Service → Environment:

| Variable Name | Value |
|--------------|-------|
| `NODE_ENV` | `production` |
| `PORT` | `5000` |
| `MONGODB_URI` | `mongodb+srv://library:admin%40123@cluster.mogckr0.mongodb.net/library-management?retryWrites=true&w=majority&appName=Cluster` |
| `JWT_SECRET` | `b0d54138498cddde45b72ff7c76b246565a0e004415c1ae3e8550c3c82a05a59` |
| `JWT_EXPIRE` | `7d` |

## Frontend Environment Variables

Add these in Render Dashboard → Frontend Static Site → Environment:

| Variable Name | Value |
|--------------|-------|
| `VITE_API_URL` | `https://your-backend-url.onrender.com/api` |

---

## Important Instructions

### 1. Replace Placeholders

**MONGODB_URI**: ✅ Already configured with your password (`admin@123` URL-encoded as `admin%40123`)
- Your connection string is ready to use!
- The `@` symbol is encoded as `%40` for URL safety

**JWT_SECRET**: ✅ Already generated for you
- Value: `b0d54138498cddde45b72ff7c76b246565a0e004415c1ae3e8550c3c82a05a59`
- This is cryptographically secure and ready to use

**VITE_API_URL**: After backend deploys, copy the backend URL and add `/api`
- Format: `https://library-backend-xxxx.onrender.com/api`

### 2. Copy-Paste Ready Format

**Your complete backend environment variables**:

```env
MONGODB_URI=mongodb+srv://library:admin%40123@cluster.mogckr0.mongodb.net/library-management?retryWrites=true&w=majority&appName=Cluster

JWT_SECRET=b0d54138498cddde45b72ff7c76b246565a0e004415c1ae3e8550c3c82a05a59

VITE_API_URL=https://library-backend-abc123.onrender.com/api
```

**⚠️ Update `VITE_API_URL`**: After backend deploys, replace with your actual backend URL

### 3. Deployment Order

1. **Deploy Backend first** (needs database connection)
2. **Copy backend URL** from Render
3. **Deploy Frontend** with `VITE_API_URL` set to backend URL

---

## Testing Connection

After backend deploys, check Render logs for:
```
MongoDB Connected: cluster.mogckr0.mongodb.net
Server running on port 5000
```

If you see this, your MongoDB connection is working! ✅
