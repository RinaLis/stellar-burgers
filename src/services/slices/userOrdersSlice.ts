import { getOrdersApi } from '@api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { TOrder } from '@utils-types';

interface OrdersListState {
  orders: TOrder[];
  total: number;
  totalToday: number;
  isOrdersLoading: boolean;
  error: string | null;
}

const initialState: OrdersListState = {
  orders: [],
  total: 0,
  totalToday: 0,
  isOrdersLoading: true,
  error: null
};

const userOrdersSlice = createSlice({
  name: 'userOrders',
  initialState,
  reducers: {},
  selectors: {
    getUserOrdersSelector: (sliceState) => sliceState
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserOrders.pending, (state) => {
        state.orders = [];
        state.total = 0;
        state.totalToday = 0;
        state.isOrdersLoading = true;
        state.error = null;
      })
      .addCase(fetchUserOrders.rejected, (state, { error }) => {
        state.orders = [];
        state.total = 0;
        state.totalToday = 0;
        state.isOrdersLoading = false;
        state.error = error.message as string;
      })
      .addCase(fetchUserOrders.fulfilled, (state, { payload }) => {
        state.isOrdersLoading = false;
        state.error = null;
        state.orders = payload.orders;
        state.total = payload.total;
        state.totalToday = payload.totalToday;
      });
  }
});

export { initialState as userOrdersInitialState };

export const fetchUserOrders = createAsyncThunk(
  'userOrders/getUserOrders',
  getOrdersApi
);

export const { getUserOrdersSelector } = userOrdersSlice.selectors;

export default userOrdersSlice.reducer;
