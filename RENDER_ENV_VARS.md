# Your Render Environment Variables

Use these exact values when deploying to Render:

## Backend Environment Variables

Add these in Render Dashboard → Backend Service → Environment:

| Variable Name | Value |
|--------------|-------|
| `NODE_ENV` | `production` |
| `PORT` | `5000` |
| `MONGODB_URI` | `mongodb+srv://library:YOUR_PASSWORD@cluster.mogckr0.mongodb.net/library-management?retryWrites=true&w=majority&appName=Cluster` |
| `JWT_SECRET` | `your_random_32_character_secret` |
| `JWT_EXPIRE` | `7d` |

## Frontend Environment Variables

Add these in Render Dashboard → Frontend Static Site → Environment:

| Variable Name | Value |
|--------------|-------|
| `VITE_API_URL` | `https://your-backend-url.onrender.com/api` |

---

## Important Instructions

### 1. Replace Placeholders

**MONGODB_URI**: Replace `YOUR_PASSWORD` with your actual MongoDB user password
- ⚠️ If password has special characters (`@`, `#`, `%`, etc.), URL-encode them
- Example: `p@ssw0rd!` becomes `p%40ssw0rd%21`

**JWT_SECRET**: Generate a random secret:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**VITE_API_URL**: After backend deploys, copy the backend URL and add `/api`
- Format: `https://library-backend-xxxx.onrender.com/api`

### 2. Copy-Paste Ready Format

After replacing placeholders, your final values should look like:

```env
MONGODB_URI=mongodb+srv://library:MyActualP@ss123@cluster.mogckr0.mongodb.net/library-management?retryWrites=true&w=majority&appName=Cluster

JWT_SECRET=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6

VITE_API_URL=https://library-backend-abc123.onrender.com/api
```

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
