import Header from '../../components/header/header';
import LocationList from '../../components/filter-cities/filter-cities';
import MainPlaces from '../../components/main-places/main-places';
import MainPlacesEmpty from '../../components/main-places-empty/main-places-empty';
import {useAppSelector} from '../../hooks';
import {getIsError} from '../../store/offers-data/selectors';

function Main (): JSX.Element {

  const isError = useAppSelector(getIsError);

  return (
    <div className="page page--gray page--main">
      <Header/>
      <main className={`page__main page__main--index ${(isError) ? 'page__main--index-empty' : ''}`}>
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <LocationList/>
          </section>
        </div>
        <div className="cities">
          <div className={`cities__places-container ${(isError) ? 'cities__places-container--empty' : ''} container`}>
            {(isError) ? <MainPlacesEmpty/> : <MainPlaces/>}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Main;
