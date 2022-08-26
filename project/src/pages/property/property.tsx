import {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import Header from '../../components/header/header';
import ReviewForm from '../../components/review-form/review-form';
import ReviewList from '../../components/review-list/review-list';
import PlaceCardList from '../../components/place-card-list/place-card-list';
import Map from '../../components/map/map';
import {PlaceCardType, PROPERTY_IMAGES_COUNT, RatingWidthFactor} from '../../const';
import {useAppSelector} from '../../hooks';
import {AuthorizationStatus, VIEW_OFFER_TYPE, AppRoute, FavoriteStatus} from '../../const';
import {useAppDispatch} from '../../hooks';
import {fetchPropertyOffersAction,
  fetchNearbyOffersAction,
  loadReviewsAction} from '../../store/api-action';
import LoadingScreen from '../../components/loading-screen/loading-screen';
import {redirectToRoute} from '../../store/action';
import {changeFavoriteStatusAction} from '../../store/api-action';
import {getPropertyOffer, getReviews, getNearbyOffer} from '../../store/offers-data/selectors';
import {getMapCity} from '../../store/offers-ui/selectors';
import {getAuthorizationStatus} from '../../store/user-process/selectors';

function Property (): JSX.Element {

  const {id} = useParams();
  const dispatch = useAppDispatch();

  const offer = useAppSelector(getPropertyOffer);
  const reviews = useAppSelector(getReviews);
  const nearbyOffers = useAppSelector(getNearbyOffer);
  const mapCity = useAppSelector(getMapCity);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  useEffect(() => {
    if (id) {
      dispatch(fetchPropertyOffersAction(id));
      dispatch(fetchNearbyOffersAction(id));
      dispatch(loadReviewsAction(id));
    }
  }, [id, offer?.id, dispatch]);

  if (!offer || !reviews || !nearbyOffers) {
    return (
      <LoadingScreen />
    );
  }

  const handleButtonClick = () => {

    if (authorizationStatus !== AuthorizationStatus.Auth) {
      return dispatch(redirectToRoute(AppRoute.Login));
    }

    dispatch(changeFavoriteStatusAction({
      id : String(offer.id),
      favoriteStatus: (offer.isFavorite) ? FavoriteStatus.Favorite : FavoriteStatus.NotFavorite,
    }));
  };

  return (

    <div className="page">
      <Header/>
      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {
                offer.images.slice(0, PROPERTY_IMAGES_COUNT).map((image) => (
                  <div key={image}
                    className="property__image-wrapper"
                  >
                    <img className="property__image"
                      src={image}
                      alt=""
                    />
                  </div>
                ))
              }
            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              {offer.isPremium && <div className="property__mark"><span>Premium</span></div>}
              <div className="property__name-wrapper">
                <h1 className="property__name">
                  {offer.title}
                </h1>
                <button onClick={handleButtonClick} className="property__bookmark-button button" type="button">
                  <svg className="property__bookmark-icon"
                    width={31}
                    height={33}
                    style={(offer.isFavorite) ? {stroke: '#4481c3', fill: '#4481c3'} : undefined}
                  >
                    <use xlinkHref="#icon-bookmark" />
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{width: Math.round(offer.rating) * RatingWidthFactor.Property}} />
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">{offer.rating}</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {VIEW_OFFER_TYPE[offer.type]}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {offer?.bedrooms} Bedrooms
                </li>
                <li className="property__feature property__feature--adults">
              Max {offer.maxAdults} adults
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">€{offer.price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&#39;s inside</h2>
                <ul className="property__inside-list">
                  {
                    offer.goods.map((good) => (
                      <li key = {good} className="property__inside-item">{good}</li>
                    ))
                  }
                </ul>
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                    <img
                      className="property__avatar user__avatar"
                      src={offer.host.avatarUrl}
                      alt="Host avatar"
                      width={74}
                      height={74}
                    />
                  </div>
                  <span className="property__user-name">{offer.host.name}</span>
                  {offer.host.isPro && <span className="property__user-status">Pro</span>}
                </div>
                <div className="property__description">
                  {offer.description}
                </div>
              </div>
              <section className="property__reviews reviews">
                <h2 className="reviews__title">
              Reviews · <span className="reviews__amount">{reviews.length}</span>
                </h2>
                <ReviewList reviews = {reviews}/>
                {(authorizationStatus === AuthorizationStatus.Auth) ? <ReviewForm/> : ''}
              </section>
            </div>
          </div>
          <section className="property__map map">
            <Map
              mapCity = {mapCity}
              offers = {nearbyOffers}
              propertyOffer = {offer}
            />
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">
          Other places in the neighbourhood
            </h2>
            <div className="near-places__list places__list">
              <PlaceCardList
                offers = {nearbyOffers}
                typeComponent = {PlaceCardType.NearPlaces}
              />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Property;
