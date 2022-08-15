import {useRef, useEffect} from 'react';
import {Icon, Marker} from 'leaflet';
import {City} from '../../types/city';
import {Offer} from '../../types/offer';
import {URL_MARKER_DEFAULT, URL_MARKER_CURRENT} from '../../const';
import useMap from '../../hooks/useMap';
import 'leaflet/dist/leaflet.css';

type MapProps = {
  mapCity?: City;
  offers: Offer[];
  selectedOffer? : Offer;
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
  const {mapCity, offers, selectedOffer} = props;

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
          .setIcon(
            selectedOffer && offer.id === selectedOffer.id
              ? currentCustomIcon
              : defaultCustomIcon
          )
          .addTo(map);
      });

      if (selectedOffer) {
        map.setView({
          lat: selectedOffer.location.latitude,
          lng: selectedOffer.location.longitude,
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

  }, [map, offers, mapCity, selectedOffer]);

  return <div style={{height: '100%'}} ref={mapRef}></div>;
}

export default Map;
