import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import AddReview from '../reviews/AddReview';
import { fetchReviews, reviewsSliceActions, selectAllReviews } from '../reviews/reviewsSlice';
import Loader from '../../components/Loader'
import ReviewCard from '../reviews/ReviewCard';

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
      <section className='container max-w-xl'>
        <AddReview productSlug={productSlug} />
      </section>
      <section className='container max-w-xl'>
        <p>{productSlug}</p>
        {isPageLoading ? (
          <Loader />
        ) : (
          reviews.map((review) => (
            <ReviewCard key={review.slug} review={review} />
          )
          )
        )}
      </section>


    </>
  );
};

export default ProductDetail;