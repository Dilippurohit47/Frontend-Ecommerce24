import { configureStore } from '@reduxjs/toolkit';
import { userAPI } from '../api/userAPI';
import { userReducer } from './userReducer';
import { productApi } from '../api/productApi';
import { cartReducer } from './cartReducer';
import { orderApi } from '../api/orderApi';
import { dashboardApi } from '../api/dashboardApi';

export const server = import.meta.env.VITE_SERVER;

export const store = configureStore({
  reducer: {
    [userAPI.reducerPath]: userAPI.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [dashboardApi.reducerPath]: dashboardApi.reducer,
    [userReducer.name]: userReducer.reducer,
    [cartReducer.name]: cartReducer.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializableCheck if needed
    }).concat(userAPI.middleware, productApi.middleware, orderApi.middleware, dashboardApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
