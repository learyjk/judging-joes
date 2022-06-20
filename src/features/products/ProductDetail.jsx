import React from 'react';
import { useParams } from 'react-router-dom';

const ProductDetail = () => {
  let { productSlug } = useParams()

  return (
    <section className='container max-w-lg'>
      <h2>Product Detail</h2>
      <p>{productSlug}</p>
    </section>
  );
};

export default ProductDetail;