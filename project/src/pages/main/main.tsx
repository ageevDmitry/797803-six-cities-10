import Header from '../../components/header/header';
import LocationList from '../../components/filter-cities/filter-cities';
import MainPlaces from '../../components/main-places/main-places';
import MainPlacesEmpty from '../../components/main-places-empty/main-places-empty';
import {useAppSelector} from '../../hooks';

function Main (): JSX.Element {

  const error = useAppSelector((state) => state.error);

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
          {(error) ? <MainPlacesEmpty/> : <MainPlaces/>}
        </div>
      </main>
    </div>
  );
}

export default Main;
