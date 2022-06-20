import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const { name, avgRating, numReviews, category, imageUrl, slug } = product
  return (
    <Link to={`/${slug}`}>
      <div className='flex w-full items-center mb-4 bg-slate-100 rounded-lg'>
        <div className='flex-none flex flex-col items-center justify-center w-28'>
          <p className=' text-3xl'>{avgRating.toFixed(2)}</p>
          <p className=' text-sm'>{`(${numReviews})`}</p>
        </div>
        <img className='flex-none w-28 h-28 object-cover' src={imageUrl} alt={name} />
        <h2 className='shrink p-4'>{name}</h2>
      </div>
    </Link>
  );
};

export default ProductCard;