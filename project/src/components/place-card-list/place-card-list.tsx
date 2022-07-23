import {useState} from 'react';
import PlaceCard from '../place-card/place-card';
import {PLACE_CARDS_COUNT, START_PLACE_CARD_ID, PlaceCardType} from '../../const';
import {Offer} from '../../types/offer';

type PlaceCardListProps = {
    typeComponent: PlaceCardType;
    offers: Offer[];
  }

const getComponentClassName = (typeComponent: PlaceCardType) => {
  switch (typeComponent) {
    case PlaceCardType.Cities:
      return 'cities__places-list places__list tabs__content';
    case PlaceCardType.Favorites:
      return 'favorites__places';
    case PlaceCardType.NearPlaces:
      return 'near-places__list places__list';
  }
};

function PlaceCardList ({typeComponent, offers}:PlaceCardListProps): JSX.Element {
  const [, setIdPlaceCard] = useState(START_PLACE_CARD_ID);

  return (
    <div className={getComponentClassName(typeComponent)}>
      {
        Array.from(Array(PLACE_CARDS_COUNT)
          .keys())
          .map((item) => (
            <PlaceCard
              key = {offers[item].id}
              typeComponent = {typeComponent}
              offer = {offers[item]}
              onMouseEnterPlaceCard = {setIdPlaceCard}
            />) )
      }
    </div>
  );
}

export default PlaceCardList;
