import { expect, test, describe } from '@jest/globals';
import { configureStore } from '@reduxjs/toolkit';
import allOrdersReducer, { fetchAllOrders } from './allOrdersSlice';

const setupStore = () =>
  configureStore({
    reducer: {
      allOrders: allOrdersReducer
    }
  });

const testAllOrdersResponse = {
  success: true,
  orders: [
    {
      __id: '6725b09db27b06001c3e5e0c',
      createdAt: '2024-11-02T04:54:53.588Z',
      ingredients: [
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa093c'
      ],
      name: 'Краторный люминесцентный бургер',
      number: 58412,
      status: 'done',
      updatedAt: '2024-11-02T04:54:54.242Z'
    },
    {
      _id: '6725a6d5b27b06001c3e5dfd',
      createdAt: '2024-11-02T04:13:09.794Z',
      ingredients: [
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa093c'
      ],
      name: 'Краторный люминесцентный бургер',
      number: 58409,
      status: 'done',
      updatedAt: '2024-11-02T04:13:10.755Z'
    }
  ],
  total: 2,
  totalToday: 1
};

describe('Проверка редьюсеров слайса всех заказов', () => {
  test('Тест экшена ожидания ответа после запроса', () => {
    const store = setupStore();
    store.dispatch({ type: fetchAllOrders.pending.type });

    const state = store.getState();
    expect(state.allOrders.orders.length).toEqual(0);
    expect(state.allOrders.total).toEqual(0);
    expect(state.allOrders.totalToday).toEqual(0);
    expect(state.allOrders.isOrdersLoading).toBeTruthy();
    expect(state.allOrders.error).toBeNull();
  });
  test('Тест экшена успешного ответа', () => {
    const store = setupStore();
    store.dispatch({
      type: fetchAllOrders.fulfilled.type,
      payload: testAllOrdersResponse
    });

    const state = store.getState();
    expect(state.allOrders.isOrdersLoading).toBeFalsy();
    expect(state.allOrders.orders).toEqual(testAllOrdersResponse.orders);
    expect(state.allOrders.total).toEqual(testAllOrdersResponse.total);
    expect(state.allOrders.totalToday).toEqual(
      testAllOrdersResponse.totalToday
    );
    expect(state.allOrders.error).toBeNull();
  });
  test('Тест экшена ошибки после запроса', () => {
    const store = setupStore();
    const error = 'test error';
    store.dispatch({
      type: fetchAllOrders.rejected.type,
      error: { message: error }
    });

    const state = store.getState();
    expect(state.allOrders.orders.length).toEqual(0);
    expect(state.allOrders.total).toEqual(0);
    expect(state.allOrders.totalToday).toEqual(0);
    expect(state.allOrders.isOrdersLoading).toBeFalsy();
    expect(state.allOrders.error).toBe(error);
  });
});
