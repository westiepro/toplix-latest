'use client';

import { useEffect, useRef, useState } from 'react';
import Map, { Marker, Popup } from 'react-map-gl';
import type { MapRef } from 'react-map-gl';
import { Property } from '@/lib/strapi';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface PropertyMapProps {
  properties: Property[];
  selectedPropertyId?: number;
  onMarkerClick?: (property: Property) => void;
  onViewportChange?: (bounds: { north: number; south: number; east: number; west: number }) => void;
  initialFitBounds?: boolean;
}

function PropertyMapInternal({ 
  properties, 
  selectedPropertyId, 
  onMarkerClick, 
  onViewportChange,
  initialFitBounds = true 
}: PropertyMapProps) {
  const [popupInfo, setPopupInfo] = useState<Property | null>(null);
  const [viewport, setViewport] = useState({
    latitude: 37.12120,
    longitude: -7.64946,
    zoom: 10,
  });
  const mapRef = useRef<MapRef>(null);
  const hasInitialFit = useRef(false);

  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';

  // Filter properties with valid coordinates
  const propertiesWithCoords = properties.filter((prop) => {
    return prop.Latitude != null && prop.Longitude != null;
  }) as Array<Property & { Latitude: string | number; Longitude: string | number }>;

  // Calculate bounds to fit all properties (only once on initial load if enabled)
  useEffect(() => {
    if (initialFitBounds && propertiesWithCoords.length > 0 && mapRef.current && !hasInitialFit.current) {
      const lats = propertiesWithCoords.map((p) => Number(p.Latitude));
      const lngs = propertiesWithCoords.map((p) => Number(p.Longitude));
      
      const bounds = {
        minLat: Math.min(...lats),
        maxLat: Math.max(...lats),
        minLng: Math.min(...lngs),
        maxLng: Math.max(...lngs),
      };

      // Add padding
      const latPadding = (bounds.maxLat - bounds.minLat) * 0.1;
      const lngPadding = (bounds.maxLng - bounds.minLng) * 0.1;

      mapRef.current.fitBounds(
        [
          [bounds.minLng - lngPadding, bounds.minLat - latPadding],
          [bounds.maxLng + lngPadding, bounds.maxLat + latPadding],
        ],
        {
          padding: 50,
          duration: 1000,
        }
      );
      
      hasInitialFit.current = true;
      
      // Calculate initial bounds after fitBounds completes
      setTimeout(() => {
        if (mapRef.current) {
          const bounds = mapRef.current.getBounds();
          if (bounds && onViewportChange) {
            onViewportChange({
              north: bounds.getNorth(),
              south: bounds.getSouth(),
              east: bounds.getEast(),
              west: bounds.getWest(),
            });
          }
        }
      }, 1100);
    }
  }, [propertiesWithCoords, initialFitBounds, onViewportChange]);

  // Update viewport when map moves
  const handleMove = (evt: any) => {
    const newViewport = evt.viewState;
    setViewport(newViewport);
    
    // Calculate current bounds and notify parent
    if (mapRef.current && onViewportChange) {
      const bounds = mapRef.current.getBounds();
      if (bounds) {
        onViewportChange({
          north: bounds.getNorth(),
          south: bounds.getSouth(),
          east: bounds.getEast(),
          west: bounds.getWest(),
        });
      }
    }
  };

  // Focus on selected property
  useEffect(() => {
    if (selectedPropertyId && mapRef.current) {
      const property = propertiesWithCoords.find((p) => p.id === selectedPropertyId);
      if (property && property.Latitude && property.Longitude) {
        mapRef.current.flyTo({
          center: [Number(property.Longitude), Number(property.Latitude)],
          zoom: 14,
          duration: 1000,
        });
      }
    }
  }, [selectedPropertyId, propertiesWithCoords]);

  if (!mapboxToken) {
    return (
      <div className="w-full h-full bg-muted flex items-center justify-center rounded-lg">
        <p className="text-muted-foreground">Mapbox token not configured</p>
      </div>
    );
  }

  if (propertiesWithCoords.length === 0) {
    return (
      <div className="w-full h-full bg-muted flex items-center justify-center rounded-lg">
        <p className="text-muted-foreground">No properties with location data</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full rounded-lg overflow-hidden border">
      <Map
        ref={mapRef}
        mapboxAccessToken={mapboxToken}
        initialViewState={viewport}
        onMove={handleMove}
        style={{ width: '100%', height: '100%' }}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        dragRotate={true}
        keyboard={true}
      >
        {propertiesWithCoords.map((property) => {
          const lat = Number(property.Latitude);
          const lng = Number(property.Longitude);
          const isSelected = selectedPropertyId === property.id;

          if (isNaN(lat) || isNaN(lng)) return null;

          return (
            <Marker
              key={property.id}
              longitude={lng}
              latitude={lat}
              anchor="bottom"
              onClick={(e) => {
                e.originalEvent.stopPropagation();
                setPopupInfo(property);
                onMarkerClick?.(property);
              }}
            >
              <div
                className={`cursor-pointer transition-all ${
                  isSelected
                    ? 'scale-125 z-10'
                    : 'hover:scale-110'
                }`}
              >
                <svg
                  width="32"
                  height="40"
                  viewBox="0 0 32 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16 0C9.37258 0 4 5.37258 4 12C4 20.5 16 40 16 40C16 40 28 20.5 28 12C28 5.37258 22.6274 0 16 0Z"
                    fill={isSelected ? '#ef4444' : '#3b82f6'}
                    stroke="white"
                    strokeWidth="2"
                  />
                  <circle
                    cx="16"
                    cy="16"
                    r="6"
                    fill="white"
                  />
                </svg>
              </div>
            </Marker>
          );
        })}

        {popupInfo && popupInfo.Latitude && popupInfo.Longitude && (
          <Popup
            anchor="bottom"
            longitude={Number(popupInfo.Longitude)}
            latitude={Number(popupInfo.Latitude)}
            onClose={() => setPopupInfo(null)}
            closeOnClick={false}
            className="mapbox-popup"
          >
            <Card className="w-64 border-0 shadow-lg">
              <CardHeader className="p-3 pb-2">
                <CardTitle className="text-base font-semibold leading-tight">
                  {popupInfo.Title}
                </CardTitle>
                <p className="text-sm font-bold text-primary mt-1">
                  €{popupInfo.Price.toLocaleString()}
                </p>
              </CardHeader>
              <CardContent className="p-3 pt-0">
                {popupInfo.Location && (
                  <p className="text-xs text-muted-foreground mb-2">{popupInfo.Location}</p>
                )}
                <Button asChild size="sm" className="w-full">
                  <Link href={`/properties/${popupInfo.Slug}`}>View Details</Link>
                </Button>
              </CardContent>
            </Card>
          </Popup>
        )}
      </Map>
    </div>
  );
}

export default PropertyMapInternal;

