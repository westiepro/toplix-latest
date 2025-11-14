# Local-Only Strapi Setup Guide

This guide explains how to use Strapi locally for development, sharing the database with your team via Supabase.

## Architecture

```
Developer 1 (You):
├── Strapi local (localhost:1337) → Supabase PostgreSQL
└── Creates content types → Commits to GitHub

Developer 2 (Coworker):
├── Pulls from GitHub → Gets content type schemas
├── Strapi local (localhost:1337) → Same Supabase PostgreSQL
└── Creates content → Saved to shared Supabase

Both:
├── Content types synced via GitHub (schema files)
└── Content synced via shared Supabase database
```

## Step 1: Initial Setup

### 1.1 Install Dependencies

```bash
cd strapi
npm install
```

### 1.2 Get Supabase Credentials

1. Go to [Supabase Dashboard](https://app.supabase.com/)
2. Select your project
3. Go to **Settings** → **Database**
4. Copy connection details:
   - Host: `db.xxxxx.supabase.co`
   - Port: `5432`
   - Database: `postgres`
   - Username: `postgres`
   - Password: Your database password

### 1.3 Create Environment File

Create `strapi/.env`:

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

# Generate secure keys using: node ../generate-keys.js
APP_KEYS=key1,key2,key3,key4
API_TOKEN_SALT=your_secure_random_string
ADMIN_JWT_SECRET=your_secure_random_string
TRANSFER_TOKEN_SALT=your_secure_random_string
JWT_SECRET=your_secure_random_string
```

**Generate secure keys:**
```bash
cd ..
node generate-keys.js
```

Copy the generated keys into your `.env` file.

### 1.4 Start Strapi

```bash
cd strapi
npm run develop
```

Open `http://localhost:1337/admin` and create your admin user.

## Step 2: Team Setup

### 2.1 Share Supabase Credentials

**Option A: Use `.env.example` (Recommended)**

1. Create `strapi/.env.example` with placeholder values:
```bash
DATABASE_HOST=db.xxxxx.supabase.co
DATABASE_PASSWORD=your_password_here
# ... other variables
```

2. Share the actual credentials securely (password manager, encrypted message, etc.)
3. Each developer copies `.env.example` to `.env` and fills in real values

**Option B: Share via Password Manager**

Share the Supabase connection string via a secure password manager.

### 2.2 Each Developer Sets Up Locally

Each developer:
1. Clones the repository
2. Creates `strapi/.env` with shared Supabase credentials
3. Runs `npm install` in `strapi/` directory
4. Runs `npm run develop`

## Step 3: Working with Content Types

### Creating Content Types

1. **Developer 1** creates a content type:
   - Open `http://localhost:1337/admin`
   - Go to **Content-Type Builder**
   - Create new collection type (e.g., "Property")
   - Add fields and save
   - Schema files are created in `strapi/src/api/property/`

2. **Commit to Git:**
   ```bash
   git add strapi/src/api/property/
   git commit -m "Add Property content type"
   git push origin main
   ```

3. **Developer 2** gets the content type:
   ```bash
   git pull origin main
   npm run develop  # Restart Strapi to load new content types
   ```

### Editing Content Types

- Only edit content types in **development mode** (`npm run develop`)
- Always commit schema changes to Git
- Team members pull changes and restart Strapi

## Step 4: Working with Content

### Creating Content

Both developers can create content independently:

1. Open `http://localhost:1337/admin`
2. Go to **Content Manager** → **Property**
3. Create new entries
4. Content is saved to **shared Supabase database**

**Result**: Content created by one developer appears for the other immediately (same database).

### Content Sync

- ✅ **Automatic** - Both developers use the same Supabase database
- ✅ **Real-time** - Changes appear immediately
- ✅ **No conflicts** - Strapi handles concurrent access

## Step 5: Next.js Integration

### Local Development

Update `.env.local` in the root directory:

```bash
NEXT_PUBLIC_STRAPI_API_URL=http://localhost:1337
```

### Production (Vercel)

For production, you have two options:

**Option A: Deploy Strapi to Railway/Render** (Recommended)
- Deploy Strapi to Railway or Render
- Update Vercel env: `NEXT_PUBLIC_STRAPI_API_URL=https://your-strapi.railway.app`

**Option B: Use Local Tunnel** (Development only)
- Use ngrok or similar to expose localhost:1337
- Not recommended for production

## Troubleshooting

### Database Connection Issues

- Verify Supabase credentials are correct
- Check Supabase dashboard - is database running?
- Ensure SSL is enabled (`DATABASE_SSL=true`)
- Check firewall/network settings

### Content Types Not Syncing

- Make sure schema files are committed to Git
- Team members need to pull latest changes
- Restart Strapi after pulling changes (`npm run develop`)

### Content Not Appearing

- Verify both developers use the same Supabase database
- Check Supabase dashboard to see if content exists
- Ensure content is **published** (not just saved as draft)

### Port Already in Use

If port 1337 is already in use:
```bash
# Change port in strapi/.env
PORT=1338
```

Then update Next.js `.env.local`:
```bash
NEXT_PUBLIC_STRAPI_API_URL=http://localhost:1338
```

## Best Practices

1. **Always commit content type changes** - Schema files must be in Git
2. **Don't commit `.env` files** - Use `.env.example` instead
3. **Share Supabase credentials securely** - Use password manager
4. **Pull before creating content types** - Avoid merge conflicts
5. **Test locally before pushing** - Ensure content types work

## Next Steps

1. ✅ Set up local Strapi
2. ✅ Share Supabase credentials with team
3. ✅ Create first content type
4. ✅ Commit and push to GitHub
5. ✅ Team member pulls and tests
6. ✅ Start creating content!

---

**You're all set!** Both developers can now work locally with shared content via Supabase.

