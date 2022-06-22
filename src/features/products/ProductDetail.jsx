import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import AddReview from '../reviews/AddReview';
import { fetchReviews, reviewsSliceActions, selectAllReviews } from '../reviews/reviewsSlice';
import Loader from '../../components/Loader'
import ReviewCard from '../reviews/ReviewCard';
import { fetchProductBySlug, fetchProducts, selectProductBySlug } from './productsSlice';

const ProductDetail = () => {
  let { productSlug } = useParams()
  const [isPageLoading, setIsPageLoading] = useState(true)
  const dispatch = useDispatch()

  const reviews = useSelector(selectAllReviews)
  let product = useSelector(state => selectProductBySlug(state, productSlug))
  //const reviewsStatus = useSelector(state => state.reviews.status)

  console.log('product', product)
  // gets the product if not navigated from ProductList
  if (!product) {
    dispatch(fetchProducts())
  }

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
            <ReviewCard key={review.slug} review={review} />
          )
          )
        )}

      </section>


    </>
  );
};

export default ProductDetail;