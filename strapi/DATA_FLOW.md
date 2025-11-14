# Data Flow Architecture: Strapi → Supabase → Next.js → Vercel

This document explains how data flows through your entire application stack.

## Architecture Overview

```
┌─────────────────┐
│  Local Strapi   │
│ (Development)   │────────────┐
│ localhost:1337  │            │
└─────────────────┘            │
                                ▼
                         ┌──────────────┐
                         │   Supabase   │
                         │  PostgreSQL  │◄─── All data stored here
                         │   Database   │
                         ┌──────────────┐
                                ▲
                                │
┌─────────────────┐             │
│  Strapi Cloud   │─────────────┘
│ (Production)    │
│ *.strapi.cloud  │
└─────────────────┘
         │
         │ API
         ▼
┌─────────────────┐
│   Next.js App   │
│  (Frontend)     │
│ localhost:3000  │
└─────────────────┘
         │
         │ Deployed
         ▼
┌─────────────────┐
│     Vercel      │
│ (Production)    │
│ *.vercel.app    │
└─────────────────┘
```

## Complete Data Flow

### 1. **Content Creation Flow**

**Local Development:**
```
You → Strapi Admin (localhost:1337) → Supabase PostgreSQL → Database
```

**Production:**
```
You → Strapi Cloud Admin → Supabase PostgreSQL → Database
```

### 2. **Content Retrieval Flow**

**Local Development:**
```
Next.js (localhost:3000) → Strapi API (localhost:1337) → Supabase PostgreSQL → Next.js → Browser
```

**Production:**
```
Next.js (Vercel) → Strapi Cloud API → Supabase PostgreSQL → Next.js → Browser
```

### 3. **Schema/Content Type Flow**

```
Local Strapi → Create Content Types → Save to Git → Push to GitHub → Strapi Cloud Deploys → Same Schema
```

## Single Source of Truth: Supabase

**Important**: All data is stored in **ONE Supabase PostgreSQL database**:

- ✅ **Local Strapi** connects to Supabase
- ✅ **Strapi Cloud** connects to the same Supabase
- ✅ **Next.js** reads from Strapi API (which reads from Supabase)

This means:
- Content created locally appears in Strapi Cloud (same database)
- Content created in Strapi Cloud appears locally (same database)
- No data synchronization needed - everything is in one place!

## Environment Setup

### Local Strapi Configuration

To use Supabase locally, configure `.env` in `/strapi/.env`:

```bash
# Database Configuration (Supabase)
DATABASE_CLIENT=postgres
DATABASE_HOST=db.xxxxx.supabase.co
DATABASE_PORT=5432
DATABASE_NAME=postgres
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=your_supabase_password
DATABASE_SSL=true
DATABASE_SSL_REJECT_UNAUTHORIZED=true

# Strapi Configuration
HOST=0.0.0.0
PORT=1337
NODE_ENV=development
```

### Strapi Cloud Configuration

Configure in Strapi Cloud dashboard (Settings → Environment Variables) - same variables as above.

## Data Flow Steps

### Step 1: Configure Supabase Connection

1. **Get Supabase Credentials:**
   - Go to [Supabase Dashboard](https://app.supabase.com/)
   - Select your project
   - Go to **Settings** → **Database**
   - Copy connection details:
     - Host: `db.xxxxx.supabase.co`
     - Port: `5432`
     - Database: `postgres`
     - Username: `postgres`
     - Password: (your database password)

2. **Configure Local Strapi:**
   - Create/update `strapi/.env` with Supabase credentials
   - Restart Strapi: `npm run develop`

3. **Configure Strapi Cloud:**
   - Go to Strapi Cloud dashboard
   - **Settings** → **Environment Variables**
   - Add same Supabase credentials

### Step 2: Create Content Types

1. **In Local Strapi** (`localhost:1337/admin`):
   - Create Property content type
   - Add fields (title, description, price, etc.)
   - Click "Save"

2. **Commit to Git:**
   ```bash
   git add strapi/src/api/property/
   git commit -m "Add Property content type"
   git push origin main
   ```

3. **Strapi Cloud Auto-Deploys:**
   - Strapi Cloud detects Git push
   - Deploys new content type
   - Both local and cloud now have Property content type

### Step 3: Create Content

**Option A: Create Locally**
```
You → Strapi Admin (localhost:1337) → Creates Property → Saves to Supabase
```

**Option B: Create in Strapi Cloud**
```
You → Strapi Cloud Admin → Creates Property → Saves to Supabase (same database)
```

**Result**: Content appears in **both** local Strapi and Strapi Cloud because they use the same database!

### Step 4: Frontend Retrieves Data

**Local Development:**
```
Next.js → http://localhost:1337/api/properties → Strapi → Supabase → Returns Properties → Next.js displays
```

**Production:**
```
Next.js (Vercel) → https://your-project.strapi.cloud/api/properties → Strapi Cloud → Supabase → Returns Properties → Next.js displays
```

## Key Benefits of This Architecture

1. **Single Database**: All data in one Supabase database
2. **No Sync Needed**: Local and Cloud use same database automatically
3. **Easy Development**: Test locally with real production data (optional) or separate data
4. **Consistent Schema**: Content types managed via Git, deployed to both environments
5. **Scalable**: Supabase handles database scaling

## Database Connection Status

To verify your connection:

**Check Local Strapi:**
- Look for database connection messages when starting
- Check Strapi admin panel - if content types load, connection works

**Check Strapi Cloud:**
- Go to Strapi Cloud dashboard
- Check deployment logs for database connection
- If admin panel works, connection is successful

## Next Steps

1. ✅ Update `strapi/.env` with Supabase credentials
2. ✅ Restart local Strapi to connect to Supabase
3. ✅ Configure Strapi Cloud with same Supabase credentials
4. ✅ Create content types
5. ✅ Create content
6. ✅ Verify data appears in Supabase dashboard

---

**All data flows through Supabase PostgreSQL - your single source of truth!**

