import Header from '../../components/header/header';
import LocationList from '../../components/filter-cities/filter-cities';
import MainPlaces from '../../components/main-places/main-places';
import MainPlacesEmpty from '../../components/main-places-empty/main-places-empty';
import {useAppSelector} from '../../hooks';

function Main (): JSX.Element {

  const error = useAppSelector((state) => state.isError);

  return (
    <div className="page page--gray page--main">
      <Header/>
      <main className={`page__main page__main--index ${(error) ? 'page__main--index-empty' : ''}`}>
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <LocationList/>
          </section>
        </div>
        <div className="cities">
          <div className={`cities__places-container ${(error) ? 'cities__places-container--empty' : ''} container`}>
            {(error) ? <MainPlacesEmpty/> : <MainPlaces/>}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Main;
