import {useAppSelector} from '../../hooks';
import {PlaceCardType} from '../../const';
import SortPlaceCard from '../sort-place-card/sort-place-card';
import PlaceCardList from '../place-card-list/place-card-list';
import Map from '../map/map';
import {Fragment} from 'react';
import {getMapCity, getSortedOffers} from '../../store/offers-ui/selectors';
import {getSelectedOffer} from '../../store/offers-data/selectors';

function MainPlaces (): JSX.Element {

  const selectedCity = useAppSelector(getMapCity);
  const offers = useAppSelector(getSortedOffers);
  const mapCity = useAppSelector(getMapCity);
  const selectedOffer = useAppSelector(getSelectedOffer);

  return (
    <Fragment>
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">{offers.length} places to stay in {selectedCity?.title}</b>
        <SortPlaceCard/>
        <PlaceCardList
          offers = {offers}
          typeComponent = {PlaceCardType.Cities}
        />
      </section>
      <div className="cities__right-section">
        <section className="cities__map map">
          <Map
            mapCity = {mapCity}
            offers = {offers}
            selectedOffer = {selectedOffer}
          />
        </section>
      </div>
    </Fragment>
  );
}

export default MainPlaces;
