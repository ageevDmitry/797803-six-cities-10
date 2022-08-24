import Header from '../../components/header/header';
import {useRef, FormEvent} from 'react';
import {useAppDispatch} from '../../hooks';
import {loginAction} from '../../store/api-action';
import {Navigate} from 'react-router-dom';
import {useAppSelector} from '../../hooks';
import {getAuthorizationStatus} from '../../store/user-process/selectors';
import {AppRoute, AuthorizationStatus, PASSWORD_REGULAR_EXPRESSION} from '../../const';
import {getIsDataLoading} from '../../store/offers-data/selectors';
import LoadingScreen from '../../components/loading-screen/loading-screen';
import {Link} from 'react-router-dom';

function Login (): JSX.Element {
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const dispatch = useAppDispatch();

  const isDataLoading = useAppSelector(getIsDataLoading);

  if (isDataLoading) {
    return (
      <LoadingScreen />
    );
  }

  if (authorizationStatus === AuthorizationStatus.Auth) {
    return <Navigate to={AppRoute.Main}/>;
  }

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (loginRef.current !== null && passwordRef.current !== null) {
      dispatch(loginAction({
        login: loginRef.current.value,
        password: passwordRef.current.value,
      }
      ));
    }
  };

  return (
    <div className="page page--gray page--login">
      <Header/>
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" action="#" method="post" onSubmit={handleFormSubmit}>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  ref={loginRef}
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  ref={passwordRef}
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  pattern={PASSWORD_REGULAR_EXPRESSION}
                  title="Пароль должен состоять минимум из одной буквы и цифры"
                  required
                />
              </div>
              <button className="login__submit form__submit button" type="submit">
            Sign in
              </button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link to="/" className="locations__item-link">
                <span>Amsterdam</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Login;
