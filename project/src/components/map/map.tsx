import {useRef, useEffect} from 'react';
import {Icon, Marker} from 'leaflet';
import {City} from '../../types/city';
import {Offer} from '../../types/offer';
import {URL_MARKER_DEFAULT} from '../../const';
import useMap from '../../hooks/useMap';
import 'leaflet/dist/leaflet.css';

type MapProps = {
  mapCity: City | undefined;
  offers: Offer[];
};

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

function Map(props: MapProps): JSX.Element {
  const {mapCity, offers} = props;

  const mapRef = useRef(null);
  const map = useMap(mapRef, mapCity);

  useEffect(() => {
    const markers: Marker[] = [];

    if (map && mapCity) {
      offers.forEach((offer) => {
        const marker = new Marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude,
        });

        markers.push(marker);

        marker
          .setIcon(defaultCustomIcon)
          .addTo(map);
      });

      map.setView({
        lat: mapCity.lat,
        lng: mapCity.lng,
      });
    }

    return () => {
      markers.forEach((marker) => {marker.remove();});
    };

  }, [map, offers, mapCity]);

  return <div style={{height: '100%'}} ref={mapRef}></div>;
}

export default Map;
