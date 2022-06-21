import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectAllProducts, fetchProducts } from './productsSlice';
import ProductCard from './ProductCard';

const ProductsList = () => {

  const dispatch = useDispatch()
  const products = useSelector(selectAllProducts)
  const productsStatus = useSelector(state => state.products.status)

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  //console.log(products)

  return (
    <section className='container max-w-xl'>
      <div className='flex flex-col gap-4'>
        {products && products.map(product => (
          <ProductCard key={product.name} product={product} />
        ))}
      </div>

    </section>
  );
};

export default ProductsList;