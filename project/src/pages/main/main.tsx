import Header from '../../components/header/header';
import LocationList from '../../components/location-list/location-list';
import MainPlaces from '../../components/main-places/main-places';
import {Offer} from '../../types/offer';
import {City} from '../../types/city';

type MainProps = {
  city: string,
  offers: Offer[],
  mapCity: City,
}

function Main ({city, offers, mapCity}: MainProps): JSX.Element {

  return (
    <div className="page page--gray page--main">
      <Header/>
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <LocationList/>
          </section>
        </div>
        <div className="cities">
          <MainPlaces
            city = {city}
            offers = {offers}
            mapCity = {mapCity}
          />
        </div>
      </main>
    </div>
  );
}

export default Main;
