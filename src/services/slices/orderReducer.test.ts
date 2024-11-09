import { expect, test, describe } from '@jest/globals';
import { configureStore } from '@reduxjs/toolkit';
import orderReducer, { fetchGetOrder } from './orderSlice';

const setupStore = () =>
  configureStore({
    reducer: {
      order: orderReducer
    }
  });

const testOrderResponse = {
  success: true,
  orders: [
    {
      __v: 0,
      _id: '6725af8db27b06001c3e5e0a',
      createdAt: '2024-11-02T04:50:21.846Z',
      ingredients: [
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa0941',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa093f',
        '643d69a5c3f7b9001cfa0940',
        '643d69a5c3f7b9001cfa093c'
      ],
      name: 'Краторный люминесцентный бессмертный био-марсианский метеоритный бургер',
      number: 58411,
      owner: '6725af6ab27b06001c3e5e08',
      status: 'done',
      updatedAt: '2024-11-02T04:50:22.739Z'
    }
  ]
};

describe('Проверка редьюсеров слайса одного заказа', () => {
  test('Тест экшена ожидания ответа после запроса', () => {
    const store = setupStore();
    store.dispatch({ type: fetchGetOrder.pending.type });

    const state = store.getState();
    expect(state.order.isLoading).toBeTruthy();
    expect(state.order.orderData).toBeNull();
    expect(state.order.error).toBeNull();
  });
  test('Тест экшена успешного ответа', () => {
    const store = setupStore();
    store.dispatch({
      type: fetchGetOrder.fulfilled.type,
      payload: testOrderResponse
    });

    const state = store.getState();
    expect(state.order.isLoading).toBeFalsy();
    expect(state.order.orderData).toEqual(testOrderResponse.orders[0]);
    expect(state.order.error).toBeNull();
  });
  test('Тест экшена ошибки после запроса', () => {
    const store = setupStore();
    const error = 'test error';
    store.dispatch({
      type: fetchGetOrder.rejected.type,
      error: { message: error }
    });

    const state = store.getState();
    expect(state.order.orderData).toBeNull();
    expect(state.order.isLoading).toBeFalsy();
    expect(state.order.error).toBe(error);
  });
});
