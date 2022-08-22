import {Link} from 'react-router-dom';
import {AppRoute} from '../../const';
import {logoutAction} from '../../store/api-action';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {getUserData} from '../../store/user-process/selectors';
import {getFavoriteOffers} from '../../store/offers-data/selectors';

function SingOut ():JSX.Element {

  const dispatch = useAppDispatch();
  const userData = useAppSelector(getUserData);
  const favoriteOffers = useAppSelector(getFavoriteOffers);

  return (
    <ul className="header__nav-list">
      <li className="header__nav-item user">
        <Link to={AppRoute.Favorites} className="header__nav-link header__nav-link--profile">
          <img
            className="header__avatar-wrapper user__avatar-wrapper"
            src={userData?.avatarUrl}
            alt="User avatar"
            width={20}
            height={20}
          />
          <span className="header__user-name user__name">{userData?.email}</span>
          <span className="header__favorite-count">{favoriteOffers?.length}</span>
        </Link>
      </li>
      <li className="header__nav-item">
        <Link
          to={AppRoute.Main}
          className="header__nav-link"
          onClick={(evt) => {
            evt.preventDefault();
            dispatch(logoutAction());
          }}
        >
          <span className="header__signout">Sign out</span>
        </Link>
      </li>
    </ul>
  );
}

export default SingOut;
