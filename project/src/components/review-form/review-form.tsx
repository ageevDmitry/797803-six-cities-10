import {FormEvent, Fragment, useEffect} from 'react';
import {REVIEW_FORM_STATUSES, LengthComment, FORM_REVIEW_DEFAULT_STATE} from '../../const';
import {useAppSelector, useAppDispatch} from '../../hooks';
import {UserReview} from '../../types/review';
import {sendNewReviewAction} from '../../store/api-action';
import {getPropertyOffer, getIsDataLoading, getIsSuccess} from '../../store/offers-data/selectors';
import {useState, ChangeEvent} from 'react';

function ReviewForm(): JSX.Element {

  const dispatch = useAppDispatch();
  const propertyOffer = useAppSelector(getPropertyOffer);
  const isDataLoading = useAppSelector(getIsDataLoading);
  const isSuccess = useAppSelector(getIsSuccess);
  const [formData, setFormData] = useState(FORM_REVIEW_DEFAULT_STATE);

  useEffect(() => {
    if (isSuccess) {
      setFormData(FORM_REVIEW_DEFAULT_STATE);
    }
  }, [isSuccess]);

  const isValidForm = (LengthComment.Min < formData.comment.length &&
    formData.comment.length < LengthComment.Max && formData.rating.length > 0);

  const isFormDisabled = !isValidForm || isDataLoading;

  const handleFormChange = (evt: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {

    const {name, value} = evt.target;
    setFormData({...formData, [name]: value},);
  };

  const onSubmit = (newReview: UserReview) => {

    dispatch(sendNewReviewAction(newReview));
  };

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {

    evt.preventDefault();

    if (isValidForm && propertyOffer) {

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

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={handleFormSubmit}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {REVIEW_FORM_STATUSES.map((item) => (
          <Fragment key = {item.starNumber}>
            <input onChange={handleFormChange} className="form__rating-input visually-hidden" value={item.starNumber} name="rating" id={`${item.starNumber}-stars`}
              type="radio" checked={(item.starNumber === Number(formData.rating))} disabled ={isDataLoading}
            />
            <label htmlFor={`${item.starNumber}-stars`} className="reviews__rating-label form__rating-label" title={item.title}>
              <svg className="form__star-image" width={37} height={33}>
                <use xlinkHref="#icon-star" />
              </svg>
            </label>
          </Fragment>
        ))}
      </div>
      <textarea onChange={handleFormChange} className="reviews__textarea form__textarea" id="review" name="comment" placeholder="Tell how was your stay, what you like and what can be improved"
        value={formData.comment} disabled ={isDataLoading}
      />
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
