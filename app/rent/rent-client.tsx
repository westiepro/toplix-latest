'use client';

import { useState, useMemo } from 'react';
import { PropertyCard } from '@/components/property-card';
import { PropertyMap } from '@/components/property-map-wrapper';
import { Property } from '@/lib/strapi';

interface RentPageClientProps {
  properties: Property[];
}

interface ViewportBounds {
  north: number;
  south: number;
  east: number;
  west: number;
}

export function RentPageClient({ properties }: RentPageClientProps) {
  const [selectedPropertyId, setSelectedPropertyId] = useState<number | undefined>();
  const [viewportBounds, setViewportBounds] = useState<ViewportBounds | null>(null);

  const handlePropertyClick = (property: Property) => {
    setSelectedPropertyId(property.id);
  };

  const handleMarkerClick = (property: Property) => {
    setSelectedPropertyId(property.id);
  };

  const handleViewportChange = (bounds: ViewportBounds) => {
    setViewportBounds(bounds);
  };

  // Filter properties based on viewport bounds
  const visibleProperties = useMemo(() => {
    if (!viewportBounds) {
      return properties; // Show all properties initially
    }

    return properties.filter((property) => {
      if (!property.Latitude || !property.Longitude) return false;
      
      const lat = Number(property.Latitude);
      const lng = Number(property.Longitude);
      
      if (isNaN(lat) || isNaN(lng)) return false;

      // Check if property is within viewport bounds
      // Handle longitude wrap-around (e.g., if west > east, map crosses dateline)
      if (viewportBounds.west <= viewportBounds.east) {
        // Normal case: no wrap-around
        return (
          lat >= viewportBounds.south &&
          lat <= viewportBounds.north &&
          lng >= viewportBounds.west &&
          lng <= viewportBounds.east
        );
      } else {
        // Wrap-around case: map crosses dateline
        return (
          lat >= viewportBounds.south &&
          lat <= viewportBounds.north &&
          (lng >= viewportBounds.west || lng <= viewportBounds.east)
        );
      }
    });
  }, [properties, viewportBounds]);

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Properties for Rent</h1>
        <p className="text-muted-foreground">
          Find your perfect rental property
        </p>
      </div>

      {properties.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">
            No properties for rent available yet. Check back soon!
          </p>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-200px)]">
          {/* Property Cards - 55% */}
          <div className="lg:w-[55%] flex flex-col">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Showing {visibleProperties.length} of {properties.length} properties
              </p>
            </div>
            <div className="flex-1 overflow-y-auto">
              {visibleProperties.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">
                    No properties visible in the current map view. Pan or zoom to see more.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pr-2">
                  {visibleProperties.map((property) => (
                    <PropertyCard
                      key={property.id}
                      property={property}
                      onClick={handlePropertyClick}
                      isSelected={selectedPropertyId === property.id}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Map - 45% */}
          <div className="lg:w-[45%] lg:sticky lg:top-8 h-[500px] lg:h-full">
            <PropertyMap
              properties={properties}
              selectedPropertyId={selectedPropertyId}
              onMarkerClick={handleMarkerClick}
              onViewportChange={handleViewportChange}
            />
          </div>
        </div>
      )}
    </main>
  );
}

