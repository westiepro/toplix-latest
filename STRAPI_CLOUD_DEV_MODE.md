# Working with Strapi Cloud - Development Workflow

**Important**: Strapi Cloud does **NOT** support running in development mode directly in the cloud. Due to Strapi Cloud's ephemeral file system, any changes made directly in Strapi Cloud are temporary and will be lost.

**The recommended workflow is to develop locally, then push to Git for automatic deployment.**

## Recommended Workflow: Local Development → Git → Strapi Cloud

Since Strapi Cloud doesn't support development mode directly, use this workflow:

### Step 1: Run Strapi Locally in Development Mode

```bash
cd strapi
npm run develop
```

This will:
- Start Strapi in development mode on `http://localhost:1337`
- Use SQLite locally (no need to configure Supabase locally)
- Allow you to create/edit content types

### Step 2: Create Content Types Locally

1. Open `http://localhost:1337/admin` in your browser
2. Create your admin user (first time only)
3. Go to **Content-Type Builder**
4. Click **"Create new collection type"**
5. Create your **Property** content type (see details below)
6. Click **"Save"** - this creates schema files locally

### Step 3: Commit and Push Changes

After creating content types, commit the schema changes:

```bash
# From project root
git add strapi/src/api/property/
git commit -m "Add Property content type"
git push origin main
```

### Step 4: Strapi Cloud Auto-Deploys

- Strapi Cloud automatically detects the Git push
- It deploys the new content types to your production environment
- Your Property content type will be available in Strapi Cloud admin panel

## Local Development vs Strapi Cloud

### Local Development (Your Computer)
- ✅ Run `npm run develop` locally
- ✅ Edit content types in Content-Type Builder
- ✅ Uses SQLite database locally
- ✅ Schema changes saved to files in `strapi/src/api/`
- ✅ URL: `http://localhost:1337/admin`

### Strapi Cloud (Production)
- ❌ Content types are read-only (production mode only)
- ✅ Use this for managing **content** (not schemas)
- ✅ Automatically deploys when you push to Git
- ✅ Uses Supabase PostgreSQL database
- ✅ URL: `https://your-project.strapi.cloud/admin`

## Creating Property Content Type Locally

Run Strapi locally, then create the Property content type:

1. Go to **Content-Type Builder**
2. Click **"Create new collection type"**
3. Name it: **Property**
4. Add fields:

   **Required Fields:**
   - `title` (Text - Short text) - Required
   - `description` (Text - Long text) - Required  
   - `price` (Number - Decimal) - Required
   - `location` (Text - Short text) - Required
   - `status` (Enumeration) - Options: `For Sale`, `For Rent`, `Sold` - Required
   - `slug` (UID) - Attached to: `title` - Required

   **Optional Fields:**
   - `bedrooms` (Number - Integer) - Optional
   - `bathrooms` (Number - Integer) - Optional
   - `area` (Number - Integer) - Optional (Description: "Area in square feet")
   - `images` (Media - Multiple media) - Optional

5. Click **"Save"** - this creates schema files in `strapi/src/api/property/`
6. Commit and push to Git:
   ```bash
   git add strapi/src/api/property/
   git commit -m "Add Property content type"
   git push origin main
   ```
7. Strapi Cloud automatically deploys the changes

## Workflow

### For Content Type Development:
1. ✅ Run Strapi locally (`npm run develop` in `/strapi` directory)
2. ✅ Create/edit content types in local admin panel (`http://localhost:1337/admin`)
3. ✅ Commit schema changes to Git
4. ✅ Push to GitHub - Strapi Cloud auto-deploys

### For Content Management:
1. ✅ Use production environment for creating/managing content
2. ✅ Create Property entries
3. ✅ Publish content
4. ✅ Access via API in your Next.js frontend

## Important Notes

### Git Integration

- Strapi Cloud automatically commits schema changes to your Git repository
- You may need to pull these changes to your local repository:
  ```bash
  git pull origin main
  ```

### Environment Variables

- Both development and production environments use the same environment variables
- Make sure your Supabase database credentials are configured in Strapi Cloud Settings → Environment Variables

### CORS Configuration

- Update CORS settings in Strapi Cloud to allow your Next.js frontend
- Development URL: `http://localhost:3000`
- Production URL: Your Vercel deployment URL

## Next Steps After Creating Content Types

1. **Configure Permissions**:
   - Go to **Settings** → **Users & Permissions Plugin** → **Roles** → **Public**
   - Enable `find` and `findOne` for Property

2. **Switch to Production Mode**:
   - Once content types are created, you can switch back to production
   - Use production mode for content management

3. **Update Next.js Frontend**:
   - Use your Strapi Cloud API URL: `https://your-project.strapi.cloud`
   - Update `.env.local`:
     ```bash
     NEXT_PUBLIC_STRAPI_API_URL=https://your-project.strapi.cloud
     ```

## Troubleshooting

### Strapi Cloud shows production mode warning

- This is **normal** - Strapi Cloud runs in production mode only
- You **cannot** edit content types directly in Strapi Cloud
- You **must** develop locally and push to Git

### Changes not saving locally

- Make sure you're running `npm run develop` (not `npm run start`)
- Check that NODE_ENV is development
- Verify Strapi is running on `http://localhost:1337`
- Check file permissions in `strapi/src/api/`

### Content types not appearing in production

- Make sure changes are committed to Git
- Check Git repository for schema files
- Verify deployment was successful

---

**Ready to create content types!** Run Strapi locally in development mode, create your Property content type, then push to Git for automatic deployment to Strapi Cloud.

**Reference**: [Strapi Cloud Development Mode Support](https://support.strapi.io/articles/9024990858-can-i-run-strapi-in-development-mode-on-strapi-cloud)

