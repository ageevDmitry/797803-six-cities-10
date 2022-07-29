import Header from '../../components/header/header';
import LocationList from '../../components/location-list/location-list';
import MainPlaces from '../../components/main-places/main-places';
import {Offer} from '../../types/offer';

type MainProps = {
    offers: Offer[];
  }

function Main ({offers}: MainProps): JSX.Element {

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
          <MainPlaces offers = {offers}/>
        </div>
      </main>
    </div>
  );
}

export default Main;
