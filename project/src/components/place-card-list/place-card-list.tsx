import {useState} from 'react';
import PlaceCard from '../place-card/place-card';
import {PLACE_CARDS_COUNT, START_PLACE_CARD_ID, PLACE_CARD_CLASS_NAME, PlaceCardType} from '../../const';
import {Offer} from '../../types/offer';

type PlaceCardListProps = {
    typeComponent: PlaceCardType;
    offers: Offer[];
  }

function PlaceCardList ({typeComponent, offers}:PlaceCardListProps): JSX.Element {
  const [, setIdPlaceCard] = useState(START_PLACE_CARD_ID);

  return (
    <div className={PLACE_CARD_CLASS_NAME[typeComponent]}>
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
