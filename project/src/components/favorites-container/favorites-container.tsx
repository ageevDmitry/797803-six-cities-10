import PlaceCardList from '../place-card-list/place-card-list';
import {CITIES, PlaceCardType} from '../../const';
import {useAppSelector} from '../../hooks';
import {Offer} from '../../types/offer';

function FavoritesContainer (): JSX.Element {

  const favoriteOffers = useAppSelector((state) => state.favoriteOffers);

  return (
    <section className="favorites">
      <h1 className="favorites__title">Saved listing</h1>
      <ul className="favorites__list">
        {CITIES.map((city) => {

          const filteredOffers = favoriteOffers.filter((item: Offer) => item.city.name === city);

          return (
            <li key = {city} className="favorites__locations-items">
              <div className="favorites__locations locations locations--current">
                <div className="locations__item">
                  <a className="locations__item-link" href="/">
                    <span>{city}</span>
                  </a>
                </div>
              </div>
              <PlaceCardList
                offers = {filteredOffers}
                typeComponent = {PlaceCardType.Favorites}
              />
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default FavoritesContainer;
