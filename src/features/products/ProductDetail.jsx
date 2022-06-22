import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import AddReview from '../reviews/AddReview';
import { fetchReviews, reviewsSliceActions, selectAllReviews } from '../reviews/reviewsSlice';
import Loader from '../../components/Loader'
import ReviewCard from '../reviews/ReviewCard';
import { fetchProducts, selectAllProducts, selectProductBySlug } from './productsSlice';

const ProductDetail = () => {
  const { productSlug } = useParams()
  const [isPageLoading, setIsPageLoading] = useState(true)
  const dispatch = useDispatch()

  const reviews = useSelector(selectAllReviews)
  let product = useSelector(state => selectProductBySlug(state, productSlug))
  //const reviewsStatus = useSelector(state => state.reviews.status)

  console.log('productSlug', productSlug, 'product', product, 'reviews', reviews)

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
        <div className='border border-slate-400 rounded-2xl overflow-hidden'>
          <img className='w-full h-48 object-cover' src={product.imageUrl} alt={product.name} />
          <AddReview productSlug={productSlug} />
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