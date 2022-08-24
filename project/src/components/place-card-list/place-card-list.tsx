import PlaceCard from '../place-card/place-card';
import {useAppDispatch} from '../../hooks';
import {selectOffer} from '../../store/offers-data/offers-data';
import {PLACE_CARD_CLASS_NAME, PlaceCardType} from '../../const';
import {Offer} from '../../types/offer';

type PlaceCardListProps = {
    typeComponent: PlaceCardType;
    offers: Offer[];
  }

function PlaceCardList ({offers, typeComponent, }:PlaceCardListProps): JSX.Element {
  const dispatch = useAppDispatch();

  const setIdPlaceCard = (id: number) => {
    dispatch(selectOffer({selectedOfferId: id}));
  };

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
