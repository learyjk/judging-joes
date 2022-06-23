import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const { name, avgRating, numReviews, category, imageUrl, slug } = product;
  return (
    <Link to={`/${slug}`}>
      <div className="group flex w-full flex-wrap items-stretch overflow-hidden rounded-lg border border-stone-400 bg-white transition-all duration-300 hover:border-rose-900 sm:h-32 sm:flex-nowrap sm:hover:bg-red-100">
        <div className="flex w-1/2 flex-none flex-col items-center justify-center sm:w-28">
          <p className=" font-display text-4xl font-bold tracking-wider">
            {avgRating.toFixed(2)}
          </p>
          <p className=" text-sm">{`(${numReviews})`}</p>
        </div>
        <div className="sm:min-h-32 h-32 w-1/2 flex-none overflow-hidden sm:w-28">
          <img
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105 group-hover:brightness-110 sm:h-32"
            src={imageUrl}
            alt={name}
          />
        </div>
        <div className="flex w-full shrink flex-col bg-red-50 p-4 sm:bg-transparent">
          <p className="mb-1 text-xs font-light uppercase tracking-widest">
            {category}
          </p>
          <h2 className="font-display text-xl">{name}</h2>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
