import { getFeedsApi } from '@api';
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

const allOrdersSlice = createSlice({
  name: 'allOrders',
  initialState,
  reducers: {},
  selectors: {
    getFeedState: (sliceState) => sliceState
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllOrders.pending, (state) => {
        state.orders = [];
        state.total = 0;
        state.totalToday = 0;
        state.isOrdersLoading = true;
        state.error = null;
      })
      .addCase(fetchAllOrders.rejected, (state, { error }) => {
        state.orders = [];
        state.total = 0;
        state.totalToday = 0;
        state.isOrdersLoading = false;
        state.error = error.message as string;
      })
      .addCase(fetchAllOrders.fulfilled, (state, { payload }) => {
        state.isOrdersLoading = false;
        state.error = null;
        state.orders = payload.orders;
        state.total = payload.total;
        state.totalToday = payload.totalToday;
      });
  }
});

export const fetchAllOrders = createAsyncThunk(
  'orders/getAllOrders',
  getFeedsApi
);

export const { getFeedState } = allOrdersSlice.selectors;

export default allOrdersSlice.reducer;
