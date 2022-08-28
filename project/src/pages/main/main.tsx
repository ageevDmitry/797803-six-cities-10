import Header from '../../components/header/header';
import LocationList from '../../components/filter-cities/filter-cities';
import MainPlaces from '../../components/main-places/main-places';
import MainPlacesEmpty from '../../components/main-places-empty/main-places-empty';
import {useAppSelector} from '../../hooks';
import {getSortedOffers} from '../../store/offers-ui/selectors';

function Main (): JSX.Element {

  const offers = useAppSelector(getSortedOffers);

  return (
    <div className="page page--gray page--main">
      <Header/>
      <main className={`page__main page__main--index ${(offers.length === 0) ? 'page__main--index-empty' : ''}`}>
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <LocationList/>
          </section>
        </div>
        <div className="cities">
          <div className={`cities__places-container ${(offers.length === 0) ? 'cities__places-container--empty' : ''} container`}>
            {(offers.length === 0) ? <MainPlacesEmpty/> : <MainPlaces/>}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Main;
