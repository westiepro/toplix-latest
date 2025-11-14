import { getProperties } from '@/lib/strapi';
import { RentPageClient } from './rent-client';

export default async function RentPage() {
  // Filter properties with "For Rent" status
  const allProperties = await getProperties();
  const rentProperties = allProperties.filter(
    (property) => (property.Listing_Type || property.Listing_Status) === 'For Rent'
  );

  return <RentPageClient properties={rentProperties} />;
}

