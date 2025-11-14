# Complete Step-by-Step Guide: First Property to Vercel Deployment

This guide takes you from creating your first property to publishing on Vercel.

---

## Part 1: Create Property Content Type in Strapi

### Step 1.1: Access Strapi Admin

1. Open your browser
2. Go to: `http://localhost:1337/admin`
3. Log in with your admin credentials (or create admin user if first time)

### Step 1.2: Create Property Content Type

1. In the left sidebar, click **"Content-Type Builder"** (document icon)
2. Click **"+ Create new collection type"** button (top right)
3. **Display name**: Enter `Property`
4. Click **"Continue"**
5. Click **"Continue"** again (to confirm)

### Step 1.3: Add Fields to Property

Click **"Add another field"** for each field below:

**1. Title (Text - Short text)**
   - Click **"Text"** → Select **"Short text"**
   - **Name**: `title`
   - **Required**: ✅ Yes
   - Click **"Finish"**

**2. Description (Text - Long text)**
   - Click **"Text"** → Select **"Long text"**
   - **Name**: `description`
   - **Required**: ✅ Yes
   - Click **"Finish"**

**3. Price (Number - Decimal)**
   - Click **"Number"** → Select **"Decimal"**
   - **Name**: `price`
   - **Required**: ✅ Yes
   - Click **"Finish"**

**4. Location (Text - Short text)**
   - Click **"Text"** → Select **"Short text"**
   - **Name**: `location`
   - **Required**: ✅ Yes
   - Click **"Finish"**

**5. Bedrooms (Number - Integer)**
   - Click **"Number"** → Select **"Integer"**
   - **Name**: `bedrooms`
   - **Required**: ❌ No
   - Click **"Finish"**

**6. Bathrooms (Number - Integer)**
   - Click **"Number"** → Select **"Integer"**
   - **Name**: `bathrooms`
   - **Required**: ❌ No
   - Click **"Finish"**

**7. Area (Number - Integer)**
   - Click **"Number"** → Select **"Integer"**
   - **Name**: `area`
   - **Description**: "Area in square feet"
   - **Required**: ❌ No
   - Click **"Finish"**

**8. Images (Media - Multiple media)**
   - Click **"Media"** → Select **"Multiple media"**
   - **Name**: `images`
   - **Required**: ❌ No
   - Click **"Finish"**

**9. Status (Enumeration)**
   - Click **"Enumeration"**
   - **Name**: `status`
   - **Values** (one per line):
     ```
     For Sale
     For Rent
     Sold
     ```
   - **Default value**: `For Sale`
   - **Required**: ✅ Yes
   - Click **"Finish"**

**10. Slug (UID)**
   - Click **"UID"**
   - **Name**: `slug`
   - **Attached field**: Select `title`
   - **Required**: ✅ Yes
   - Click **"Finish"**

### Step 1.4: Save Content Type

1. Scroll to the top
2. Click **"Save"** button
3. Wait for Strapi to restart (shows "Server is restarting...")
4. You'll see: ✅ **"The API was successfully created"**

---

## Part 2: Configure Permissions

### Step 2.1: Set Public Permissions

1. In left sidebar, click **"Settings"** (gear icon)
2. Under **"Users & Permissions Plugin"**, click **"Roles"**
3. Click **"Public"** role
4. Under **"Property"** section, check:
   - ✅ `find`
   - ✅ `findOne`
5. Click **"Save"** (top right)

This allows your Next.js frontend to read property data.

---

## Part 3: Create Your First Property

### Step 3.1: Create Property Entry

1. In left sidebar, click **"Content Manager"**
2. Click **"Collection Types"** → **"Property"**
3. Click **"+ Create new entry"** button
4. Fill in the form:

   - **Title**: `Beautiful Modern Apartment`
   - **Description**: 
     ```
     Spacious 2-bedroom apartment in the heart of the city. 
     Features modern amenities, large windows, and updated kitchen.
     Perfect for families or professionals.
     ```
   - **Price**: `250000`
   - **Location**: `123 Main Street, New York, NY 10001`
   - **Bedrooms**: `2`
   - **Bathrooms**: `1`
   - **Area**: `1200`
   - **Status**: `For Sale` (from dropdown)
   - **Slug**: (auto-generated from title, or edit if needed)
   - **Images**: Click **"Add an asset"** → Upload property images (optional)

5. Click **"Save"** button (top right)
6. Click **"Publish"** button (top right)
7. ✅ Your property is now published!

---

## Part 4: Commit Strapi Schema to Git

### Step 4.1: Commit Schema Changes

```bash
cd /Users/christian/Desktop/toplix-new

# Add the Property content type schema
git add strapi/src/api/property/

# Commit
git commit -m "Add Property content type to Strapi"

# Push to GitHub
git push origin main
```

**Note**: Strapi Cloud will automatically deploy this schema when you push to Git.

---

## Part 5: Build Next.js Frontend

### Step 5.1: Create Strapi Client Utility

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

### Step 5.2: Create Property Card Component

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

### Step 5.3: Update Home Page

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

### Step 5.4: Create Property Detail Page

Create `app/properties/[slug]/page.tsx`:

```typescript
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getPropertyBySlug } from '@/lib/strapi';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

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
        <Link href="/" className="text-primary hover:underline">
          ← Back to listings
        </Link>
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

### Step 5.5: Install Axios

```bash
cd /Users/christian/Desktop/toplix-new
npm install axios
```

---

## Part 6: Configure Environment Variables

### Step 6.1: Create .env.local for Local Development

Create `.env.local` in the root directory:

```bash
NEXT_PUBLIC_STRAPI_API_URL=http://localhost:1337
```

### Step 6.2: Test Locally

```bash
npm run dev
```

Visit `http://localhost:3000` - you should see your property!

---

## Part 7: Deploy to Vercel

### Step 7.1: Configure Strapi Cloud (Required)

Before deploying Next.js, you need Strapi Cloud running:

1. **Go to Strapi Cloud Dashboard**: https://cloud.strapi.io/
2. **Your project should already be deployed** (from earlier setup)
3. **Get your Strapi Cloud URL**: e.g., `https://your-project.strapi.cloud`
4. **Configure Supabase in Strapi Cloud**:
   - Go to **Settings** → **Environment Variables**
   - Add the same Supabase credentials:
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
   - Add Strapi secrets (generate using `node generate-keys.js`)
5. **Ensure Property content type exists** in Strapi Cloud (should be auto-deployed from Git)

### Step 7.2: Push Code to GitHub

```bash
cd /Users/christian/Desktop/toplix-new

# Add all new files
git add .

# Commit
git commit -m "Add Property frontend components and pages"

# Push
git push origin main
```

### Step 7.3: Deploy to Vercel

1. **Go to Vercel**: https://vercel.com/
2. **Click "Add New..." → "Project"**
3. **Import Git Repository**:
   - Select `toplix-latest` (your GitHub repo)
   - Click "Import"

4. **Configure Project**:
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `./` (root)

5. **Add Environment Variables**:
   - Click "Environment Variables"
   - Add:
     - **Key**: `NEXT_PUBLIC_STRAPI_API_URL`
     - **Value**: `https://your-project.strapi.cloud` (your actual Strapi Cloud URL)
   - Click "Add"

6. **Deploy**:
   - Click "Deploy"
   - Wait for deployment (1-2 minutes)
   - You'll get a URL like: `https://toplix-latest.vercel.app`

### Step 7.4: Update Strapi Cloud CORS

1. **Go to Strapi Cloud Dashboard**
2. **Settings** → **API** → **CORS** (or Security)
3. **Add your Vercel URL**:
   - `https://toplix-latest.vercel.app`
   - `https://*.vercel.app` (for all Vercel deployments)
4. **Save**

### Step 7.5: Verify Deployment

1. **Visit your Vercel URL**: e.g., `https://toplix-latest.vercel.app`
2. **You should see your property listing!**
3. **Click on a property** to see the detail page
4. ✅ **Success!**

---

## Troubleshooting

### Properties not showing on Vercel

- Check `NEXT_PUBLIC_STRAPI_API_URL` in Vercel environment variables
- Ensure Strapi Cloud CORS includes your Vercel URL
- Check Strapi Cloud is running and accessible
- Verify Property permissions are set to Public

### Images not loading

- Check `next.config.ts` has Strapi Cloud image domains
- Verify image URLs in browser DevTools
- Ensure images are uploaded and published in Strapi

### 404 Errors

- Check property slugs match
- Verify content is published (not draft) in Strapi
- Check API endpoints are accessible

---

## Summary

✅ **Created Property content type in Strapi**
✅ **Created first property entry**
✅ **Built Next.js frontend**
✅ **Deployed to Vercel**
✅ **Connected to Strapi Cloud**

**Your site is live!** 🎉

