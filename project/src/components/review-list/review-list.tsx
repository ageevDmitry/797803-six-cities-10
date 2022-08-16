// import dayjs from 'dayjs';
import ReviewCard from '../review-card/review-card';
import {Review} from '../../types/review';

type ReviewListProps = {
 reviews: Review[];
 }

function ReviewList({reviews}: ReviewListProps): JSX.Element {

  const sortedReviews = reviews.sort((a, b) => a.id - b.id);
  console.log(sortedReviews);

  return (
    <ul className="reviews__list">
      {/* {sortedReviews.map((review) => ( */}
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
