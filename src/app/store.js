import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../features/products/productsSlice';
import reviewsReducer from '../features/reviews/reviewsSlice';
import userReducer from '../features/user/userSlice'

export const store = configureStore({
  reducer: {
    products: productsReducer,
    reviews: reviewsReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['user/setUser'],
        // Ignore these field paths in all actions
        ignoredActionPaths: ['payload'],
        // Ignore these paths in the state
        ignoredPaths: ['user.user'],
      },
    }),
});
