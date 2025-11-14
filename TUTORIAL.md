# Complete Setup Tutorial: Next.js + Tailwind + shadcn/ui + Strapi + Supabase → Vercel

This tutorial will guide you through setting up a full-stack property listing application from scratch to deployment on Vercel.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Initial Project Setup](#initial-project-setup)
3. [Next.js Installation](#nextjs-installation)
4. [Tailwind CSS Setup](#tailwind-css-setup)
5. [shadcn/ui Installation](#shadcnui-installation)
6. [Supabase Database Setup](#supabase-database-setup)
7. [Strapi Installation](#strapi-installation)
8. [Strapi Configuration for Supabase](#strapi-configuration-for-supabase)
9. [Creating Property Content Type in Strapi](#creating-property-content-type-in-strapi)
10. [Next.js Frontend Setup](#nextjs-frontend-setup)
11. [GitHub Repository Setup](#github-repository-setup)
12. [Vercel Deployment](#vercel-deployment)
13. [Publishing Your First Property](#publishing-your-first-property)

---

## Prerequisites

Before starting, ensure you have:
- **Node.js** (v18 or higher) installed - [Download](https://nodejs.org/)
- **Git** installed - [Download](https://git-scm.com/)
- A **Supabase** account - [Sign up](https://supabase.com/)
- A **GitHub** account - [Sign up](https://github.com/)
- A **Vercel** account - [Sign up](https://vercel.com/)

---

## Step 1: Initial Project Setup

### 1.1 Navigate to Your Project Directory

```bash
cd /Users/christian/Desktop/toplix-new
```

### 1.2 Initialize Git Repository

```bash
git init
```

---

## Step 2: Next.js Installation

### 2.1 Create Next.js Application

```bash
npx create-next-app@latest . --typescript --tailwind --app --no-src-dir --import-alias "@/*" --yes
```

This will create a Next.js project with:
- TypeScript
- Tailwind CSS
- App Router
- Import alias configured

### 2.2 Verify Installation

```bash
npm run dev
```

Visit `http://localhost:3000` to see your Next.js app running.

---

## Step 3: Tailwind CSS Setup

Tailwind CSS should already be installed with the Next.js setup. Let's verify and configure it.

### 3.1 Check Tailwind Configuration

The `tailwind.config.ts` file should exist. Let's ensure it's properly configured:

```bash
# File should exist at: tailwind.config.ts
```

### 3.2 Verify Tailwind is Working

Check that `app/globals.css` includes Tailwind directives:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

## Step 4: shadcn/ui Installation

### 4.1 Initialize shadcn/ui

```bash
npx shadcn@latest init
```

When prompted:
- **Style**: Default
- **Base color**: Slate
- **CSS variables**: Yes
- **Where is your global CSS file?**: `app/globals.css`
- **Would you like to use CSS variables for colors?**: Yes
- **Are you using a custom tailwind prefix?**: No
- **Where is your tailwind.config.js located?**: `tailwind.config.ts`
- **Configure the import alias for components?**: `@/components`
- **Configure the import alias for utils?**: `@/lib/utils`

### 4.2 Install Essential Components

```bash
# Button component
npx shadcn@latest add button

# Card component
npx shadcn@latest add card

# Input component
npx shadcn@latest add input

# Label component
npx shadcn@latest add label

# Badge component
npx shadcn@latest add badge
```

---

## Step 5: Supabase Database Setup

### 5.1 Create Supabase Project

1. Go to [Supabase Dashboard](https://app.supabase.com/)
2. Click **"New Project"**
3. Fill in:
   - **Project Name**: `toplix-properties`
   - **Database Password**: (Choose a strong password and save it!)
   - **Region**: Choose closest to you
4. Click **"Create new project"**
5. Wait for project setup (takes 1-2 minutes)

### 5.2 Get Database Connection String

1. In Supabase Dashboard, go to **Settings** → **Database**
2. Scroll to **Connection string** section
3. Select **URI** tab
4. Copy the connection string (it looks like: `postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres`)
5. Replace `[YOUR-PASSWORD]` with your actual database password
6. Save this connection string for Strapi configuration

### 5.3 Get Supabase API Keys

1. Go to **Settings** → **API**
2. Copy:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon public** key
   - **service_role** key (keep this secret!)

Save these for later use.

---

## Step 6: Strapi Installation

### 6.1 Navigate to Strapi Directory

```bash
cd strapi
```

### 6.2 Create Strapi Project

```bash
npx create-strapi-app@latest . --quickstart --no-run
```

**Note**: We use `--no-run` because we'll configure the database first.

### 6.3 Install PostgreSQL Client

```bash
cd strapi
npm install pg
```

---

## Step 7: Strapi Configuration for Supabase

### 7.1 Configure Database Connection

Edit `config/database.ts`:

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

### 7.2 Create Environment File

Create `.env` file in the `strapi` directory:

```bash
# In strapi/.env
HOST=0.0.0.0
PORT=1337
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

# Optional: Production settings
NODE_ENV=development
```

**Important**: 
- Replace `db.xxxxx.supabase.co` with your Supabase database host
- Replace `your_database_password_here` with your actual database password
- Generate secure values for the keys (see step 7.3)

### 7.3 Generate Secure Keys

Run these commands to generate secure random keys:

```bash
# Generate random strings for secrets
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

Run this 7 times and use the outputs for:
- `APP_KEYS` (4 values, comma-separated)
- `API_TOKEN_SALT`
- `ADMIN_JWT_SECRET`
- `TRANSFER_TOKEN_SALT`
- `JWT_SECRET`

### 7.4 Update CORS Configuration

Edit `config/middlewares.ts`:

```typescript
export default [
  'strapi::logger',
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:'],
          'img-src': [
            "'self'",
            'data:',
            'blob:',
            'dl.airtable.com',
            'your-supabase-project.supabase.co',
          ],
          'media-src': [
            "'self'",
            'data:',
            'blob:',
            'dl.airtable.com',
            'your-supabase-project.supabase.co',
          ],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  {
    name: 'strapi::cors',
    config: {
      enabled: true,
      origin: ['http://localhost:3000', 'http://localhost:1337', 'https://your-vercel-url.vercel.app'],
      headers: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
    },
  },
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
```

### 7.5 Build and Run Strapi

```bash
cd strapi
npm run build
npm run develop
```

Strapi will open at `http://localhost:1337/admin`

### 7.6 Create Admin User

1. Fill in the registration form
2. Remember your admin credentials!
3. Click **"Let's start"**

---

## Step 8: Creating Property Content Type in Strapi

### 8.1 Create Property Collection Type

1. In Strapi Admin Panel, go to **Content-Type Builder**
2. Click **"Create new collection type"**
3. Name it: `Property` (Display name: `Property`)
4. Click **"Continue"**

### 8.2 Add Fields to Property

Add the following fields:

1. **title** (Text - Short text)
   - Required: Yes

2. **description** (Text - Long text)
   - Required: Yes

3. **price** (Number - Decimal)
   - Required: Yes

4. **location** (Text - Short text)
   - Required: Yes

5. **bedrooms** (Number - Integer)
   - Required: No

6. **bathrooms** (Number - Integer)
   - Required: No

7. **area** (Number - Integer)
   - Required: No
   - Description: "Area in square feet"

8. **images** (Media - Multiple media)
   - Required: No

9. **status** (Enumeration)
   - Options: `For Sale`, `For Rent`, `Sold`
   - Required: Yes
   - Default: `For Sale`

10. **slug** (UID)
    - Attached field: `title`
    - Required: Yes

### 8.3 Configure Permissions

1. Go to **Settings** → **Users & Permissions Plugin** → **Roles** → **Public**
2. Under **Property**, check:
   - `find`
   - `findOne`
3. Click **"Save"**

### 8.4 Save the Content Type

Click **"Save"** and wait for Strapi to restart.

---

## Step 9: Next.js Frontend Setup

### 9.1 Install Required Packages

```bash
cd ..  # Go back to root
npm install axios
```

### 9.2 Create Environment Variables

Create `.env.local` in the root directory:

```bash
# .env.local
NEXT_PUBLIC_STRAPI_API_URL=http://localhost:1337
STRAPI_API_TOKEN=your_strapi_api_token_here
```

### 9.3 Create Strapi Client Utility

Create `lib/strapi.ts`:

```typescript
import axios from 'axios';

const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';

export const strapiClient = axios.create({
  baseURL: `${strapiUrl}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface Property {
  id: number;
  attributes: {
    title: string;
    description: string;
    price: number;
    location: string;
    bedrooms?: number;
    bathrooms?: number;
    area?: number;
    status: string;
    slug: string;
    images?: {
      data: Array<{
        id: number;
        attributes: {
          url: string;
          alternativeText?: string;
        };
      }>;
    };
    createdAt: string;
    updatedAt: string;
    publishedAt?: string;
  };
}

export async function getProperties() {
  try {
    const response = await strapiClient.get('/properties?populate=*');
    return response.data.data as Property[];
  } catch (error) {
    console.error('Error fetching properties:', error);
    return [];
  }
}

export async function getPropertyBySlug(slug: string) {
  try {
    const response = await strapiClient.get(`/properties?filters[slug][$eq]=${slug}&populate=*`);
    const properties = response.data.data as Property[];
    return properties[0] || null;
  } catch (error) {
    console.error('Error fetching property:', error);
    return null;
  }
}
```

### 9.4 Create Property Card Component

Create `components/property-card.tsx`:

```typescript
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Property } from '@/lib/strapi';

interface PropertyCardProps {
  property: Property;
}

export function PropertyCard({ property }: PropertyCardProps) {
  const { attributes } = property;
  const imageUrl = attributes.images?.data?.[0]?.attributes?.url
    ? `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${attributes.images.data[0].attributes.url}`
    : '/placeholder-property.jpg';

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48 w-full">
        <Image
          src={imageUrl}
          alt={attributes.title}
          fill
          className="object-cover"
        />
        <Badge className="absolute top-2 right-2" variant="secondary">
          {attributes.status}
        </Badge>
      </div>
      <CardHeader>
        <CardTitle className="text-xl">{attributes.title}</CardTitle>
        <p className="text-sm text-muted-foreground">{attributes.location}</p>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold text-primary">
          ${attributes.price.toLocaleString()}
        </p>
        <div className="flex gap-4 mt-2 text-sm text-muted-foreground">
          {attributes.bedrooms && <span>{attributes.bedrooms} Beds</span>}
          {attributes.bathrooms && <span>{attributes.bathrooms} Baths</span>}
          {attributes.area && <span>{attributes.area} sqft</span>}
        </div>
        <p className="mt-2 text-sm line-clamp-2">{attributes.description}</p>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link href={`/properties/${attributes.slug}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
);
}
```

### 9.5 Update Home Page

Update `app/page.tsx`:

```typescript
import { getProperties } from '@/lib/strapi';
import { PropertyCard } from '@/components/property-card';

export default async function Home() {
  const properties = await getProperties();

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Property Listings</h1>
        <p className="text-muted-foreground">
          Discover your dream property
        </p>
      </div>

      {properties.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">
            No properties available yet. Add your first property in Strapi!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      )}
    </main>
  );
}
```

### 9.6 Create Property Detail Page

Create `app/properties/[slug]/page.tsx`:

```typescript
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getPropertyBySlug } from '@/lib/strapi';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface PageProps {
  params: {
    slug: string;
  };
}

export default async function PropertyPage({ params }: PageProps) {
  const property = await getPropertyBySlug(params.slug);

  if (!property) {
    notFound();
  }

  const { attributes } = property;
  const images = attributes.images?.data || [];
  const mainImage = images[0]?.attributes?.url
    ? `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${images[0].attributes.url}`
    : '/placeholder-property.jpg';

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-4">
        <a href="/" className="text-primary hover:underline">
          ← Back to listings
        </a>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <div className="relative h-96 w-full rounded-lg overflow-hidden mb-4">
            <Image
              src={mainImage}
              alt={attributes.title}
              fill
              className="object-cover"
            />
          </div>
          {images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {images.slice(1, 5).map((image) => (
                <div key={image.id} className="relative h-20 w-full rounded overflow-hidden">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${image.attributes.url}`}
                    alt={image.attributes.alternativeText || attributes.title}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <Badge className="mb-4" variant="secondary">
            {attributes.status}
          </Badge>
          <h1 className="text-4xl font-bold mb-2">{attributes.title}</h1>
          <p className="text-2xl font-bold text-primary mb-4">
            ${attributes.price.toLocaleString()}
          </p>
          <p className="text-lg text-muted-foreground mb-6">{attributes.location}</p>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Property Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {attributes.bedrooms && (
                  <div>
                    <p className="text-sm text-muted-foreground">Bedrooms</p>
                    <p className="text-lg font-semibold">{attributes.bedrooms}</p>
                  </div>
                )}
                {attributes.bathrooms && (
                  <div>
                    <p className="text-sm text-muted-foreground">Bathrooms</p>
                    <p className="text-lg font-semibold">{attributes.bathrooms}</p>
                  </div>
                )}
                {attributes.area && (
                  <div>
                    <p className="text-sm text-muted-foreground">Area</p>
                    <p className="text-lg font-semibold">{attributes.area} sqft</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-line">{attributes.description}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
```

### 9.7 Update Next.js Config for Images

Update `next.config.ts`:

```typescript
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
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
        hostname: '*.supabase.co',
        pathname: '/storage/**',
      },
    ],
  },
};

export default nextConfig;
```

---

## Step 10: GitHub Repository Setup

### 10.1 Create .gitignore

Ensure `.gitignore` includes:

```
# Dependencies
node_modules/
/.pnp
.pnp.js

# Testing
/coverage

# Next.js
/.next/
/out/

# Production
/build

# Misc
.DS_Store
*.pem

# Debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Local env files
.env*.local
.env

# Vercel
.vercel

# Strapi
strapi/.tmp
strapi/build
strapi/dist
strapi/.cache
strapi/.env
strapi/exports
```

### 10.2 Create README.md

Create `README.md`:

```markdown
# Toplix Property Listings

A modern property listing application built with Next.js, Strapi, and Supabase.

## Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Strapi CMS
- **Database**: Supabase (PostgreSQL)
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+
- Supabase account
- Git

### Installation

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables (see `.env.example`)
4. Run Strapi: `cd strapi && npm run develop`
5. Run Next.js: `npm run dev`

## License

MIT
```

### 10.3 Initial Commit and Push

```bash
git add .
git commit -m "Initial commit: Next.js + Strapi + Supabase setup"
git branch -M main
```

### 10.4 Create GitHub Repository

1. Go to [GitHub](https://github.com/new)
2. Create a new repository named `toplix-new`
3. **Don't** initialize with README, .gitignore, or license
4. Copy the repository URL

### 10.5 Push to GitHub

```bash
git remote add origin https://github.com/YOUR_USERNAME/toplix-new.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username.

---

## Step 11: Vercel Deployment

### 11.1 Deploy Next.js Frontend

1. Go to [Vercel](https://vercel.com/)
2. Click **"Add New..."** → **"Project"**
3. Import your GitHub repository
4. Configure project:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./` (root)
5. Add Environment Variables:
   - `NEXT_PUBLIC_STRAPI_API_URL`: Your production Strapi URL (we'll update this)
   - `STRAPI_API_TOKEN`: (Optional, for protected routes)
6. Click **"Deploy"**

### 11.2 Deploy Strapi to Vercel

Strapi needs to run on a server. Options:

**Option A: Deploy Strapi to Railway/Render/Heroku**

1. Create account on [Railway](https://railway.app/) or [Render](https://render.com/)
2. Connect GitHub repository
3. Set root directory to `/strapi`
4. Add environment variables from Strapi `.env`
5. Deploy

**Option B: Run Strapi Locally (Development)**

For development, you can run Strapi locally while deploying Next.js to Vercel.

### 11.3 Update Environment Variables

Once Strapi is deployed, update Vercel environment variables:

1. Go to Vercel Project → **Settings** → **Environment Variables**
2. Update `NEXT_PUBLIC_STRAPI_API_URL` to your production Strapi URL
3. Redeploy

---

## Step 12: Publishing Your First Property

### 12.1 Access Strapi Admin

1. Open your Strapi admin panel (local or production)
2. Log in with your admin credentials

### 12.2 Create Your First Property

1. Go to **Content Manager** → **Property**
2. Click **"Create new entry"**
3. Fill in the form:
   - **Title**: "Beautiful Modern Apartment"
   - **Description**: "Spacious 2-bedroom apartment in the heart of the city..."
   - **Price**: 250000
   - **Location**: "123 Main Street, New York, NY"
   - **Bedrooms**: 2
   - **Bathrooms**: 1
   - **Area**: 1200
   - **Status**: "For Sale"
   - **Slug**: (auto-generated from title)
   - **Images**: Upload property images
4. Click **"Save"**
5. Click **"Publish"**

### 12.3 View Your Property

1. Go to your Vercel deployment URL
2. You should see your property listed on the homepage
3. Click on it to see the full details page

---

## Troubleshooting

### Strapi Connection Issues

- Verify database credentials in Strapi `.env`
- Check Supabase database is running
- Ensure SSL is enabled for Supabase connection

### Next.js Not Showing Properties

- Check `NEXT_PUBLIC_STRAPI_API_URL` is correct
- Verify Strapi permissions for Public role
- Check browser console for errors

### Image Display Issues

- Ensure `next.config.ts` has correct image domains
- Check image URLs are accessible
- Verify Strapi file upload plugin is configured

---

## Next Steps

- Add authentication
- Implement property search/filtering
- Add user favorites
- Create admin dashboard
- Add property comparison feature
- Implement contact forms

---

## Support

For issues or questions:
- Check [Next.js Documentation](https://nextjs.org/docs)
- Check [Strapi Documentation](https://docs.strapi.io)
- Check [Supabase Documentation](https://supabase.com/docs)

---

**Congratulations!** 🎉 You've successfully set up a full-stack property listing application and published your first property on Vercel!

