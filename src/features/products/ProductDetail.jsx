import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

import AddReview from '../reviews/AddReview';
import { fetchReviews, reviewsSliceActions, selectAllReviews } from '../reviews/reviewsSlice';
import Loader from '../../components/Loader'

const ProductDetail = () => {
  let { productSlug } = useParams()
  const [isPageLoading, setIsPageLoading] = useState(true)
  const dispatch = useDispatch()

  const reviews = useSelector(selectAllReviews)
  //const reviewsStatus = useSelector(state => state.reviews.status)

  useEffect(() => {
    dispatch(fetchReviews(productSlug))
    setIsPageLoading(false)

    return () => {
      // reset reviews
      dispatch(reviewsSliceActions.resetReviews())
    }

  }, [productSlug, dispatch])

  return (
    <>
      <section className='container max-w-lg'>
        <AddReview productSlug={productSlug} />
      </section>
      <section className='container max-w-lg'>
        <p>{productSlug}</p>
        {isPageLoading ? (
          <Loader />
        ) : (
          reviews.map((review) => {
            const d = new Date(review.created_at * 1000)
            const timeSince = `${formatDistanceToNow(d)} ago`

            return (
              <div key={review.slug}>
                <p>{review.user}</p>
                <p>{timeSince}</p>
                <p>{review.review}</p>
              </div>
            )
          })
        )}
      </section>


    </>
  );
};

export default ProductDetail;