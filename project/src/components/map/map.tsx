import {useRef, useEffect} from 'react';
import {Icon, Marker} from 'leaflet';
import {City} from '../../types/city';
import {Offer} from '../../types/offer';
import {URL_MARKER_DEFAULT, URL_MARKER_CURRENT} from '../../const';
import useMap from '../../hooks/useMap';
import 'leaflet/dist/leaflet.css';

type MapProps = {
  mapCity?: City;
  points: Offer[];
  hoverOffer? : Offer;
};

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

function Map(props: MapProps): JSX.Element {
  const {mapCity, points, hoverOffer} = props;

  const mapRef = useRef(null);
  const map = useMap(mapRef, mapCity);

  useEffect(() => {
    const markers: Marker[] = [];

    if (map && mapCity) {
      points.forEach((point) => {
        const marker = new Marker({
          lat: point.location.latitude,
          lng: point.location.longitude,
        });

        markers.push(marker);

        marker
          .setIcon(
            hoverOffer !== undefined && point.id === hoverOffer.id
              ? currentCustomIcon
              : defaultCustomIcon
          )
          .addTo(map);
      });

      if (hoverOffer) {
        map.setView({
          lat: hoverOffer.location.latitude,
          lng: hoverOffer.location.longitude,
        });
      } else {
        map.setView({
          lat: mapCity.lat,
          lng: mapCity.lng,
        });
      }
    }

    return () => {
      markers.forEach((marker) => {marker.remove();});
    };

  }, [map, points, mapCity, selectedPoint]);

  return <div style={{height: '100%'}} ref={mapRef}></div>;
}

export default Map;
