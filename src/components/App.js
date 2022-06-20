import React from 'react';
import ProductsList from '../features/products/ProductsList';
import AddProductForm from '../features/products/AddProductForm';
import { Link, Outlet } from 'react-router-dom';

function App() {
  return (
    <div>
      <section className='container max-w-lg w-full'>
        <Link to={'/'}>
          <text className='text-3xl'>Judging Joe's!</text>
        </Link>
      </section>
      <Outlet />
    </div>

  );
}

export default App;
