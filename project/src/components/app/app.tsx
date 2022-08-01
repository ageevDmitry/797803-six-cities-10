import {Route, BrowserRouter, Routes} from 'react-router-dom';
import Main from '../../pages/main/main';
import Login from '../../pages/login/login';
import Favorites from '../../pages/favorites/favorites';
import Property from '../../pages/property/property';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import PrivateRoute from '../../pages/private-route/private-route';
import {AppRoute, AuthorizationStatus} from '../../const';
import {useAppSelector} from '../../hooks';

function App(): JSX.Element {

  const selectedCity = useAppSelector((state) => state.city);
  const filterOffers = useAppSelector((state) => state.offers);
  const filterMapCity = useAppSelector((state) => state.mapCity[0]);
  const reviews = useAppSelector((state) => state.reviews);

  return (

    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={<Main city = {selectedCity} offers = {filterOffers} mapCity = {filterMapCity}/>}
        />
        <Route
          path={AppRoute.Login}
          element={<Login />}
        />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute
              authorizationStatus={AuthorizationStatus.Auth}
            >
              <Favorites offers = {filterOffers}/>
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Property}
          element={<Property offers = {filterOffers} reviews = {reviews} mapCity = {filterMapCity}/>}
        />
        <Route
          path="*"
          element={<NotFoundScreen />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
