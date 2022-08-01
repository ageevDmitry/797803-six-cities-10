import {useAppSelector} from '../../hooks';
import PlaceCardList from '../place-card-list/place-card-list';
import Map from '../map/map';
import {Offer} from '../../types/offer';
import {PlaceCardType} from '../../const';

type MainPlacesProps = {
    offers: Offer[];
  }

function MainPlaces ({offers}: MainPlacesProps): JSX.Element {

  const chooseCity = useAppSelector((state) => state.city);
  const currentOffers = useAppSelector((state) => state.offers);
  const currentMapCity = useAppSelector((state) => state.mapCity[0]);

  return (
    <div className="cities__places-container container">
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">{currentOffers.length} places to stay in {chooseCity}</b>
        <form className="places__sorting" action="#" method="get">
          <span className="places__sorting-caption">Sort by</span>
          <span className="places__sorting-type" tabIndex={0}>
                Popular
            <svg className="places__sorting-arrow" width={7} height={4}>
              <use xlinkHref="#icon-arrow-select" />
            </svg>
          </span>
          <ul className="places__options places__options--custom places__options--opened">
            <li
              className="places__option places__option--active"
              tabIndex={0}
            >
                  Popular
            </li>
            <li className="places__option" tabIndex={0}>
                  Price: low to high
            </li>
            <li className="places__option" tabIndex={0}>
                  Price: high to low
            </li>
            <li className="places__option" tabIndex={0}>
                  Top rated first
            </li>
          </ul>
        </form>
        <PlaceCardList
          offers = {currentOffers}
          typeComponent = {PlaceCardType.Cities}
        />
      </section>
      <div className="cities__right-section">
        <section className="cities__map map">
          <Map
            city = {currentMapCity}
            offers = {currentOffers}
          />
        </section>
      </div>
    </div>
  );
}

export default MainPlaces;
