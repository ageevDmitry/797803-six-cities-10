import SortPlaceCard from '../sort-place-card/sort-place-card';
import PlaceCardList from '../place-card-list/place-card-list';
import Map from '../map/map';
import {PlaceCardType} from '../../const';
import {useAppSelector} from '../../hooks';

function MainPlaces (): JSX.Element {

  const selectedCity = useAppSelector((state) => state.filterType);
  const offers = useAppSelector((state) => state.sortedOffers);
  const mapCity = useAppSelector((state) => state.mapCity);
  const selectedOffer = useAppSelector((state) => state.selectedOffer);

  return (
    <div className="cities__places-container container">
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">{offers.length} places to stay in {selectedCity}</b>
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
    </div>
  );
}

export default MainPlaces;
