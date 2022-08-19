import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import FavoritesContainer from '../../components/favorites-container/favorites-container';

function Favorites (): JSX.Element {

  return (
    <div className="page">
      <Header/>
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <FavoritesContainer/>
        </div>
      </main>
      <Footer/>
    </div>
  );
}

export default Favorites;
