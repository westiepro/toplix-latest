# Vercel Deployment Checklist

Complete checklist to ensure your Next.js app is ready for Vercel deployment.

---

## ✅ 1. Package.json Review

### Current Status: ✅ **GOOD**

Your `package.json` looks correct:
- ✅ Build script: `"build": "next build"`
- ✅ Start script: `"start": "next start"`
- ✅ All dependencies properly listed
- ✅ No missing packages
- ✅ TypeScript configured

### Required Scripts (All Present):
```json
{
  "scripts": {
    "dev": "next dev",        // ✅ Development
    "build": "next build",    // ✅ Production build
    "start": "next start",    // ✅ Production server
    "lint": "eslint"          // ✅ Linting
  }
}
```

---

## ✅ 2. Next.js Configuration Review

### Current Status: ⚠️ **NEEDS UPDATE**

Your `next.config.ts` is configured but needs Railway URL if using Railway:

**Current Configuration:**
```typescript
images: {
  remotePatterns: [
    {
      protocol: 'http',
      hostname: 'localhost',
      port: '1337',
      pathname: '/uploads/**',
    },
    {
      protocol: 'https',
      hostname: '*.strapi.cloud',
      pathname: '/uploads/**',
    },
    {
      protocol: 'https',
      hostname: '*.supabase.co',
      pathname: '/storage/**',
    },
  ],
}
```

### ✅ Action Required:

**If using Railway for Strapi**, add Railway URL pattern:

```typescript
{
  protocol: 'https',
  hostname: '*.railway.app',
  pathname: '/uploads/**',
}
```

**If using Render for Strapi**, add Render URL pattern:

```typescript
{
  protocol: 'https',
  hostname: '*.onrender.com',
  pathname: '/uploads/**',
}
```

---

## ⚠️ 3. Environment Variables

### Required Environment Variables for Vercel:

You **MUST** configure these in Vercel Dashboard → Settings → Environment Variables:

#### Required:
```bash
# Strapi API URL (Production)
NEXT_PUBLIC_STRAPI_API_URL=https://your-strapi.railway.app
# OR
NEXT_PUBLIC_STRAPI_API_URL=https://your-project.strapi.cloud
# OR (if using local Strapi with tunnel)
NEXT_PUBLIC_STRAPI_API_URL=https://your-ngrok-url.ngrok.io
```

#### Optional (for Mapbox):
```bash
# Mapbox Token (for property maps)
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token_here
```

#### Optional (for API authentication):
```bash
# Strapi API Token (if needed for protected routes)
STRAPI_API_TOKEN=your_strapi_api_token_here
```

### How to Add in Vercel:

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add each variable:
   - **Key**: `NEXT_PUBLIC_STRAPI_API_URL`
   - **Value**: Your production Strapi URL
   - **Environment**: Production, Preview, Development (select all)
5. Click **"Save"**
6. **Redeploy** your application

---

## ✅ 4. Build Configuration

### Current Status: ✅ **GOOD**

- ✅ TypeScript configured
- ✅ Tailwind CSS configured
- ✅ Next.js 16.0.3 (latest)
- ✅ React 19.2.0

### Build Output:
Your build should generate:
- Static pages for `/`, `/buy`, `/rent`, `/login`
- Dynamic pages for `/properties/[slug]`

---

## ✅ 5. Git Configuration

### Current Status: ✅ **GOOD**

- ✅ `.gitignore` properly configured
- ✅ Environment files excluded (`.env*`)
- ✅ `node_modules` excluded
- ✅ `.next` build folder excluded
- ✅ `package-lock.json` included (important!)

---

## ⚠️ 6. Strapi CORS Configuration

### Action Required:

Make sure your Strapi (Railway/Render) has CORS configured to allow your Vercel URL:

**In Strapi `config/middlewares.ts`:**
```typescript
origin: [
  'http://localhost:3000',
  'http://localhost:1337',
  /https:\/\/.*\.vercel\.app/,  // ✅ This allows all Vercel deployments
  'https://your-specific-app.vercel.app', // ✅ Add your specific URL
],
```

---

## 📋 Pre-Deployment Checklist

### Before Deploying to Vercel:

- [ ] **Test build locally**: `npm run build` succeeds
- [ ] **Strapi deployed**: Railway/Render URL is working
- [ ] **Strapi CORS configured**: Allows Vercel URLs
- [ ] **Environment variables ready**: Have all values
- [ ] **Mapbox token** (if using maps): Get from Mapbox dashboard
- [ ] **Strapi API URL**: Production URL ready
- [ ] **Git pushed**: Latest code is on GitHub

---

## 🚀 Deployment Steps

### Step 1: Configure Vercel Environment Variables

1. Go to Vercel Dashboard
2. Select your project
3. **Settings** → **Environment Variables**
4. Add:
   ```
   NEXT_PUBLIC_STRAPI_API_URL=https://your-strapi.railway.app
   NEXT_PUBLIC_MAPBOX_TOKEN=your_token (if using maps)
   ```
5. Click **"Save"**

### Step 2: Deploy

1. Vercel will auto-deploy on Git push
2. OR manually trigger: **Deployments** → **Redeploy**

### Step 3: Verify

1. Visit your Vercel URL
2. Check browser console for errors
3. Verify properties load
4. Test property detail pages
5. Test map (if using Mapbox)

---

## 🔍 Post-Deployment Verification

### Check These:

1. **Homepage loads**: `https://your-app.vercel.app`
2. **Properties display**: Check `/buy` and `/rent` pages
3. **Property details work**: Click a property
4. **Images load**: Check property images
5. **Map works** (if enabled): Check map displays
6. **No console errors**: Open DevTools → Console
7. **API calls succeed**: Check Network tab

---

## 🐛 Common Issues & Fixes

### Issue 1: Properties Not Loading

**Symptoms:**
- Empty property lists
- Console errors about API

**Fix:**
- Verify `NEXT_PUBLIC_STRAPI_API_URL` in Vercel
- Check Strapi is running and accessible
- Verify CORS settings in Strapi

### Issue 2: Images Not Loading

**Symptoms:**
- Broken image icons
- 404 errors for images

**Fix:**
- Update `next.config.ts` with correct Strapi URL pattern
- Verify image URLs in browser DevTools
- Check Strapi uploads are published

### Issue 3: Map Not Displaying

**Symptoms:**
- Blank map area
- "Mapbox token not configured" message

**Fix:**
- Add `NEXT_PUBLIC_MAPBOX_TOKEN` in Vercel
- Get token from [Mapbox Dashboard](https://account.mapbox.com/)
- Redeploy after adding token

### Issue 4: CORS Errors

**Symptoms:**
- Console shows CORS errors
- API calls blocked

**Fix:**
- Update Strapi `config/middlewares.ts`
- Add Vercel URL to CORS origins
- Redeploy Strapi

---

## 📝 Environment Variables Template

Copy this template for Vercel:

```bash
# Required
NEXT_PUBLIC_STRAPI_API_URL=https://your-strapi.railway.app

# Optional (for maps)
NEXT_PUBLIC_MAPBOX_TOKEN=pk.eyJ1IjoieW91cnVzZXJuYW1lIiwiYSI6ImNs...

# Optional (for API authentication)
STRAPI_API_TOKEN=your_strapi_api_token_here
```

---

## ✅ Final Checklist

Before going live:

- [ ] Build succeeds locally (`npm run build`)
- [ ] All environment variables set in Vercel
- [ ] Strapi deployed and accessible
- [ ] CORS configured in Strapi
- [ ] `next.config.ts` has correct image domains
- [ ] Tested on Vercel preview deployment
- [ ] No console errors
- [ ] All pages load correctly
- [ ] Images display properly
- [ ] Map works (if enabled)

---

## 🎯 Quick Reference

### Vercel Dashboard:
- **Environment Variables**: Settings → Environment Variables
- **Deployments**: Deployments tab
- **Logs**: Click on deployment → View Function Logs

### Strapi Configuration:
- **CORS**: `strapi/config/middlewares.ts`
- **Image Domains**: `next.config.ts`

### Test URLs:
- **Vercel**: `https://your-app.vercel.app`
- **Strapi**: `https://your-strapi.railway.app/admin`

---

**You're ready to deploy!** 🚀

Follow the steps above and your app should work perfectly on Vercel.

