import mapboxgl from 'mapbox-gl';
import { useEffect, useState } from 'react';

const getMapBoxStyleUrl = (styleId: string) =>
  `mapbox://styles/tastiestvince/${styleId}`;

interface UseMapParams {
  lat: number;
  lng: number;
  zoom?: number;
  pitch?: number;
  markers?: [{ lat: number; lng: number; size?: number }];
  hideControls?: boolean;
}

interface UseMapOptions {
  /** Resize when anything in here changes. Naturally, on window width change.  */
  resizeDeps?: Array<any>;

  /** MapBox access token. If not given, environment variables are used. */
  accessToken?: string;

  /** MapBox style ID. If not given, environment variables are used. */
  styleId?: string;
}

/**
 * NOTE!
 * When consuming this hook, ensure you
 *    `import mapbox-gl/dist/mapbox-gl.css`
 * in the consuming project file.
 *
 * You should also have mapbox-gl in your dependencies.
 */
export const useMap = (
  container: string,
  params: UseMapParams,
  options?: UseMapOptions
) => {
  const {
    resizeDeps = [],
    accessToken = process.env.NEXT_PUBLIC_MAP_BOX_ACCESS_TOKEN,
    styleId = process.env.NEXT_PUBLIC_MAP_BOX_STYLE_ID,
  } = options ?? {};

  console.log('useMap ➡️ accessToken:', accessToken);
  console.log('useMap ➡️ styleId:', styleId);

  const [map, setMap] = useState<mapboxgl.Map | null>(null);
  const pitch = params.pitch ?? 33;
  const zoom = params.zoom ?? 10;

  // Initialize map
  useEffect(() => {
    if (!accessToken || !styleId) return;

    mapboxgl.accessToken = accessToken;
    const _map = new mapboxgl.Map({
      style: getMapBoxStyleUrl(styleId),
      center: [params.lng, params.lat], // starting position [lng, lat]
      container,
      zoom,
      pitch,
    });

    setMap(_map);

    // Add controls
    if (!params?.hideControls) {
      _map.addControl(new mapboxgl.NavigationControl(), 'top-right');
    }

    // Add marker(s) to the map
    if (params.markers) {
      params.markers.forEach((marker) => {
        const size = marker.size ?? 20;

        const el = document.createElement('div');
        el.className = 'marker';

        // Depends on the aspect ratio of the image
        el.style.width = `${size / 1.2205}px`;
        el.style.height = `${size}px`;
        el.style.cursor = 'pointer';
        el.style.backgroundSize = 'cover';
        el.style.backgroundImage = "url('/assets/ui/location-brand-icon.png')";

        new mapboxgl.Marker(el).setLngLat([marker.lng, marker.lat]).addTo(_map);
      });
    }

    return () => _map.remove();
  }, []);

  // Resize map for all dimensions
  useEffect(() => {
    map?.resize?.();
  }, [map, ...resizeDeps]);

  // Update coordinates and orientation from parent
  useEffect(() => {
    if (map) {
      map.setCenter([params.lng, params.lat]);
      map.setCenter([params.lng, params.lat]);
      map.setZoom(zoom);
      map.setPitch(pitch);
    }
  }, [map, params.lng, params.lat, params.zoom, params.pitch]);

  return { map, zoom, pitch };
};
