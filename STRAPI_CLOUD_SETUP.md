# Strapi Cloud Setup Guide

This guide explains how to use Strapi Cloud instead of local installation. Strapi Cloud is Strapi's hosted solution that makes setup and deployment much easier.

## Benefits of Strapi Cloud

- ✅ No local installation required
- ✅ Automatic hosting and deployment
- ✅ Built-in SSL certificates
- ✅ Easy database connection
- ✅ Automatic backups
- ✅ No server management needed

## Step-by-Step Setup

### Step 1: Create Strapi Cloud Account

1. Go to [Strapi Cloud](https://cloud.strapi.io/)
2. Sign up or log in with your account
3. Complete the onboarding process

### Step 2: Install Strapi Locally (Required for Strapi Cloud)

**Important**: Strapi Cloud requires a Git repository with a Strapi project. We need to install Strapi locally first, then push it to Git.

1. Navigate to the `/strapi` directory:
   ```bash
   cd strapi
   ```

2. Install Strapi (this will create the Strapi project):
   ```bash
   npx create-strapi-app@latest . --quickstart --no-run
   ```
   
   When prompted:
   - Skip login (or log in if you want)
   - Answer "n" to A/B testing question
   - Wait for installation to complete

3. Install PostgreSQL client:
   ```bash
   npm install pg
   ```

4. Navigate back to root:
   ```bash
   cd ..
   ```

## Step 3: Configure Strapi for Supabase

Before connecting to Strapi Cloud, we need to configure Strapi to use Supabase database.

### 3.1 Update Database Configuration

Edit `strapi/config/database.ts`:

```typescript
export default ({ env }) => ({
  connection: {
    client: 'postgres',
    connection: {
      host: env('DATABASE_HOST'),
      port: env.int('DATABASE_PORT', 5432),
      database: env('DATABASE_NAME', 'postgres'),
      user: env('DATABASE_USERNAME', 'postgres'),
      password: env('DATABASE_PASSWORD'),
      ssl: env.bool('DATABASE_SSL', true),
    },
    pool: {
      min: 0,
      max: 5,
    },
  },
});
```

### 3.2 Create Environment File

Create `strapi/.env.example`:

```bash
# Strapi Configuration
HOST=0.0.0.0
PORT=1337

# Generate secure keys using: node ../generate-keys.js
APP_KEYS=toBeModified1,toBeModified2,toBeModified3,toBeModified4
API_TOKEN_SALT=toBeModified
ADMIN_JWT_SECRET=toBeModified
TRANSFER_TOKEN_SALT=toBeModified
JWT_SECRET=toBeModified

# Database Configuration (Supabase)
DATABASE_CLIENT=postgres
DATABASE_HOST=db.xxxxx.supabase.co
DATABASE_PORT=5432
DATABASE_NAME=postgres
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=your_database_password_here
DATABASE_SSL=true

# Environment
NODE_ENV=development
```

**Note**: In Strapi Cloud, you'll configure these environment variables in the dashboard, not in a local `.env` file.

### 3.3 Push Strapi to Git

1. Make sure your Git repository includes the `/strapi` directory
2. Commit and push:
   ```bash
   git add strapi/
   git commit -m "Add Strapi project for Strapi Cloud"
   git push origin main
   ```

## Step 4: Create Strapi Cloud Project

1. In Strapi Cloud Dashboard, click **"Create new project"**
2. Connect your Git repository
3. Fill in:
   - **Display name**: `toplix-properties` (or your preferred name)
   - **Git branch**: Select `main` (or your main branch)
   - **Region**: Choose closest to you
4. Click **"Continue"** or **"Create project"**

### Step 5: Connect Supabase Database in Strapi Cloud

1. In your Strapi Cloud project, go to **Settings** → **Database**
2. Select **"Use external database"**
3. Choose **PostgreSQL** as the database type
4. Enter your Supabase database credentials:
   - **Host**: `db.xxxxx.supabase.co` (from Supabase Settings → Database)
   - **Port**: `5432`
   - **Database**: `postgres`
   - **Username**: `postgres`
   - **Password**: Your Supabase database password
   - **SSL**: Enable SSL connection
5. Click **"Connect database"**

### Step 6: Get Your Strapi Cloud API URL

Once your project is created:

1. Go to your Strapi Cloud project dashboard
2. You'll see your **API URL** (e.g., `https://your-project.strapi.cloud`)
3. Copy this URL - you'll need it for your Next.js frontend

### Step 7: Configure Strapi Cloud Settings

1. Go to **Settings** → **API Tokens**
2. Create a new API token:
   - **Name**: `Next.js Frontend`
   - **Token duration**: Unlimited (or set expiration)
   - **Token type**: Read-only (for public content) or Full access (if needed)
3. Copy the generated token

### Step 8: Update Next.js Environment Variables

Update your `.env.local` file in the root directory:

```bash
NEXT_PUBLIC_STRAPI_API_URL=https://your-project.strapi.cloud
STRAPI_API_TOKEN=your_api_token_here
```

**Important**: Replace `your-project.strapi.cloud` with your actual Strapi Cloud URL.

### Step 9: Configure CORS in Strapi Cloud

1. In Strapi Cloud, go to **Settings** → **API** → **CORS**
2. Add your frontend URLs:
   - `http://localhost:3000` (for local development)
   - `https://your-vercel-url.vercel.app` (for production)
3. Click **"Save"**

### Step 10: Create Property Content Type

1. Access your Strapi Cloud admin panel at `https://your-project.strapi.cloud/admin`
2. Log in with your admin credentials
3. Go to **Content-Type Builder**
4. Create a new collection type: **Property**
5. Add the following fields:
   - **title** (Text - Short text, Required)
   - **description** (Text - Long text, Required)
   - **price** (Number - Decimal, Required)
   - **location** (Text - Short text, Required)
   - **bedrooms** (Number - Integer, Optional)
   - **bathrooms** (Number - Integer, Optional)
   - **area** (Number - Integer, Optional, Description: "Area in square feet")
   - **images** (Media - Multiple media, Optional)
   - **status** (Enumeration, Options: `For Sale`, `For Rent`, `Sold`, Required)
   - **slug** (UID, Attached to: `title`, Required)
6. Click **"Save"** and wait for Strapi to restart

### Step 11: Configure Permissions

1. Go to **Settings** → **Users & Permissions Plugin** → **Roles** → **Public**
2. Under **Property**, enable:
   - `find`
   - `findOne`
3. Click **"Save"**

### Step 12: Update Next.js Image Configuration

Update `next.config.ts` to allow images from Strapi Cloud:

```typescript
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.strapi.cloud',
        pathname: '/uploads/**',
      },
    ],
  },
};

export default nextConfig;
```

### Step 13: Test the Connection

1. Start your Next.js development server:
   ```bash
   npm run dev
   ```

2. Visit `http://localhost:3000`

3. Check browser console for any API errors

4. Create a test property in Strapi Cloud admin panel

5. Verify it appears on your Next.js frontend

## Deployment to Vercel

When deploying to Vercel:

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add:
   - `NEXT_PUBLIC_STRAPI_API_URL`: `https://your-project.strapi.cloud`
   - `STRAPI_API_TOKEN`: Your API token (if needed)
3. Redeploy your application

## Troubleshooting

### Properties Not Showing

- Verify `NEXT_PUBLIC_STRAPI_API_URL` is correct in `.env.local`
- Check Strapi Cloud admin panel - are properties published?
- Verify Public role permissions are enabled
- Check browser console for CORS errors

### CORS Errors

- Add your frontend URL to Strapi Cloud CORS settings
- Ensure both localhost and production URLs are added
- Clear browser cache and reload

### Images Not Loading

- Verify `next.config.ts` has correct hostname pattern
- Check image URLs in browser DevTools
- Ensure images are uploaded in Strapi Cloud admin panel

### Database Connection Issues

- Verify Supabase database credentials are correct
- Check Supabase dashboard - is database running?
- Ensure SSL is enabled for connection
- Check Strapi Cloud logs for connection errors

## Strapi Cloud Pricing

Strapi Cloud offers a free tier for development. For production, check [Strapi Cloud Pricing](https://strapi.io/pricing-cloud) for current plans.

## Next Steps

1. ✅ Create your first property in Strapi Cloud
2. ✅ Deploy Next.js frontend to Vercel
3. ✅ Update Vercel environment variables
4. ✅ Test the full workflow end-to-end

## Useful Links

- [Strapi Cloud Documentation](https://docs.strapi.io/dev-docs/deployment/strapi-cloud)
- [Strapi Cloud Dashboard](https://cloud.strapi.io/)
- [Strapi API Documentation](https://docs.strapi.io/dev-docs/api/rest)

---

**Important**: Strapi Cloud requires your Strapi project to be in a Git repository. You'll need to:
1. Install Strapi locally in the `/strapi` directory
2. Configure it for Supabase database
3. Push it to your Git repository
4. Then connect Strapi Cloud to your Git repository

Once connected, Strapi Cloud will deploy and host your Strapi project automatically.

