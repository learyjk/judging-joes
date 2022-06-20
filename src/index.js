import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import App from './components/App';
import ProductsList from './features/products/ProductsList';
import ProductDetail from './features/products/ProductDetail';

import './index.css'
import AddProductForm from './features/products/AddProductForm';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<ProductsList />} />
          <Route path=":productSlug" element={<ProductDetail />} />
          <Route path="add" element={<AddProductForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>
);
