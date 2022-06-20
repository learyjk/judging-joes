import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import productsReducer from '../features/products/productsSlice';
import reviewsReducer from '../features/reviews/reviewsSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    products: productsReducer,
    reviews: reviewsReducer,
  },
});
