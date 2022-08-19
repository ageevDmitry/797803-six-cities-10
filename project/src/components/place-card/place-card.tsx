import {RatingWidthFactor} from '../../const';
import {Offer} from '../../types/offer';
import {Link} from 'react-router-dom';
import {ViewOfferType, FavoriteStatus} from '../../const';
import {useState} from 'react';
import {changeFavoriteStatusAction} from '../../store/api-action';
import {useAppDispatch} from '../../hooks';

type PlaceCardProps = {
  typeComponent: string;
  offer: Offer;
  onMouseEnterPlaceCard?: (id: number) => void;
}

function PlaceCard ({typeComponent, offer, onMouseEnterPlaceCard}:PlaceCardProps): JSX.Element {

  const {id, isPremium, previewImage, price, rating, title, type, isFavorite} = offer;
  const placeCardId = `/offer/${id}`;
  const dispatch = useAppDispatch();

  const [isFavoriteFlag, setFavoriteFlag] = useState(isFavorite);

  return (
    <article className={`${typeComponent}__card place-card`}
      onMouseEnter = {onMouseEnterPlaceCard ? () => onMouseEnterPlaceCard(id) : undefined}
    >
      {isPremium && <div className="place-card__mark"><span>Premium</span></div>}
      <div className={`${typeComponent}__image-wrapper place-card__image-wrapper`}>
        <Link to={placeCardId}>
          <img
            className="place-card__image"
            src={previewImage}
            alt="Place figure"
            width={260}
            height={200}
          />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">{price}</b>
            <span className="place-card__price-text">/&nbsp;night</span>
          </div>
          <button onClick={() => {
            setFavoriteFlag(!isFavoriteFlag);

            dispatch(changeFavoriteStatusAction({
              id : id,
              favoriteStatus: (isFavoriteFlag) ? FavoriteStatus.isFavorite : FavoriteStatus.isNotFavorite,
            }));
          }}
          className="place-card__bookmark-button button"
          type="button"
          >
            <svg
              className="place-card__bookmark-icon"
              width={18}
              height={19}
              style={(isFavoriteFlag) ? {stroke: '#4481c3', fill: '#4481c3'} : {stroke: '#979797'}}
            >
              <use xlinkHref="#icon-bookmark" />
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: rating * RatingWidthFactor.Film}} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={placeCardId}>
            {title}
          </Link>
        </h2>
        <p className="place-card__type">{ViewOfferType[type]}</p>
      </div>
    </article>
  );
}

export default PlaceCard;
