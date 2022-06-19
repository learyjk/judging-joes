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
    <div className='container mx-auto'>
      <p className='text-3xl'>ProductsList</p>
      <div className='grid grid-cols-4 gap-4'>
        {products && products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

    </div>
  );
};

export default ProductsList;