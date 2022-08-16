import ReviewCard from '../review-card/review-card';
import {Review} from '../../types/review';
import {REVIEWS_COUNT} from '../../const';

type ReviewListProps = {
 reviews: Review[];
 }

function ReviewList({reviews}: ReviewListProps): JSX.Element {

  return (
    <ul className="reviews__list">
      {reviews.slice(0, REVIEWS_COUNT).map((review) => (
        <ReviewCard
          key = {review.id}
          review = {review}
        />
      ))}
    </ul>
  );
}

export default ReviewList;
