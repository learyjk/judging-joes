import React from 'react';

const ProductCard = ({ product }) => {
  const { name, category, imageUrl } = product
  return (
    <div>
      <img src={imageUrl} alt={name} />
      <h2>{name}</h2>
    </div>
  );
};

export default ProductCard;