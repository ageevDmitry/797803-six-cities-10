import {FormEventHandler, Fragment} from 'react';
import {REVIEW_FORM_STATUSES, LengthComment} from '../../const';
import {useAppSelector, useAppDispatch} from '../../hooks';
import {UserReview} from '../../types/review';
import {sendNewReviewAction} from '../../store/api-action';
import {getPropertyOffer, getIsDataLoading} from '../../store/offers-data/selectors';
import {useState, ChangeEvent} from 'react';

function ReviewForm(): JSX.Element {

  const dispatch = useAppDispatch();

  const propertyOffer = useAppSelector(getPropertyOffer);
  const isDataLoading = useAppSelector(getIsDataLoading);
  let isFormDisabled = true;

  const [formData, setFormData] = useState({
    comment: '',
    rating: null,
  });

  const handleFormChange = (evt: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {

    evt.preventDefault();

    const {name, value} = evt.target;
    setFormData({...formData, [name]: value},);
  };

  const onSubmit = (newReview: UserReview) => {

    console.log(newReview);

    dispatch(sendNewReviewAction(newReview));
  };

  const handleFormSubmit = () => {

    if (propertyOffer &&
      LengthComment.Min < formData.comment.length &&
      formData.comment.length < LengthComment.Max &&
      formData.rating !== null) {

      onSubmit({
        propertyOfferId: propertyOffer.id,
        newComment: {
          comment: formData.comment,
          rating: formData.rating
        }
      }
      );
    }
  };

  if (LengthComment.Min < formData.comment.length &&
    formData.comment.length < LengthComment.Max &&
    formData.rating !== null &&
    !isDataLoading) {
    isFormDisabled = false;
  }

  console.log(formData.comment.length);

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={handleFormSubmit}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {REVIEW_FORM_STATUSES.map((item) => (
          <Fragment key = {item.startNumber}>
            <input onChange={handleFormChange} className="form__rating-input visually-hidden" defaultValue={item.startNumber} name="rating" id={`${item.startNumber}-stars`} type="radio" />
            <label htmlFor={`${item.startNumber}-stars`} className="reviews__rating-label form__rating-label" title={item.title}>
              <svg className="form__star-image" width={37} height={33}>
                <use xlinkHref="#icon-star" />
              </svg>
            </label>
          </Fragment>
        ))}
      </div>
      <textarea onChange={handleFormChange} className="reviews__textarea form__textarea" id="review" name="comment" placeholder="Tell how was your stay, what you like and what can be improved" defaultValue={''} />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
                        To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled ={isFormDisabled}>Submit</button>
      </div>
    </form>
  );
}

export default ReviewForm;
