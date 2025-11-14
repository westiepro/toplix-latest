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

