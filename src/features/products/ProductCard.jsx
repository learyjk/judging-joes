import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const { name, avgRating, numReviews, category, imageUrl, slug } = product
  return (
    <Link to={`/${slug}`}>
      <div className='flex w-full sm:h-32 items-stretch border border-stone-400 rounded-lg bg-white transition-all duration-300 sm:hover:bg-red-100 hover:border-rose-900 group flex-wrap sm:flex-nowrap overflow-hidden'>

        <div className='flex-none flex flex-col items-center justify-center sm:w-28 w-1/2'>
          <p className=' text-4xl font-display font-bold tracking-wider'>{avgRating.toFixed(2)}</p>
          <p className=' text-sm'>{`(${numReviews})`}</p>
        </div>
        <div className='flex-none sm:w-28 sm:min-h-32 h-32 w-1/2 overflow-hidden'>
          <img className='w-full h-full sm:h-32 object-cover group-hover:scale-105 transition-transform duration-300 group-hover:brightness-110' src={imageUrl} alt={name} />
        </div>
        <div className='shrink flex flex-col p-4 sm:bg-transparent bg-red-50 w-full'>
          <p className='text-xs uppercase font-light tracking-widest mb-1'>{category}</p>
          <h2 className='font-display text-xl'>{name}</h2>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;