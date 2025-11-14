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
