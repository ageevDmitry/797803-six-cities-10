import SortPlaceCard from '../sort-place-card/sort-place-card';
import PlaceCardList from '../place-card-list/place-card-list';
import Map from '../map/map';
import {PlaceCardType} from '../../const';
import {useAppSelector} from '../../hooks';
import {getFilterOffers, getSortOffers} from '../../store/utils';

function MainPlaces (): JSX.Element {

  const selectedCity = useAppSelector((state) => state.filterType);
  const offers = useAppSelector((state) => state.offers);
  const mapCity = useAppSelector((state) => state.mapCity);
  const selectedOffer = useAppSelector((state) => state.selectedOffer);
  const filterType = useAppSelector((state) => state.filterType);
  const sortType = useAppSelector((state) => state.sortType.type);
  const filteredOffers = getFilterOffers(offers, filterType);
  const sortedOffers = getSortOffers(filteredOffers, sortType);

  return (

    <div className="cities__places-container container">
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
    </div>
  );
}

export default MainPlaces;
