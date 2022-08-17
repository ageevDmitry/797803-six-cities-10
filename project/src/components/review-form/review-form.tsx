import {Fragment} from 'react';
import {useRef, FormEvent} from 'react';
import {REVIEW_FORM_STATUS, MIN_LENGTH_COMMENT, MAX_LENGTH_COMMENT} from '../../const';
import {useAppSelector, useAppDispatch} from '../../hooks';
import {UserReview} from '../../types/review';
import {sendNewReviewAction} from '../../store/api-action';

function ReviewForm(): JSX.Element {

  const commentRef = useRef<HTMLTextAreaElement | null>(null);
  const ratingRef = useRef<HTMLInputElement | null>(null);
  const propertyOffer = useAppSelector((state) => state.propertyOffer);

  const dispatch = useAppDispatch();
  const isDataLoaded = useAppSelector((state) => state.isDataLoaded);

  const onSubmit = (newReview: UserReview) => {
    dispatch(sendNewReviewAction(newReview));
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (commentRef.current !== null && ratingRef.current !== null && propertyOffer) {
      onSubmit({
        propertyOfferId: propertyOffer.id,
        newComment: {
          comment: commentRef.current.value,
          rating: ratingRef.current.value
        }
      }
      );
    }
  };

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={handleSubmit}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {REVIEW_FORM_STATUS.map((item) => (
          <Fragment key = {item.startNumber}>
            <input ref={ratingRef} className="form__rating-input visually-hidden" name="rating" value={item.startNumber} id={`${item.startNumber}-stars`} type="radio" />
            <label htmlFor={`${item.startNumber}-stars`} className="reviews__rating-label form__rating-label" title={item.title}>
              <svg className="form__star-image" width={37} height={33}>
                <use xlinkHref="#icon-star" />
              </svg>
            </label>
          </Fragment>
        ))}
      </div>
      <textarea ref={commentRef} minLength={MIN_LENGTH_COMMENT} maxLength={MAX_LENGTH_COMMENT} className="reviews__textarea form__textarea" id="review" name="review" placeholder="Tell how was your stay, what you like and what can be improved" defaultValue={''} />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
                        To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled ={isDataLoaded}>Submit</button>
      </div>
    </form>
  );
}

export default ReviewForm;
