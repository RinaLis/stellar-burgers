import { expect, test, describe } from '@jest/globals';
import { configureStore } from '@reduxjs/toolkit';
import userOrdersReducer, { fetchUserOrders } from './userOrdersSlice';

const setupStore = () =>
  configureStore({
    reducer: {
      userOrders: userOrdersReducer
    }
  });

const testUserOrdersResponse = {
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

describe('Проверка редьюсеров слайса всех заказов конкретного пользователя', () => {
  test('Тест экшена ожидания ответа после запроса', () => {
    const store = setupStore();
    store.dispatch({ type: fetchUserOrders.pending.type });

    const state = store.getState();
    expect(state.userOrders.orders.length).toEqual(0);
    expect(state.userOrders.total).toEqual(0);
    expect(state.userOrders.totalToday).toEqual(0);
    expect(state.userOrders.isOrdersLoading).toBeTruthy();
    expect(state.userOrders.error).toBeNull();
  });
  test('Тест экшена успешного ответа', () => {
    const store = setupStore();
    store.dispatch({
      type: fetchUserOrders.fulfilled.type,
      payload: testUserOrdersResponse
    });

    const state = store.getState();
    expect(state.userOrders.isOrdersLoading).toBeFalsy();
    expect(state.userOrders.orders).toEqual(testUserOrdersResponse.orders);
    expect(state.userOrders.total).toEqual(testUserOrdersResponse.total);
    expect(state.userOrders.totalToday).toEqual(
      testUserOrdersResponse.totalToday
    );
    expect(state.userOrders.error).toBeNull();
  });
  test('Тест экшена ошибки после запроса', () => {
    const store = setupStore();
    const error = 'test error';
    store.dispatch({
      type: fetchUserOrders.rejected.type,
      error: { message: error }
    });

    const state = store.getState();
    expect(state.userOrders.orders.length).toEqual(0);
    expect(state.userOrders.total).toEqual(0);
    expect(state.userOrders.totalToday).toEqual(0);
    expect(state.userOrders.isOrdersLoading).toBeFalsy();
    expect(state.userOrders.error).toBe(error);
  });
});
