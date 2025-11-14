import { getProperties } from '@/lib/strapi';
import { BuyPageClient } from './buy-client';

export default async function BuyPage() {
  // Filter properties with "For Sale" status
  const allProperties = await getProperties();
  const buyProperties = allProperties.filter(
    (property) => (property.Listing_Type || property.Listing_Status) === 'For Sale'
  );

  return <BuyPageClient properties={buyProperties} />;
}

