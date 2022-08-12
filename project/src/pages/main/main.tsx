import Header from '../../components/header/header';
import LocationList from '../../components/location-list/location-list';
import MainPlaces from '../../components/main-places/main-places';
import MainPlacesEmpty from '../../components/main-places-empty/main-places-empty';
import {useAppSelector} from '../../hooks';

function Main (): JSX.Element {

  const offers = useAppSelector((state) => state.offers);
  const filterOffers = useAppSelector((state) => state.filterOffers);

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
          {(filterOffers === [] && offers !== []) ? <MainPlacesEmpty/> : <MainPlaces/>}
        </div>
      </main>
    </div>
  );
}

export default Main;
