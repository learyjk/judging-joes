import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const { name, avgRating, numReviews, category, imageUrl, slug } = product
  return (
    <Link to={`/${slug}`}>
      <div className='flex w-full items-stretch border border-stone-800 rounded-lg bg-white transition-all duration-300 hover:bg-red-100 hover:border-rose-900 group'>
        <div className='flex-none flex flex-col items-center justify-center w-28'>
          <p className=' text-4xl font-display font-bold tracking-wider'>{avgRating.toFixed(2)}</p>
          <p className=' text-sm'>{`(${numReviews})`}</p>
        </div>
        <div className='flex-none w-28 h-32 overflow-hidden'>
          <img className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 group-hover:brightness-110' src={imageUrl} alt={name} />

        </div>
        <div className='shrink flex flex-col p-4'>
          <p className='text-xs uppercase font-light tracking-widest mb-1'>{category}</p>
          <h2 className='font-display text-xl'>{name}</h2>

        </div>

      </div>
    </Link>
  );
};

export default ProductCard;