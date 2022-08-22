import {Fragment} from 'react';
import {useRef, FormEvent} from 'react';
import {REVIEW_FORM_STATUS, LengthComment} from '../../const';
import {useAppSelector, useAppDispatch} from '../../hooks';
import {UserReview} from '../../types/review';
import {sendNewReviewAction} from '../../store/api-action';

function ReviewForm(): JSX.Element {

  const commentRef = useRef<HTMLTextAreaElement | null>(null);
  const ratingRef = useRef<Array<HTMLInputElement | null>>([]);
  const propertyOffer = useAppSelector((state) => state.propertyOffer);

  const dispatch = useAppDispatch();
  const isDataLoaded = useAppSelector((state) => state.isDataLoaded);

  const onSubmit = (newReview: UserReview) => {
    dispatch(sendNewReviewAction(newReview));
  };

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const selectedRating = ratingRef.current.reverse().find((element) => element?.checked);

    if (commentRef.current !== null && selectedRating && propertyOffer) {
      onSubmit({
        propertyOfferId: propertyOffer.id,
        newComment: {
          comment: commentRef.current.value,
          rating: selectedRating.value
        }
      }
      );
    }
  };

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={handleFormSubmit}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {REVIEW_FORM_STATUS.map((item, idx) => (
          <Fragment key = {item.startNumber}>
            <input ref={(ref)=> {ratingRef.current[idx] = ref;}} className="form__rating-input visually-hidden" name="rating" value={item.startNumber} id={`${item.startNumber}-stars`} type="radio" />
            <label htmlFor={`${item.startNumber}-stars`} className="reviews__rating-label form__rating-label" title={item.title}>
              <svg className="form__star-image" width={37} height={33}>
                <use xlinkHref="#icon-star" />
              </svg>
            </label>
          </Fragment>
        ))}
      </div>
      <textarea ref={commentRef} minLength={LengthComment.Min} maxLength={LengthComment.Max} className="reviews__textarea form__textarea" id="review" name="review" placeholder="Tell how was your stay, what you like and what can be improved" defaultValue={''} />
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
