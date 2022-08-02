import {useState} from 'react';
import PlaceCard from '../place-card/place-card';
import {START_PLACE_CARD_ID, PLACE_CARD_CLASS_NAME, PlaceCardType} from '../../const';
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
        offers
          .map((offer) => (
            <PlaceCard
              key = {offer.id}
              typeComponent = {typeComponent}
              offer = {offer}
              onMouseEnterPlaceCard = {setIdPlaceCard}
            />) )
      }
    </div>
  );
}

export default PlaceCardList;
