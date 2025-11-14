import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getPropertyBySlug } from '@/lib/strapi';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function PropertyPage({ params }: PageProps) {
  // Await params in Next.js 16
  const { slug } = await params;
  
  console.log('Looking for property with slug:', slug);
  const property = await getPropertyBySlug(slug);

  if (!property) {
    console.log('Property not found for slug:', slug);
    notFound();
  }

  const images = property.Images || [];
  const mainImage = images[0]?.url || '/placeholder-property.jpg';

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
              alt={property.Title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          {images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {images.slice(1, 5).map((image) => (
                <div key={image.id} className="relative h-20 w-full rounded overflow-hidden">
                  <Image
                    src={image.url}
                    alt={image.alternativeText || property.Title}
                    fill
                    sizes="(max-width: 768px) 25vw, 12.5vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <Badge className="mb-4" variant="secondary">
            {property.Listing_Type || property.Listing_Status || 'Available'}
          </Badge>
          <h1 className="text-4xl font-bold mb-2">{property.Title}</h1>
          <p className="text-2xl font-bold text-primary mb-4">
            €{property.Price.toLocaleString()}
          </p>
          {property.Location && (
            <p className="text-lg text-muted-foreground mb-6">{property.Location}</p>
          )}

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Property Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {property.Bedrooms && (
                  <div>
                    <p className="text-sm text-muted-foreground">Bedrooms</p>
                    <p className="text-lg font-semibold">{property.Bedrooms}</p>
                  </div>
                )}
                {property.Bathrooms && (
                  <div>
                    <p className="text-sm text-muted-foreground">Bathrooms</p>
                    <p className="text-lg font-semibold">{property.Bathrooms}</p>
                  </div>
                )}
                {property.Area && (
                  <div>
                    <p className="text-sm text-muted-foreground">Area</p>
                    <p className="text-lg font-semibold">{Math.round(property.Area * 0.092903)} m²</p>
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
              <p className="whitespace-pre-line">{property.Description}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
