# Strapi Local Development Setup

This directory contains your Strapi project configured for local development with Supabase PostgreSQL database.

## ✅ What's Configured

1. ✅ **PostgreSQL Support** - Database configuration for PostgreSQL/Supabase
2. ✅ **CORS Configuration** - Configured for Next.js frontend (localhost:3000 and Vercel)
3. ✅ **Security Headers** - Content Security Policy configured
4. ✅ **PostgreSQL Client** - `pg` package installed

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd strapi
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the `strapi/` directory:

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

**To generate secure keys:**
```bash
cd ..
node generate-keys.js
```

### 3. Start Strapi

```bash
cd strapi
npm run develop
```

Strapi will start at `http://localhost:1337`

### 4. Create Admin User

1. Open `http://localhost:1337/admin`
2. Complete the admin registration (first time only)
3. Start creating content types and content

## 👥 Working with a Team

### Shared Database Setup

Both developers connect to the **same Supabase database**:

1. **Share Supabase credentials** (securely via password manager or `.env.example`)
2. **Both developers use the same database connection** in their `.env` files
3. **Content syncs automatically** - content created by one developer appears for the other

### Content Types via GitHub

1. **Developer 1** creates content type → commits `strapi/src/api/property/` → pushes to GitHub
2. **Developer 2** pulls from GitHub → gets the same content types
3. Both developers now have the same content type schemas

### Workflow

```
Developer 1:
├── Creates content type locally
├── Commits to Git: git add strapi/src/api/property/
├── Pushes: git push origin main
└── Content saved to shared Supabase

Developer 2:
├── Pulls: git pull origin main
├── Gets content type schemas
├── Runs: npm run develop
└── Sees content from shared Supabase
```

## 📚 Documentation

- **Local Setup Guide**: See `../LOCAL_SETUP.md`
- **Supabase Connection**: See `SUPABASE_CONNECTED.md`
- **Main Tutorial**: See `../TUTORIAL.md`

## 🔧 Available Scripts

- `npm run develop` - Start Strapi in development mode
- `npm run build` - Build Strapi for production
- `npm run start` - Start Strapi in production mode
- `npm run strapi` - Run Strapi CLI commands

## 🚀 Production Deployment (Optional)

For production, you can deploy Strapi to:
- **Railway** - Recommended, easy setup
- **Render** - Good alternative
- **Vercel** - For serverless (requires configuration)

See deployment guides in the root directory for details.

---

**Ready to develop!** Run `npm run develop` to start building your content types.
