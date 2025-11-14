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

