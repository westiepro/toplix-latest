import axios from 'axios';

const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';

export const strapiClient = axios.create({
  baseURL: `${strapiUrl}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 second timeout
});

export interface Property {
  id: number;
  documentId: string;
  Title: string;
  Description: string;
  Price: number;
  Location?: string;
  Bedrooms?: number;
  Bathrooms?: number;
  Area?: number;
  Listing_Status?: string; // Legacy field name
  Listing_Type?: string; // New field name
  Current_Status?: string;
  Slug: string;
  Property_Type?: string;
  Latitude?: number | string;
  Longitude?: number | string;
  Images?: Array<{
    id: number;
    documentId: string;
    name: string;
    alternativeText?: string | null;
    url: string;
    formats?: {
      large?: { url: string };
      medium?: { url: string };
      small?: { url: string };
      thumbnail?: { url: string };
    };
  }>;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}

export async function getProperties() {
  try {
    console.log('Fetching properties from:', `${strapiUrl}/api/properties`);
    const response = await strapiClient.get('/properties?populate=Images');
    console.log('API Response received:', response.status);
    
    // Strapi v5 returns data in flat format
    const properties = response.data.data as Property[];
    console.log('Properties found:', properties.length);
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return properties.map((prop: any) => {
      console.log('Property Images:', prop.Images);
      return {
        ...prop,
        // Map Images array to include full URLs
        Images: prop.Images?.map((img: any) => {
          let imageUrl = img.url || '';
          if (imageUrl && !imageUrl.startsWith('http')) {
            imageUrl = `${strapiUrl}${imageUrl.startsWith('/') ? '' : '/'}${imageUrl}`;
          }
          return {
            ...img,
            url: imageUrl,
          };
        }),
      };
    }) as Property[];
  } catch (error: any) {
    // Enhanced error logging
    console.error('Error fetching properties:', error);
    
    if (error.code === 'ECONNREFUSED' || error.code === 'ERR_NETWORK') {
      console.error('❌ Cannot connect to Strapi. Is it running at', strapiUrl, '?');
      console.error('Make sure Strapi is running: cd strapi && npm run develop');
    } else if (error.response) {
      console.error('❌ Strapi API Error:', error.response.status, error.response.statusText);
      console.error('Response data:', error.response.data);
    } else if (error.request) {
      console.error('❌ No response from Strapi:', error.request);
    } else if (error.cause) {
      // Handle AggregateError
      console.error('❌ AggregateError causes:', error.cause);
      if (Array.isArray(error.cause)) {
        error.cause.forEach((cause: any, index: number) => {
          console.error(`  Error ${index + 1}:`, cause.message || cause);
        });
      } else if (error.cause.message) {
        console.error('  Cause:', error.cause.message);
      }
    }
    
    return [];
  }
}

export async function getPropertyBySlug(slug: string) {
  try {
    console.log('Fetching property with slug:', slug);
    const apiUrl = `/properties?filters[Slug][$eq]=${slug}&populate=Images`;
    console.log('API URL:', `${strapiUrl}/api${apiUrl}`);
    
    const response = await strapiClient.get(apiUrl);
    console.log('API Response status:', response.status);
    
    const properties = response.data.data as Property[];
    console.log('Properties found:', properties.length);
    
    if (properties.length === 0) {
      console.log('No property found with slug:', slug);
      return null;
    }
    
    const property = properties[0] as any;
    console.log('Property found:', property.Title, 'Slug:', property.Slug);
    
    // Map Images array to include full URLs
    return {
      ...property,
      Images: property.Images?.map((img: any) => {
        let imageUrl = img.url || '';
        if (imageUrl && !imageUrl.startsWith('http')) {
          imageUrl = `${strapiUrl}${imageUrl.startsWith('/') ? '' : '/'}${imageUrl}`;
        }
        return {
          ...img,
          url: imageUrl,
        };
      }),
    } as Property;
  } catch (error: any) {
    console.error('Error fetching property:', error);
    if (error.code === 'ECONNREFUSED' || error.code === 'ERR_NETWORK') {
      console.error('❌ Cannot connect to Strapi at', strapiUrl);
    } else if (error.response) {
      console.error('❌ API Error:', error.response.status, error.response.data);
    } else if (error.cause) {
      console.error('❌ AggregateError causes:', error.cause);
      if (Array.isArray(error.cause)) {
        error.cause.forEach((cause: any, index: number) => {
          console.error(`  Error ${index + 1}:`, cause.message || cause);
        });
      }
    }
    return null;
  }
}
