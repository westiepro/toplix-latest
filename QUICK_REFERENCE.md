# Quick Reference Guide

Quick commands and URLs for common tasks.

## Essential Commands

### Initial Setup

```bash
# Initialize Next.js (run from project root)
npx create-next-app@latest . --typescript --tailwind --app --no-src-dir --import-alias "@/*" --yes

# Initialize shadcn/ui
npx shadcn@latest init

# Install shadcn/ui components
npx shadcn@latest add button card input label badge

# Initialize Strapi (run from strapi directory)
cd strapi
npx create-strapi-app@latest . --quickstart --no-run
npm install pg
```

### Generate Secure Keys

```bash
# Generate Strapi environment keys
node generate-keys.js
```

### Development

```bash
# Run Next.js frontend (from root)
npm run dev

# Run Strapi backend (from strapi directory)
cd strapi
npm run develop
```

### Git & Deployment

```bash
# Initial git setup
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/toplix-new.git
git push -u origin main
```

## URLs

### Local Development
- **Next.js Frontend**: http://localhost:3000
- **Strapi Admin Panel**: http://localhost:1337/admin
- **Strapi API**: http://localhost:1337/api

### Services
- **Supabase Dashboard**: https://app.supabase.com/
- **Vercel Dashboard**: https://vercel.com/dashboard
- **GitHub**: https://github.com/

## Environment Variables

### Next.js (.env.local)
```bash
NEXT_PUBLIC_STRAPI_API_URL=http://localhost:1337
STRAPI_API_TOKEN=
```

### Strapi (strapi/.env)
```bash
# Database (from Supabase)
DATABASE_HOST=db.xxxxx.supabase.co
DATABASE_PORT=5432
DATABASE_NAME=postgres
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=your_password

# Generate with: node generate-keys.js
APP_KEYS=...
API_TOKEN_SALT=...
ADMIN_JWT_SECRET=...
TRANSFER_TOKEN_SALT=...
JWT_SECRET=...
```

## Supabase Setup Steps

1. Create project at https://app.supabase.com/
2. Go to **Settings** → **Database**
3. Copy connection string (replace password)
4. Go to **Settings** → **API**
5. Copy Project URL and API keys

## Strapi Content Type Setup

1. Admin Panel → **Content-Type Builder**
2. Create collection type: **Property**
3. Add fields:
   - title (Text)
   - description (Long text)
   - price (Number - Decimal)
   - location (Text)
   - bedrooms (Number - Integer)
   - bathrooms (Number - Integer)
   - area (Number - Integer)
   - images (Media - Multiple)
   - status (Enumeration: For Sale, For Rent, Sold)
   - slug (UID, attached to title)
4. **Settings** → **Users & Permissions** → **Public**
5. Enable: Property → `find`, `findOne`

## Vercel Deployment

1. Go to https://vercel.com/
2. Import GitHub repository
3. Framework: Next.js
4. Add environment variables:
   - `NEXT_PUBLIC_STRAPI_API_URL` (production Strapi URL)
5. Deploy

## Troubleshooting

### Strapi won't connect to database
- Check Supabase database is running
- Verify credentials in `strapi/.env`
- Ensure SSL is enabled (`DATABASE_SSL=true`)

### Properties not showing
- Check `NEXT_PUBLIC_STRAPI_API_URL` in `.env.local`
- Verify Strapi permissions
- Check browser console for errors

### Images not loading
- Update `next.config.ts` image domains
- Check image URLs in browser DevTools
- Verify Strapi file upload plugin

## File Structure

```
toplix-new/
├── app/                  # Next.js pages
│   ├── page.tsx         # Home page
│   └── properties/      # Property pages
├── components/          # React components
│   └── ui/             # shadcn/ui components
├── lib/                # Utilities
│   └── strapi.ts       # Strapi client
├── strapi/             # Strapi CMS
│   ├── config/        # Configuration
│   └── src/           # Strapi source
├── TUTORIAL.md        # Full tutorial
└── QUICK_REFERENCE.md # This file
```

