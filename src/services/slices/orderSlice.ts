import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getOrderByNumberApi } from '@api';
import { TOrder } from '@utils-types';

export interface OrderState {
  isLoading: boolean;
  orderData: TOrder | null;
  error: string | null;
}

const initialState: OrderState = {
  isLoading: false,
  orderData: null,
  error: null
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  selectors: { getOrderState: (state) => state },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGetOrder.pending, (state) => {
        state.isLoading = true;
        state.orderData = null;
        state.error = null;
      })
      .addCase(fetchGetOrder.rejected, (state, { error }) => {
        state.isLoading = false;
        state.orderData = null;
        state.error = error.message as string;
      })
      .addCase(fetchGetOrder.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        state.orderData = payload.orders[0];
      });
  }
});

export const fetchGetOrder = createAsyncThunk(
  'feed/getOrder',
  (number: number) => getOrderByNumberApi(number)
);

export const { getOrderState } = orderSlice.selectors;

export default orderSlice.reducer;
