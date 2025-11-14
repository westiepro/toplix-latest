# Strapi Deployment Guide

This guide covers the best options for deploying Strapi for production.

## Quick Answer

**Recommended: Railway** (easiest) or **Render** (good free tier)

**Not recommended: Vercel** (Strapi doesn't work well serverless)

---

## Deployment Options Comparison

| Platform | Ease | Free Tier | Cost | Best For |
|---------|------|-----------|------|----------|
| **Railway** | ⭐⭐⭐⭐⭐ | $5/month credit | ~$5-10/month | Easiest setup |
| **Render** | ⭐⭐⭐⭐ | Yes (with limits) | Free-$7/month | Free tier users |
| **Fly.io** | ⭐⭐⭐ | Generous free tier | Free-$5/month | Global edge |
| **DigitalOcean** | ⭐⭐⭐ | No | $6-12/month | More control |
| **AWS/GCP** | ⭐⭐ | No | Varies | Enterprise |
| **Vercel** | ❌ | N/A | N/A | **Not suitable** |

---

## Option 1: Railway (Recommended) ⭐

**Best for:** Easiest setup, great developer experience

### Why Railway?

- ✅ **Easiest deployment** - Connect GitHub, auto-deploys
- ✅ **Great free tier** - $5/month credit (usually enough for small projects)
- ✅ **Automatic HTTPS** - SSL certificates included
- ✅ **Environment variables** - Easy to configure
- ✅ **Auto-scaling** - Handles traffic spikes
- ✅ **Great logs** - Easy debugging

### Step-by-Step Deployment

#### 1. Create Railway Account

1. Go to [Railway.app](https://railway.app/)
2. Sign up with GitHub
3. Click **"New Project"**

#### 2. Deploy from GitHub

1. Click **"Deploy from GitHub repo"**
2. Select your repository (`toplix-new`)
3. Railway will detect it's a Node.js project

#### 3. Configure Service

1. Click on the service
2. Go to **Settings** → **Root Directory**
3. Set to: `/strapi`
4. Click **"Save"**

#### 4. Set Build Command

1. Go to **Settings** → **Build Command**
2. Set to: `npm install && npm run build`
3. Click **"Save"**

#### 5. Set Start Command

1. Go to **Settings** → **Start Command**
2. Set to: `npm start`
3. Click **"Save"**

#### 6. Add Environment Variables

Go to **Variables** tab and add:

```bash
# Database (Supabase)
DATABASE_CLIENT=postgres
DATABASE_HOST=db.xxxxx.supabase.co
DATABASE_PORT=5432
DATABASE_NAME=postgres
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=your_supabase_password
DATABASE_SSL=true
DATABASE_SSL_REJECT_UNAUTHORIZED=true

# Strapi Configuration
NODE_ENV=production
HOST=0.0.0.0
PORT=1337

# Generate these using: node generate-keys.js
APP_KEYS=key1,key2,key3,key4
API_TOKEN_SALT=your_secure_random_string
ADMIN_JWT_SECRET=your_secure_random_string
TRANSFER_TOKEN_SALT=your_secure_random_string
JWT_SECRET=your_secure_random_string
```

#### 7. Deploy

1. Railway will automatically deploy
2. Wait 2-3 minutes for build
3. Get your URL: `https://your-project.railway.app`

#### 8. Update CORS

Update `strapi/config/middlewares.ts` to include Railway URL:

```typescript
origin: [
  'http://localhost:3000',
  'http://localhost:1337',
  /https:\/\/.*\.vercel\.app/,
  'https://your-project.railway.app', // Add this
],
```

#### 9. Update Next.js Environment

In Vercel, update environment variable:
```
NEXT_PUBLIC_STRAPI_API_URL=https://your-project.railway.app
```

### Railway Pricing

- **Free tier**: $5/month credit
- **Hobby**: $5/month (if you exceed free credit)
- **Pro**: $20/month (for production apps)

**For a property listing site, free tier is usually enough.**

---

## Option 2: Render ⭐⭐

**Best for:** Free tier users, simple deployments

### Why Render?

- ✅ **Free tier available** - Web service free (with limitations)
- ✅ **Easy setup** - Similar to Railway
- ✅ **Auto-deploy from Git** - Automatic deployments
- ✅ **HTTPS included** - SSL certificates

### Step-by-Step Deployment

#### 1. Create Render Account

1. Go to [Render.com](https://render.com/)
2. Sign up with GitHub
3. Click **"New +"** → **"Web Service"**

#### 2. Connect Repository

1. Select your GitHub repository
2. Render will auto-detect settings

#### 3. Configure Service

- **Name**: `toplix-strapi` (or your choice)
- **Root Directory**: `strapi`
- **Environment**: `Node`
- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm start`

#### 4. Add Environment Variables

Same as Railway (see above)

#### 5. Deploy

1. Click **"Create Web Service"**
2. Wait for deployment (3-5 minutes)
3. Get your URL: `https://your-project.onrender.com`

### Render Pricing

- **Free tier**: Available (spins down after 15 min inactivity)
- **Starter**: $7/month (always on)
- **Standard**: $25/month (better performance)

**Note:** Free tier spins down after inactivity, causing slow first request.

---

## Option 3: Fly.io ⭐⭐⭐

**Best for:** Global edge deployment, generous free tier

### Why Fly.io?

- ✅ **Generous free tier** - 3 shared VMs free
- ✅ **Global edge** - Deploy close to users
- ✅ **Fast cold starts** - Better than Render free tier
- ✅ **Docker-based** - More control

### Step-by-Step Deployment

#### 1. Install Fly CLI

```bash
curl -L https://fly.io/install.sh | sh
```

#### 2. Create Fly App

```bash
cd strapi
fly launch
```

#### 3. Configure

Follow prompts:
- App name: `toplix-strapi`
- Region: Choose closest to you
- PostgreSQL: No (using Supabase)
- Redis: No

#### 4. Add Environment Variables

```bash
fly secrets set DATABASE_HOST=db.xxxxx.supabase.co
fly secrets set DATABASE_PASSWORD=your_password
# ... add all other variables
```

#### 5. Deploy

```bash
fly deploy
```

### Fly.io Pricing

- **Free tier**: 3 shared VMs (usually enough)
- **Paid**: $1.94/month per VM (if needed)

---

## Option 4: DigitalOcean App Platform

**Best for:** More control, predictable pricing

### Why DigitalOcean?

- ✅ **Predictable pricing** - $6-12/month
- ✅ **More control** - Better for scaling
- ✅ **Good documentation** - Well-documented
- ⚠️ **More setup** - Slightly more complex

### Step-by-Step Deployment

1. Go to [DigitalOcean App Platform](https://www.digitalocean.com/products/app-platform)
2. Create new app from GitHub
3. Set root directory to `/strapi`
4. Configure build/start commands
5. Add environment variables
6. Deploy

### DigitalOcean Pricing

- **Basic**: $6/month (512MB RAM)
- **Professional**: $12/month (1GB RAM)

---

## Option 5: Vercel (Not Recommended) ❌

**Why not Vercel?**

- ❌ Strapi is not serverless-friendly
- ❌ Long cold starts
- ❌ File upload issues
- ❌ Database connection pooling problems
- ❌ Not officially supported

**Vercel is great for Next.js, but not for Strapi.**

---

## Comparison: Which Should You Choose?

### For Your Property Listing Site:

**Best Choice: Railway**
- Easiest setup
- $5/month credit (usually free)
- Great developer experience
- Auto-deploys from Git

**Alternative: Render**
- If you want a free tier (with limitations)
- Similar ease of use
- Free tier spins down after inactivity

**If You Need Global Edge: Fly.io**
- Best free tier
- Global deployment
- Slightly more setup

---

## Deployment Checklist

### Before Deploying:

- [ ] Strapi builds successfully locally (`npm run build`)
- [ ] Environment variables ready (Supabase credentials)
- [ ] Strapi secrets generated (`node generate-keys.js`)
- [ ] CORS configured for your Vercel URL
- [ ] Content types created and tested locally

### After Deploying:

- [ ] Strapi admin panel accessible
- [ ] Can create/edit content
- [ ] API endpoints working (`/api/properties`)
- [ ] Next.js can fetch from Strapi
- [ ] Images uploading correctly
- [ ] CORS working (no errors in browser console)

---

## Environment Variables Template

Copy this for your deployment platform:

```bash
# Database (Supabase)
DATABASE_CLIENT=postgres
DATABASE_HOST=db.xxxxx.supabase.co
DATABASE_PORT=5432
DATABASE_NAME=postgres
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=your_password_here
DATABASE_SSL=true
DATABASE_SSL_REJECT_UNAUTHORIZED=true

# Strapi
NODE_ENV=production
HOST=0.0.0.0
PORT=1337

# Secrets (generate with: node generate-keys.js)
APP_KEYS=key1,key2,key3,key4
API_TOKEN_SALT=your_salt_here
ADMIN_JWT_SECRET=your_jwt_secret_here
TRANSFER_TOKEN_SALT=your_transfer_salt_here
JWT_SECRET=your_jwt_secret_here
```

---

## Troubleshooting

### Build Fails

- Check Node.js version (should be 18+)
- Verify all dependencies in `package.json`
- Check build logs for errors

### Database Connection Fails

- Verify Supabase credentials
- Check SSL settings (`DATABASE_SSL=true`)
- Ensure Supabase allows connections from deployment platform

### Admin Panel Not Accessible

- Check URL is correct
- Verify environment variables are set
- Check deployment logs for errors

### API Not Working

- Verify CORS settings include your Vercel URL
- Check API permissions in Strapi admin
- Test API endpoint directly: `https://your-strapi.railway.app/api/properties`

### Images Not Uploading

- Check file upload plugin is enabled
- Verify storage configuration
- Check file size limits

---

## Next Steps After Deployment

1. **Update Vercel Environment Variable:**
   ```
   NEXT_PUBLIC_STRAPI_API_URL=https://your-strapi.railway.app
   ```

2. **Test Production:**
   - Visit your Vercel URL
   - Verify properties load
   - Test image loading

3. **Monitor:**
   - Check Railway/Render logs
   - Monitor database connections
   - Watch for errors

---

## Recommendation

**For your property listing site, use Railway:**

1. ✅ Easiest to set up
2. ✅ $5/month credit (usually free)
3. ✅ Great developer experience
4. ✅ Auto-deploys from Git
5. ✅ Perfect for your use case

**Setup time: ~10 minutes**

Would you like me to create a step-by-step Railway deployment guide specific to your project?

