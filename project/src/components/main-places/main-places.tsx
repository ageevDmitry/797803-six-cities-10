import {useAppSelector} from '../../hooks';
import {PlaceCardType} from '../../const';
import {getFilterOffers, getSortOffers} from '../../utils';
import SortPlaceCard from '../sort-place-card/sort-place-card';
import PlaceCardList from '../place-card-list/place-card-list';
import Map from '../map/map';
import {Fragment} from 'react';
import {getFilterType, getMapCity, getSelectedOffer, getSortType} from '../../store/offers-ui/selectors';
import {getOffers} from '../../store/offers-data/selectors';

function MainPlaces (): JSX.Element {

  const selectedCity = useAppSelector(getFilterType);
  const offers = useAppSelector(getOffers);
  const mapCity = useAppSelector(getMapCity);
  const selectedOffer = useAppSelector(getSelectedOffer);
  const filterType = useAppSelector(getFilterType);
  const sortType = useAppSelector(getSortType);
  const filteredOffers = getFilterOffers(offers, filterType);
  const sortedOffers = getSortOffers(filteredOffers, sortType.type);

  return (
    <Fragment>
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">{sortedOffers.length} places to stay in {selectedCity}</b>
        <SortPlaceCard/>
        <PlaceCardList
          offers = {sortedOffers}
          typeComponent = {PlaceCardType.Cities}
        />
      </section>
      <div className="cities__right-section">
        <section className="cities__map map">
          <Map
            mapCity = {mapCity}
            offers = {sortedOffers}
            selectedOffer = {selectedOffer}
          />
        </section>
      </div>
    </Fragment>
  );
}

export default MainPlaces;
