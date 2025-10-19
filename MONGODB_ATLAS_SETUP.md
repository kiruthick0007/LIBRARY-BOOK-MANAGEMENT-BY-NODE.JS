## Your MongoDB Atlas Connection String

**Raw connection string from Atlas**:
```
mongodb+srv://library:<db_password>@cluster.mogckr0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster
```

**Formatted for your app** (replace `<db_password>` with your actual password):
```
mongodb+srv://library:YOUR_ACTUAL_PASSWORD@cluster.mogckr0.mongodb.net/library-management?retryWrites=true&w=majority&appName=Cluster
```

**Key changes made**:
1. Replace `<db_password>` with your actual database user password
2. Added `/library-management` as the database name (before the `?`)

---

# MongoDB Atlas Setup Guide

Since your project uses local MongoDB, you need to migrate to MongoDB Atlas for cloud deployment.

## 1. Create MongoDB Atlas Account

1. Go to https://www.mongodb.com/cloud/atlas/register
2. Sign up (free tier available)
3. Create organization and project

## 2. Create Free Cluster

1. Click **"Build a Database"**
2. Choose **"M0 FREE"** tier
3. Select:
   - **Provider**: AWS
   - **Region**: us-east-1 (or closest to Render's Oregon region)
4. Cluster Name: `library-cluster` (or any name)
5. Click **"Create"**

## 3. Create Database User

1. Security → **Database Access**
2. Click **"Add New Database User"**
3. Authentication Method: **Password**
4. Username: `libraryuser` (or your choice)
5. Password: Generate secure password (save it!)
6. Database User Privileges: **Read and write to any database**
7. Click **"Add User"**

## 4. Configure Network Access

1. Security → **Network Access**
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"**
4. IP Address: `0.0.0.0/0` (required for Render)
5. Click **"Confirm"**

⚠️ **Important**: `0.0.0.0/0` is needed because Render uses dynamic IPs

## 5. Get Connection String

1. Click **"Database"** in left sidebar
2. Click **"Connect"** on your cluster
3. Choose **"Connect your application"**
4. Driver: **Node.js**, Version: **5.5 or later**
5. Copy connection string:
   ```
   mongodb+srv://libraryuser:<password>@library-cluster.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

## 6. Format Connection String

Replace `<password>` and add database name:

**Format**:
```
mongodb+srv://libraryuser:YOUR_PASSWORD@library-cluster.xxxxx.mongodb.net/library-management?retryWrites=true&w=majority
```

**Important**:
- Replace `YOUR_PASSWORD` with the actual password
- Add `/library-management` before the `?` (database name)
- Keep special characters URL-encoded if needed

## 7. Test Connection Locally (Optional)

Update your local `backend/.env`:
```env
MONGODB_URI=mongodb+srv://libraryuser:password@cluster.xxxxx.mongodb.net/library-management?retryWrites=true&w=majority
```

Run backend:
```bash
cd backend
npm start
```

Should see: `MongoDB Connected: library-cluster-shard-00-00.xxxxx.mongodb.net`

## 8. Migrate Data (Optional)

If you have existing data in local MongoDB:

### Export from Local MongoDB:
```bash
mongodump --db library-management --out ./backup
```

### Import to Atlas:
```bash
mongorestore --uri "mongodb+srv://user:pass@cluster.xxxxx.mongodb.net/library-management" ./backup/library-management
```

Or use MongoDB Compass for GUI-based migration.

## 9. Use in Render Deployment

When deploying to Render, add this environment variable:

**Variable Name**: `MONGODB_URI`  
**Value**: `mongodb+srv://libraryuser:password@cluster.xxxxx.mongodb.net/library-management?retryWrites=true&w=majority`

## Connection String Breakdown

```
mongodb+srv://  → Protocol (Atlas uses SRV for auto-discovery)
libraryuser     → Database username
password        → Database user password
@cluster.xxxxx.mongodb.net  → Your cluster hostname
/library-management  → Database name
?retryWrites=true&w=majority  → Connection options
```

## Troubleshooting

### "Authentication failed"
- Check username/password are correct
- Ensure user has read/write permissions

### "Connection timeout"
- Verify IP `0.0.0.0/0` is whitelisted
- Check cluster is active (not paused)

### "Database not found"
- MongoDB creates database automatically on first write
- Run seed script after connection: `npm run seed`

## Free Tier Limits

- **Storage**: 512 MB
- **RAM**: Shared
- **Connections**: 500 concurrent
- **Good for**: Development, small production apps

Perfect for your library management system!
