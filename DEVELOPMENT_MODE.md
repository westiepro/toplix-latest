# Running Strapi in Development Mode

## What's Configured

✅ **Database Configuration**: Automatically uses:
- **SQLite** for local development (easier setup, no database connection needed)
- **PostgreSQL (Supabase)** for production in Strapi Cloud (via environment variables)

## Starting Strapi Locally

To run Strapi in development mode locally:

```bash
cd strapi
npm run develop
```

Or:

```bash
cd strapi
NODE_ENV=development npm run develop
```

This will:
- Start Strapi in development mode
- Use SQLite database locally (in `.tmp/data.db`)
- Open the admin panel at `http://localhost:1337/admin`

## Creating Content Types Locally

1. **Start Strapi in development mode** (see above)

2. **Access Admin Panel**:
   - Go to `http://localhost:1337/admin`
   - Create your admin user (first time only)

3. **Create Content Types**:
   - Go to **Content-Type Builder**
   - Click **"Create new collection type"**
   - Create your **Property** content type with all fields
   - Click **"Save"** - this will update the schema files

4. **Commit and Push Changes**:
   ```bash
   git add strapi/src/api/property/
   git add strapi/src/api/property/content-types/property/
   git commit -m "Add Property content type"
   git push origin main
   ```

5. **Strapi Cloud Deploys**:
   - Strapi Cloud will automatically detect the changes
   - It will deploy the new content types
   - The content types will be available in your Strapi Cloud admin panel

## Important Notes

### Development vs Production

- **Local Development**: Uses SQLite, allows editing content types
- **Strapi Cloud (Production)**: Uses Supabase PostgreSQL, content types are managed via Git

### Workflow for Content Types

1. ✅ Create content types **locally** in development mode
2. ✅ Commit schema changes to Git
3. ✅ Push to GitHub
4. ✅ Strapi Cloud automatically deploys the changes
5. ✅ Use Strapi Cloud admin panel to create and manage content

### Database

- **Local**: SQLite (`.tmp/data.db`) - for development only
- **Strapi Cloud**: Supabase PostgreSQL - configured via environment variables in Strapi Cloud dashboard

## Creating Property Content Type

Follow these steps to create the Property content type:

1. Start Strapi in development mode
2. Go to Content-Type Builder
3. Create collection type: **Property**
4. Add fields:
   - `title` (Text, Short text, Required)
   - `description` (Text, Long text, Required)
   - `price` (Number, Decimal, Required)
   - `location` (Text, Short text, Required)
   - `bedrooms` (Number, Integer, Optional)
   - `bathrooms` (Number, Integer, Optional)
   - `area` (Number, Integer, Optional)
   - `images` (Media, Multiple media, Optional)
   - `status` (Enumeration: For Sale, For Rent, Sold, Required)
   - `slug` (UID, Attached to: title, Required)
5. Click **Save**

## Troubleshooting

### Strapi won't start

- Make sure port 1337 is not in use
- Check if node_modules are installed: `npm install`
- Clear cache: `rm -rf .cache .tmp`

### Content types not syncing to Strapi Cloud

- Make sure you committed the schema files to Git
- Check that files in `strapi/src/api/property/` are pushed to GitHub
- Verify Strapi Cloud deployment logs

### Still in production mode locally

- Make sure you're running `npm run develop` (not `npm run start`)
- Check NODE_ENV is set to `development`
- Restart Strapi after changes

---

**Now you can create content types locally!** Start Strapi in development mode and create your Property content type.

