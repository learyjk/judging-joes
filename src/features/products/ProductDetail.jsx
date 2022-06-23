import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import AddReview from '../reviews/AddReview';
import { fetchReviews, reviewsSliceActions, selectAllReviews } from '../reviews/reviewsSlice';
import Loader from '../../components/Loader'
import ReviewCard from '../reviews/ReviewCard';
import { fetchProducts, selectProductBySlug } from './productsSlice';

const ProductDetail = () => {
  const { productSlug } = useParams()
  const [isPageLoading, setIsPageLoading] = useState(true)
  const dispatch = useDispatch()

  const reviews = useSelector(selectAllReviews)
  let product = useSelector(state => selectProductBySlug(state, productSlug))
  //const reviewsStatus = useSelector(state => state.reviews.status)

  useEffect(() => {
    dispatch(fetchProducts())
    dispatch(fetchReviews(productSlug))
    setIsPageLoading(false)
    return () => {
      // reset reviews
      dispatch(reviewsSliceActions.resetReviews())
    }
  }, [productSlug, dispatch])

  // handle refresh
  if (!product || !reviews) {
    return (
      <div className='container max-w-xl w-full flex items-center justify-center'>
        <Loader />
      </div>
    )
  }

  return (
    <>
      <section className='container max-w-xl w-full'>
        <div className='border border-slate-400 rounded-2xl '>
          <img className='w-full h-48 object-cover rounded-t-2xl' src={product.imageUrl} alt={product.name} />
          <div className='relative pt-6 bg-stone-200 rounded-b-2xl'>
            <AddReview productSlug={productSlug} />
            <div className='absolute -top-6 -right-4 bg-red-700 text-red-50 text-lg sm:text-2xl font-display px-4 py-1 ml-2 rounded-lg border border-red-900 z-20'>{product.name}</div>
            <div className='absolute -top-40 -right-4 bg-red-700 text-red-50 text-5xl font-display px-4 z-20 pb-4 rounded-lg border border-red-900'>{product.avgRating.toFixed(2)}</div>
          </div>

        </div>

      </section>
      <section className='container max-w-xl flex flex-col gap-4 mt-4'>

        {isPageLoading ? (
          <Loader />
        ) : (
          reviews.map((review) => (
            <ReviewCard key={review.slug} review={review} productSlug={productSlug} />
          )
          )
        )}
      </section>
    </>
  );
};

export default ProductDetail;