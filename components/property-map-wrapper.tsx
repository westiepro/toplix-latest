'use client';

import dynamic from 'next/dynamic';
import 'mapbox-gl/dist/mapbox-gl.css';

// Wrap the actual map component in a dynamic import
export const PropertyMap = dynamic(
  () => import('./property-map-internal').then((mod) => mod.default),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full bg-muted flex items-center justify-center rounded-lg">
        <p className="text-muted-foreground">Loading map...</p>
      </div>
    ),
  }
);

