import {useEffect, useState, MutableRefObject, useRef} from 'react';
import {Map, TileLayer} from 'leaflet';
import {City} from '../types/city';

function useMap(
  mapRef: MutableRefObject<HTMLElement | null>,
  mapCity: City
): Map | null {
  const [map, setMap] = useState<Map | null>(null);
  const isRef = useRef<boolean>(false);

  useEffect(() => {
    if (mapRef.current !== null && !isRef.current) {
      const instance = new Map(mapRef.current, {
        center: {
          lat: mapCity.lat,
          lng: mapCity.lng,
        },
        zoom: 10
      });

      const layer = new TileLayer(
        'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        }
      );

      instance.addLayer(layer);

      setMap(instance);
      isRef.current = true;
    }

    return () => {
      mapRef.current = null;
    };
  }, [mapRef, mapCity]);

  return map;
}

export default useMap;
