import PlaceCardList from '../place-card-list/place-card-list';
import {Offer} from '../../types/offer';
import {CITIES, PlaceCardType} from '../../const';

type FavoritesContainerProps = {
  offers: Offer[];
}

function FavoritesContainer ({offers}: FavoritesContainerProps): JSX.Element {

  return (
    <section className="favorites">
      <h1 className="favorites__title">Saved listing</h1>
      <ul className="favorites__list">
        {CITIES.map((city) => (
          <li key = {city} className="favorites__locations-items">
            <div className="favorites__locations locations locations--current">
              <div className="locations__item">
                <a className="locations__item-link" href="/">
                  <span>{city}</span>
                </a>
              </div>
            </div>
            <PlaceCardList
              offers = {offers}
              typeComponent = {PlaceCardType.Favorites}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}

export default FavoritesContainer;
