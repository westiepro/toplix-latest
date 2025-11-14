# Quick Steps: First Property to Vercel

## ✅ Step 1: Create Property Content Type (5 minutes)

1. Open: `http://localhost:1337/admin`
2. Click **"Content-Type Builder"** → **"+ Create new collection type"**
3. Name: `Property`
4. Add these fields:
   - `title` (Text - Short text, Required)
   - `description` (Text - Long text, Required)
   - `price` (Number - Decimal, Required)
   - `location` (Text - Short text, Required)
   - `bedrooms` (Number - Integer, Optional)
   - `bathrooms` (Number - Integer, Optional)
   - `area` (Number - Integer, Optional)
   - `images` (Media - Multiple, Optional)
   - `status` (Enumeration: For Sale, For Rent, Sold, Required)
   - `slug` (UID, attached to title, Required)
5. Click **"Save"**

## ✅ Step 2: Set Permissions (1 minute)

1. **Settings** → **Users & Permissions** → **Roles** → **Public**
2. Under **Property**, enable:
   - ✅ `find`
   - ✅ `findOne`
3. Click **"Save"**

## ✅ Step 3: Create First Property (2 minutes)

1. **Content Manager** → **Property** → **"+ Create new entry"**
2. Fill in the form (title, description, price, etc.)
3. Click **"Save"** then **"Publish"**

## ✅ Step 4: Test Locally (1 minute)

```bash
cd /Users/christian/Desktop/toplix-new
npm run dev
```

Visit: `http://localhost:3000` - you should see your property!

## ✅ Step 5: Commit to Git (1 minute)

```bash
git add .
git commit -m "Add Property content type and frontend"
git push origin main
```

## ✅ Step 6: Configure Strapi Cloud

1. Go to Strapi Cloud dashboard
2. **Settings** → **Environment Variables**
3. Add Supabase credentials:
   ```
   DATABASE_CLIENT=postgres
   DATABASE_HOST=db.luyjehygdbsvjoyrkcsn.supabase.co
   DATABASE_PORT=5432
   DATABASE_NAME=postgres
   DATABASE_USERNAME=postgres
   DATABASE_PASSWORD=s48AgFUkZSmYX53F
   DATABASE_SSL=true
   DATABASE_SSL_REJECT_UNAUTHORIZED=false
   ```
4. Add Strapi secrets (generate with `node generate-keys.js`)
5. Get your Strapi Cloud URL (e.g., `https://your-project.strapi.cloud`)

## ✅ Step 7: Deploy to Vercel (5 minutes)

1. Go to: https://vercel.com/
2. **"Add New..."** → **"Project"**
3. Import `toplix-latest` repository
4. **Environment Variables**:
   - Key: `NEXT_PUBLIC_STRAPI_API_URL`
   - Value: Your Strapi Cloud URL (e.g., `https://your-project.strapi.cloud`)
5. Click **"Deploy"**
6. Get your Vercel URL (e.g., `https://toplix-latest.vercel.app`)

## ✅ Step 8: Update Strapi Cloud CORS

1. Strapi Cloud → **Settings** → **API** → **CORS**
2. Add your Vercel URL: `https://toplix-latest.vercel.app`
3. Save

## ✅ Done!

Visit your Vercel URL - your property should be visible! 🎉

---

**Total time: ~15 minutes**

