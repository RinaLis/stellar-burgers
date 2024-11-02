import { getIngredientsApi } from '@api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { TIngredient } from '@utils-types';

interface IngredientsListState {
  ingredients: TIngredient[];
  isIngredientsLoading: boolean;
  error: string | null;
}

const initialState: IngredientsListState = {
  ingredients: [],
  isIngredientsLoading: true,
  error: null
};

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    getIngredientsState: (sliceState) => sliceState
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.isIngredientsLoading = true;
        state.ingredients = [];
        state.error = null;
      })
      .addCase(fetchIngredients.fulfilled, (state, { payload }) => {
        state.isIngredientsLoading = false;
        state.ingredients = payload.data;
        state.error = null;
      })
      .addCase(fetchIngredients.rejected, (state, { error }) => {
        state.ingredients = [];
        state.isIngredientsLoading = false;
        state.error = error.message as string;
      });
  }
});

export { initialState as ingredientsInitialState };

export const fetchIngredients = createAsyncThunk(
  'ingredients/getIngredients',
  getIngredientsApi
);

export const { getIngredientsState } = ingredientsSlice.selectors;

export default ingredientsSlice.reducer;
