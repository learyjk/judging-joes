import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const { name, category, imageUrl, slug } = product
  return (
    <Link to={`/${slug}`}>
      <div className='flex w-full items-center mb-2 bg-slate-100 rounded-lg'>
        <p className='flex-none flex items-center justify-center w-20 text-3xl'>4.5</p>
        <img className='flex-none w-28 h-28 object-cover' src={imageUrl} alt={name} />
        <h2 className='shrink p-4'>{name}</h2>
      </div>
    </Link>
  );
};

export default ProductCard;