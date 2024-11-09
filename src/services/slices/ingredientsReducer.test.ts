import { expect, test, describe } from '@jest/globals';
import { configureStore } from '@reduxjs/toolkit';
import ingredientsReducer, { fetchIngredients } from './ingredientsSlice';

const setupStore = () =>
  configureStore({
    reducer: {
      ingredients: ingredientsReducer
    }
  });

const testIngredientsResponse = {
  success: true,
  data: [
    {
      _id: '643d69a5c3f7b9001cfa0942',
      name: 'Соус Spicy-X',
      type: 'sauce',
      proteins: 30,
      fat: 20,
      carbohydrates: 40,
      calories: 30,
      price: 90,
      image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
      __v: 0
    },
    {
      _id: '643d69a5c3f7b9001cfa093f',
      name: 'Мясо бессмертных моллюсков Protostomia',
      type: 'main',
      proteins: 433,
      fat: 244,
      carbohydrates: 33,
      calories: 420,
      price: 1337,
      image: 'https://code.s3.yandex.net/react/code/meat-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-02-large.png',
      __v: 0
    }
  ]
};

describe('Проверка редьюсеров слайса ингредиентов', () => {
  test('Тест экшена ожидания ответа после запроса', () => {
    const store = setupStore();
    store.dispatch({ type: fetchIngredients.pending.type });

    const state = store.getState();
    expect(state.ingredients.isIngredientsLoading).toBeTruthy();
    expect(state.ingredients.ingredients.length).toEqual(0);
    expect(state.ingredients.error).toBeNull();
  });
  test('Тест экшена успешного ответа', () => {
    const store = setupStore();
    store.dispatch({
      type: fetchIngredients.fulfilled.type,
      payload: testIngredientsResponse
    });

    const state = store.getState();
    expect(state.ingredients.isIngredientsLoading).toBeFalsy();
    expect(state.ingredients.ingredients).toEqual(testIngredientsResponse.data);
    expect(state.ingredients.error).toBeNull();
  });
  test('Тест экшена ошибки после запроса', () => {
    const store = setupStore();
    const error = 'test error';
    store.dispatch({
      type: fetchIngredients.rejected.type,
      error: { message: error }
    });

    const state = store.getState();
    expect(state.ingredients.ingredients.length).toEqual(0);
    expect(state.ingredients.isIngredientsLoading).toBeFalsy();
    expect(state.ingredients.error).toBe(error);
  });
});
