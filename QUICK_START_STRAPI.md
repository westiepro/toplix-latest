# Quick Start: Run Strapi Locally for Content Types

## Understanding the Setup

- **Strapi Cloud**: Hosted service at `https://your-project.strapi.cloud` (production mode, read-only content types)
- **Local Strapi**: Runs on your computer at `http://localhost:1337` (development mode, can edit content types)

## How to Access and Create Content Types

### 1. Start Strapi Locally

```bash
cd strapi
npm run develop
```

This will:
- Start Strapi in **development mode**
- Use SQLite database locally (no Supabase needed for local dev)
- Open at `http://localhost:1337/admin`

### 2. Access the Admin Panel

Once Strapi starts, you'll see output like:

```
╔════════════════════════════════════════╗
║                                        ║
║   Welcome to Strapi!                   ║
║                                        ║
║   Admin panel: http://localhost:1337/admin
║                                        ║
╚════════════════════════════════════════╝
```

**Open in your browser**: `http://localhost:1337/admin`

### 3. Create Admin User (First Time Only)

1. When you first open the admin panel, you'll see a registration form
2. Fill in:
   - **First name**: Your name
   - **Last name**: Your last name
   - **Email**: Your email
   - **Password**: Create a password (remember this!)
3. Click **"Let's start"**

### 4. Create Property Content Type

1. In the admin panel, click **"Content-Type Builder"** in the left sidebar
2. Click **"+ Create new collection type"**
3. **Display name**: `Property`
4. Click **"Continue"**
5. Add fields (see below for full list)
6. Click **"Save"** when done

### 5. After Creating Content Type

Once you save the content type:
- Schema files are created in `strapi/src/api/property/`
- Commit and push to Git:
  ```bash
  git add strapi/src/api/property/
  git commit -m "Add Property content type"
  git push origin main
  ```
- Strapi Cloud automatically deploys the changes
- Your Property content type appears in Strapi Cloud admin panel

## Property Content Type Fields

Create these fields:

### Required Fields:

1. **title** 
   - Type: Text → Short text
   - Required: ✅ Yes

2. **description**
   - Type: Text → Long text
   - Required: ✅ Yes

3. **price**
   - Type: Number → Decimal
   - Required: ✅ Yes

4. **location**
   - Type: Text → Short text
   - Required: ✅ Yes

5. **status**
   - Type: Enumeration
   - Options: `For Sale`, `For Rent`, `Sold`
   - Default: `For Sale`
   - Required: ✅ Yes

6. **slug**
   - Type: UID
   - Attached field: `title`
   - Required: ✅ Yes

### Optional Fields:

7. **bedrooms**
   - Type: Number → Integer
   - Required: ❌ No

8. **bathrooms**
   - Type: Number → Integer
   - Required: ❌ No

9. **area**
   - Type: Number → Integer
   - Description: "Area in square feet"
   - Required: ❌ No

10. **images**
    - Type: Media → Multiple media
    - Required: ❌ No

## Workflow Summary

```
Local Development (localhost:1337)
  ↓
Create Content Types
  ↓
Save (creates schema files)
  ↓
Commit to Git
  ↓
Push to GitHub
  ↓
Strapi Cloud Auto-Deploys
  ↓
Use Strapi Cloud for Content Management
```

## Important Notes

- **Local Strapi** (`localhost:1337`): Use for creating/editing **content types** (schemas)
- **Strapi Cloud** (`your-project.strapi.cloud`): Use for creating/managing **content** (actual property entries)
- Content types can **only** be edited locally, not in Strapi Cloud
- After pushing to Git, Strapi Cloud automatically has the new content types

## Troubleshooting

### Strapi won't start

```bash
cd strapi
npm install  # Install dependencies
npm run develop
```

### Port 1337 already in use

- Stop any other Strapi instances
- Or change port in `config/server.ts`

### Can't access admin panel

- Make sure Strapi is running (`npm run develop`)
- Wait for "Admin panel: http://localhost:1337/admin" message
- Open `http://localhost:1337/admin` in browser

---

**Ready to start?** Run `cd strapi && npm run develop` and open `http://localhost:1337/admin` in your browser!

