import Link from 'next/link';
import Image from 'next/image';
import { Bed, Bath } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Property } from '@/lib/strapi';

interface PropertyCardProps {
  property: Property;
  onClick?: (property: Property) => void;
  isSelected?: boolean;
}

export function PropertyCard({ property, onClick, isSelected }: PropertyCardProps) {
  const imageUrl = property.Images?.[0]?.url || '/placeholder-property.jpg';
  // Convert sqft to square meters (1 sqft = 0.092903 m²)
  const areaInMeters = property.Area ? Math.round(property.Area * 0.092903) : null;

  const handleClick = () => {
    onClick?.(property);
  };

  return (
    <Link 
      href={`/properties/${property.Slug}`} 
      className="block h-full"
      onClick={handleClick}
    >
      <Card className={`overflow-hidden hover:shadow-lg transition-all cursor-pointer h-full flex flex-col hover:scale-[1.02] p-0 ${
        isSelected 
          ? 'border-primary border-2 shadow-lg scale-[1.02]' 
          : 'hover:border-primary/20'
      }`}>
        <div className="relative h-72 w-full">
          <Image
            src={imageUrl}
            alt={property.Title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <Badge className="absolute top-2 right-2" variant="secondary">
            {property.Listing_Type || property.Listing_Status || 'Available'}
          </Badge>
        </div>
        <div className="px-4 pt-1.5 pb-0">
          <p className="text-2xl font-bold text-primary">
            €{property.Price.toLocaleString()}
          </p>
        </div>
        <CardHeader className="px-4 pt-0.5 pb-0.5">
          <CardTitle className="text-xl hover:text-primary transition-colors leading-tight">
            {property.Title}
          </CardTitle>
          {property.Location && (
            <p className="text-sm text-muted-foreground mt-0.5 leading-tight">{property.Location}</p>
          )}
        </CardHeader>
        <CardContent className="flex-1 px-4 pt-0.5 pb-3">
          <div className="flex gap-3 items-center text-sm text-muted-foreground">
            {property.Bedrooms && (
              <span className="flex items-center gap-1.5">
                <Bed className="h-4 w-4" />
                <span>{property.Bedrooms}</span>
              </span>
            )}
            {property.Bathrooms && (
              <span className="flex items-center gap-1.5">
                <Bath className="h-4 w-4" />
                <span>{property.Bathrooms}</span>
              </span>
            )}
            {areaInMeters && <span>{areaInMeters} m²</span>}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

