import PlaceCard from '../place-card/place-card';
import {useAppDispatch} from '../../hooks';
import {selectOffer} from '../../store/action';
import LoadingScreen from '../loading-screen/loading-screen';
import {PLACE_CARD_CLASS_NAME, PlaceCardType} from '../../const';
import {Offer} from '../../types/offer';
import {useAppSelector} from '../../hooks';

type PlaceCardListProps = {
    typeComponent: PlaceCardType;
    offers: Offer[];
  }

function PlaceCardList ({offers, typeComponent, }:PlaceCardListProps): JSX.Element {
  const {isDataLoaded} = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  const setIdPlaceCard = (id: number) => {
    dispatch(selectOffer({selectedOfferId: id}));
  };

  if (isDataLoaded) {
    return (
      <LoadingScreen />
    );
  }

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
