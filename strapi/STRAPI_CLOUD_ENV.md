# Strapi Cloud Environment Variables

This document explains the environment variables needed for Strapi Cloud deployment.

## Required Environment Variables

Configure these in your Strapi Cloud dashboard (Settings → Environment Variables):

### Database Configuration (Supabase)

```bash
# Database client
DATABASE_CLIENT=postgres

# Supabase Database Connection
DATABASE_HOST=db.xxxxx.supabase.co
DATABASE_PORT=5432
DATABASE_NAME=postgres
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=your_database_password_here

# SSL Configuration (Required for Supabase)
DATABASE_SSL=true
DATABASE_SSL_REJECT_UNAUTHORIZED=true

# Connection Pool
DATABASE_POOL_MIN=0
DATABASE_POOL_MAX=10
```

### Strapi Application Keys

Generate secure random values for these using:
```bash
node ../generate-keys.js
```

```bash
# App Keys (comma-separated, 4 values)
APP_KEYS=key1,key2,key3,key4

# API Token Salt
API_TOKEN_SALT=your_secure_random_string

# Admin JWT Secret
ADMIN_JWT_SECRET=your_secure_random_string

# Transfer Token Salt
TRANSFER_TOKEN_SALT=your_secure_random_string

# JWT Secret
JWT_SECRET=your_secure_random_string
```

### Optional Environment Variables

```bash
# Host and Port (managed by Strapi Cloud)
HOST=0.0.0.0
PORT=1337

# Environment
NODE_ENV=production

# Connection Timeout
DATABASE_CONNECTION_TIMEOUT=60000
```

## How to Configure in Strapi Cloud

1. Go to your Strapi Cloud project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add each variable above with its corresponding value
4. Click **"Save"**
5. Strapi Cloud will automatically redeploy with the new environment variables

## Getting Supabase Credentials

1. Go to [Supabase Dashboard](https://app.supabase.com/)
2. Select your project
3. Go to **Settings** → **Database**
4. Copy:
   - **Host**: Found in Connection string
   - **Port**: Usually `5432`
   - **Database**: Usually `postgres`
   - **Username**: Usually `postgres`
   - **Password**: The database password you set when creating the project

## Security Notes

- **Never commit** `.env` files to Git
- Store sensitive values only in Strapi Cloud dashboard
- Use strong, randomly generated values for all secrets
- Rotate secrets periodically for security

