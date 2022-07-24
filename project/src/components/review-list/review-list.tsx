import ReviewCard from '../review-card/review-card';
import {Review} from '../../types/review';

type ReviewListProps = {
 reviews: Review[];
 }

function ReviewList({reviews}: ReviewListProps): JSX.Element {
  return (
    <ul className="reviews__list">
      {reviews.map((review) => (
        <ReviewCard
          key = {review.id}
          review = {review}
        />
      ))}
    </ul>
  );
}

export default ReviewList;
