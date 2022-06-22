import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts, selectProductsByFilterAndSort } from './productsSlice';
import ProductCard from './ProductCard';

const ProductsList = () => {
  const [filterText, setFilterText] = useState('')
  const [sortValue, setSortValue] = useState('ratingHighToLow')

  const dispatch = useDispatch()
  const filteredSortedProducts = useSelector(state => selectProductsByFilterAndSort(state, filterText, sortValue))

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  const handleFilterChange = (e) => setFilterText(e.target.value.toLocaleLowerCase())
  const handleSortChange = (e) => setSortValue(e.target.value)

  return (
    <section className='container max-w-xl'>
      <div className='flex flex-col sm:flex-row gap-4 mb-4'>
        <div className='relative'>
          <label className='absolute left-2 -top-3 bg-white rounded-md  py-0.5 px-1 text-xs uppercase border-slate-400 border' htmlFor="filter">Sort: </label>
          <select className=' w-full md:w-48 rounded-md border py-2 px-2 border-slate-400' onChange={handleSortChange}>
            <option value="ratingHighToLow">Rating: High to Low</option>
            <option value="ratingLowToHigh">Rating: Low to High</option>
          </select>
        </div>

        <div className='flex flex-col relative w-full'>
          <label className='absolute left-2 -top-3 bg-white rounded-md  py-0.5 px-1 text-xs uppercase border-slate-400 border' htmlFor="filter">Filter: </label>
          <input
            className='flex-grow border border-slate-400 rounded-md py-2 px-2'
            type="text"
            id="filter"
            name="filter"
            value={filterText}
            onChange={handleFilterChange}
          />
        </div>
      </div>
      <div className='flex flex-col gap-4'>
        {filteredSortedProducts && filteredSortedProducts.map(product => (
          <ProductCard key={product.name} product={product} />
        ))}
      </div>

    </section>
  );
};

export default ProductsList;