# Troubleshooting: Properties Not Showing on Vercel

## Issue: Properties Not Displaying

If your properties aren't showing on the deployed Vercel site, check these:

### 1. Check Environment Variables in Vercel

**Required Environment Variable:**
```
NEXT_PUBLIC_STRAPI_API_URL=https://your-strapi-url.com
```

**How to Check:**
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Verify `NEXT_PUBLIC_STRAPI_API_URL` is set
5. Make sure it's set for **Production**, **Preview**, and **Development**

**If Missing:**
- Add the environment variable with your Strapi URL
- Redeploy the application

### 2. Check Vercel Function Logs

1. Go to Vercel Dashboard → Your Project → **Deployments**
2. Click on the latest deployment
3. Click **View Function Logs**
4. Look for errors like:
   - `Cannot connect to Strapi`
   - `ECONNREFUSED`
   - `ERR_NETWORK`
   - `404 Not Found`

### 3. Verify Strapi is Accessible

**Test your Strapi URL:**
```bash
curl https://your-strapi-url.com/api/properties
```

**Should return:**
- JSON data with properties
- Not a 404 or connection error

**If Strapi is not deployed:**
- Deploy Strapi to Railway, Render, or another hosting service
- Update `NEXT_PUBLIC_STRAPI_API_URL` in Vercel

### 4. Check CORS Configuration

**In Strapi `config/middlewares.ts`:**
```typescript
origin: [
  'http://localhost:3000',
  'http://localhost:1337',
  /https:\/\/.*\.vercel\.app/,
  'https://toplix-latest-5fib.vercel.app', // Your Vercel URL
],
```

**If CORS is not configured:**
- Update Strapi CORS settings
- Redeploy Strapi
- Redeploy Next.js on Vercel

### 5. Check Property Status in Strapi

**Properties must be:**
- ✅ **Published** (not draft)
- ✅ Have `Listing_Type` or `Listing_Status` set to "For Sale" (for /buy page)
- ✅ Have `Listing_Type` or `Listing_Status` set to "For Rent" (for /rent page)

**To Check:**
1. Go to Strapi Admin Panel
2. Navigate to **Content Manager** → **Property**
3. Verify properties are **Published**
4. Check `Listing_Type` or `Listing_Status` field

### 6. Check API Permissions in Strapi

**In Strapi Admin Panel:**
1. Go to **Settings** → **Users & Permissions Plugin** → **Roles** → **Public**
2. Under **Property**, enable:
   - ✅ `find`
   - ✅ `findOne`
3. Click **Save**

### 7. Debug Steps

**Add temporary logging:**
```typescript
// In lib/strapi.ts
export async function getProperties() {
  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';
  console.log('🔍 Strapi URL:', strapiUrl);
  console.log('🔍 Environment:', process.env.NODE_ENV);
  
  try {
    const response = await strapiClient.get('/properties?populate=Images');
    console.log('✅ Properties fetched:', response.data.data.length);
    // ... rest of code
  } catch (error) {
    console.error('❌ Error details:', {
      message: error.message,
      code: error.code,
      url: strapiUrl,
    });
    return [];
  }
}
```

**Check Vercel logs after redeploy to see:**
- What URL is being used
- What error is occurring
- How many properties are found

### 8. Common Issues

**Issue: Environment variable not set**
- **Symptom:** Empty array returned, no errors in logs
- **Fix:** Add `NEXT_PUBLIC_STRAPI_API_URL` in Vercel

**Issue: Strapi not deployed**
- **Symptom:** Connection refused errors
- **Fix:** Deploy Strapi to Railway/Render

**Issue: CORS error**
- **Symptom:** CORS errors in browser console
- **Fix:** Update Strapi CORS configuration

**Issue: Properties not published**
- **Symptom:** API returns empty array
- **Fix:** Publish properties in Strapi admin

**Issue: Wrong Listing_Type**
- **Symptom:** Properties exist but don't show on /buy or /rent
- **Fix:** Check `Listing_Type` or `Listing_Status` field values

### 9. Quick Test

**Test the API directly:**
```bash
# Replace with your Strapi URL
curl https://your-strapi-url.com/api/properties?populate=Images
```

**Should return JSON with properties array.**

### 10. Still Not Working?

1. Check Vercel Function Logs for specific errors
2. Verify Strapi is accessible from your browser
3. Test the API endpoint directly
4. Check that properties are published in Strapi
5. Verify environment variables are set correctly

---

## Quick Checklist

- [ ] `NEXT_PUBLIC_STRAPI_API_URL` set in Vercel
- [ ] Strapi is deployed and accessible
- [ ] CORS configured in Strapi
- [ ] Properties are published in Strapi
- [ ] Properties have correct `Listing_Type` or `Listing_Status`
- [ ] Public role has `find` permission in Strapi
- [ ] No errors in Vercel function logs

