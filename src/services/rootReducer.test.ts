import { expect, test, describe } from '@jest/globals';
import { rootReducer } from '@store';
import {
  allOrdersInitialState,
  constructorInitialState,
  ingredientsInitialState,
  orderInitialState,
  userInitialState,
  userOrdersInitialState
} from '@slices';

describe('Тест rootReducer', () => {
  const initialState = {
    ingredients: { ...ingredientsInitialState },
    allOrders: { ...allOrdersInitialState },
    userOrders: { ...userOrdersInitialState },
    order: { ...orderInitialState },
    user: { ...userInitialState },
    burgerConstructor: { ...constructorInitialState }
  };
  test('Тест инициализации rootReducer', () => {
    const state = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(state).toEqual(initialState);
  });
});
