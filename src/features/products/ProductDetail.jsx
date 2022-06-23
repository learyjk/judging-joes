import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import AddReview from "../reviews/AddReview";
import {
  fetchReviews,
  reviewsSliceActions,
  selectAllReviews,
} from "../reviews/reviewsSlice";
import Loader from "../../components/Loader";
import ReviewCard from "../reviews/ReviewCard";
import { fetchProducts, selectProductBySlug } from "./productsSlice";

const ProductDetail = () => {
  const { productSlug } = useParams();
  const [isPageLoading, setIsPageLoading] = useState(true);
  const dispatch = useDispatch();

  const reviews = useSelector(selectAllReviews);
  let product = useSelector((state) => selectProductBySlug(state, productSlug));
  //const reviewsStatus = useSelector(state => state.reviews.status)

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchReviews(productSlug));
    setIsPageLoading(false);
    return () => {
      // reset reviews
      dispatch(reviewsSliceActions.resetReviews());
    };
  }, [productSlug, dispatch]);

  // handle refresh
  if (!product || !reviews) {
    return (
      <div className="container flex w-full max-w-xl items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <section className="container w-full max-w-xl">
        <div className="rounded-2xl border border-slate-400 ">
          <img
            className="h-48 w-full rounded-t-2xl object-cover"
            src={product.imageUrl}
            alt={product.name}
          />
          <div className="relative rounded-b-2xl bg-stone-200 pt-6">
            <AddReview productSlug={productSlug} />
            <div className="absolute -top-6 -right-4 z-20 ml-2 rounded-lg border border-red-900 bg-red-700 px-4 py-1 font-display text-lg text-red-50 sm:text-2xl">
              {product.name}
            </div>
            <div className="absolute -top-40 -right-4 z-20 rounded-lg border border-red-900 bg-red-700 px-4 pb-4 font-display text-5xl text-red-50">
              {product.avgRating.toFixed(2)}
            </div>
          </div>
        </div>
      </section>
      <section className="container mt-4 flex max-w-xl flex-col gap-4">
        {isPageLoading ? (
          <Loader />
        ) : (
          reviews.map((review) => (
            <ReviewCard
              key={review.slug}
              review={review}
              productSlug={productSlug}
            />
          ))
        )}
      </section>
    </>
  );
};

export default ProductDetail;
