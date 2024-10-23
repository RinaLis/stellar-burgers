import { createSlice, createAsyncThunk, nanoid } from '@reduxjs/toolkit';
import { TConstructorIngredient, TOrder } from '@utils-types';
import { orderBurgerApi } from '@api';

export interface constructorState {
  isLoadingConstructor: boolean;
  error: string | null;
  constructorItems: {
    bun: TConstructorIngredient | null;
    ingredients: TConstructorIngredient[];
  };
  orderRequest: boolean;
  orderModalData: TOrder | null;
}

const initialState: constructorState = {
  isLoadingConstructor: false,
  error: null,
  constructorItems: {
    bun: null,
    ingredients: []
  },
  orderRequest: false,
  orderModalData: null
};

const constructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: (state, { payload }) => {
      if (payload.type === 'bun') {
        state.constructorItems.bun = payload;
      } else {
        state.constructorItems.ingredients.push({
          ...payload,
          id: nanoid()
        });
      }
    },
    removeIngredient: (state, action) => {
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter(
          (ingredient) => ingredient.id != action.payload
        );
    },
    setOrderRequest: (state, action) => {
      state.orderRequest = action.payload;
    },
    setNullOrderModalData: (state) => {
      state.orderModalData = null;
    },

    moveIngredientDown: (state, action) => {
      [
        state.constructorItems.ingredients[action.payload],
        state.constructorItems.ingredients[action.payload + 1]
      ] = [
        state.constructorItems.ingredients[action.payload + 1],
        state.constructorItems.ingredients[action.payload]
      ];
    },
    moveIngredientUp: (state, action) => {
      [
        state.constructorItems.ingredients[action.payload],
        state.constructorItems.ingredients[action.payload - 1]
      ] = [
        state.constructorItems.ingredients[action.payload - 1],
        state.constructorItems.ingredients[action.payload]
      ];
    }
  },
  selectors: {
    getConstructorState: (state) => state
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAddOrder.pending, (state) => {
        state.isLoadingConstructor = true;
        state.error = null;
      })
      .addCase(fetchAddOrder.rejected, (state, { error }) => {
        state.isLoadingConstructor = false;
        state.error = error.message as string;
      })
      .addCase(fetchAddOrder.fulfilled, (state, { payload }) => {
        state.isLoadingConstructor = false;
        state.error = null;
        state.orderRequest = false;
        state.orderModalData = payload.order;
        state.constructorItems = {
          bun: null,
          ingredients: []
        };
      });
  }
});

export const fetchAddOrder = createAsyncThunk(
  'constructor/addOrder',
  (data: string[]) => orderBurgerApi(data)
);

export { initialState as constructorInitialState };
export const {
  addIngredient,
  removeIngredient,
  setOrderRequest,
  setNullOrderModalData,
  moveIngredientDown,
  moveIngredientUp
} = constructorSlice.actions;

export const { getConstructorState } = constructorSlice.selectors;

export default constructorSlice.reducer;
