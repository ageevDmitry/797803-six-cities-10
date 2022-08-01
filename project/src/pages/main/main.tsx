import Header from '../../components/header/header';
import LocationList from '../../components/location-list/location-list';
import MainPlaces from '../../components/main-places/main-places';


function Main (): JSX.Element {

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
          <MainPlaces/>
        </div>
      </main>
    </div>
  );
}

export default Main;
