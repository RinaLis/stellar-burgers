import { combineReducers, configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

import ingredientsSliceReducer from './slices/ingredientsSlice';
import allOrdersSliceReducer from './slices/allOrdersSlice';
import userOrdersSliceReducer from './slices/userOrdersSlice';
import orderSliceReducer from './slices/orderSlice';
import userSliceReducer from './slices/userSlice';
import constructorReducer from './slices/constructorSlice';

export const rootReducer = combineReducers({
  ingredients: ingredientsSliceReducer, //
  allOrders: allOrdersSliceReducer, //
  userOrders: userOrdersSliceReducer,
  order: orderSliceReducer, //
  user: userSliceReducer, //
  burgerConstructor: constructorReducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
