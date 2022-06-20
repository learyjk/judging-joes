import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import AddReview from '../reviews/AddReview';
import { fetchReviews, selectAllReviews } from '../reviews/reviewsSlice';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const ProductDetail = () => {
  let { productSlug } = useParams()

  const dispatch = useDispatch()
  const reviews = useSelector(selectAllReviews)
  const reviewsStatus = useSelector(state => state.reviews.status)

  useEffect(() => {
    if (reviewsStatus === 'idle') {
      dispatch(fetchReviews(productSlug))
    }
  }, [reviewsStatus, dispatch])

  return (
    <>
      <section className='container max-w-lg'>
        <h2>Product Detail</h2>
        <p>{productSlug}</p>
        {reviews && reviews.map((review) => {

          const d = new Date(review.created_at * 1000)
          const timeSince = `${formatDistanceToNow(d)} ago`

          return (
            <div key={review.slug}>
              <p>{review.user}</p>
              <p>{timeSince}</p>
              <p>{review.review}</p>
            </div>
          )
        }


        )}
      </section>

      <section className='container max-w-lg'>
        <AddReview productSlug={productSlug} />
      </section>
    </>
  );
};

export default ProductDetail;