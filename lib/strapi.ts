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

