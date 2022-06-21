import React from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const ReviewCard = ({ review }) => {
  const d = new Date(review.created_at * 1000)
  const timeSince = `${formatDistanceToNow(d)} ago`
  return (
    <div>
      <p>{review.user}</p>
      <p>{timeSince}</p>
      <p>{review.review}</p>
    </div>

  );
};

export default ReviewCard;