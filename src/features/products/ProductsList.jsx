import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectAllProducts, fetchProducts } from './productsSlice';
import ProductCard from './ProductCard';

const ProductsList = () => {

  const dispatch = useDispatch()
  const products = useSelector(selectAllProducts)
  const productsStatus = useSelector(state => state.products.status)

  useEffect(() => {
    if (productsStatus === 'idle') {
      dispatch(fetchProducts())
    }
  }, [productsStatus, dispatch])

  console.log(products)

  return (
    <section className='container max-w-lg'>
      <p className='text-3xl'>ProductsList</p>
      <div className='flex flex-col'>
        {products && products.map(product => (
          <ProductCard key={product.name} product={product} />
        ))}
      </div>

    </section>
  );
};

export default ProductsList;