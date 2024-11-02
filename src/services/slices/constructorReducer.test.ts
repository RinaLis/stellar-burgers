import { expect, test, describe } from '@jest/globals';
import constructorReducer, {
  addIngredient,
  removeIngredient,
  moveIngredientDown,
  moveIngredientUp,
  constructorInitialState
} from './constructorSlice';
import { nanoid } from '@reduxjs/toolkit';

jest.mock('@reduxjs/toolkit', () => ({
  ...jest.requireActual('@reduxjs/toolkit'),
  nanoid: jest.fn(() => 'testid')
}));

const testBun = {
  _id: '643d69a5c3f7b9001cfa093d',
  name: 'Флюоресцентная булка R2-D3',
  type: 'bun',
  proteins: 44,
  fat: 26,
  carbohydrates: 85,
  calories: 643,
  price: 988,
  image: 'https://code.s3.yandex.net/react/code/bun-01.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png'
};

const testIngredientFirst = {
  _id: '643d69a5c3f7b9001cfa0949',
  name: 'Мини-салат Экзо-Плантаго',
  type: 'main',
  proteins: 1,
  fat: 2,
  carbohydrates: 3,
  calories: 6,
  price: 4400,
  image: 'https://code.s3.yandex.net/react/code/salad.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/salad-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/salad-large.png'
};

const testIngredientLast = {
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
  image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png'
};

const testConstructor = {
  bun: { ...testBun, id: 'testid' },
  ingredients: [
    {
      ...testIngredientFirst,
      id: 'testid1'
    },
    {
      ...testIngredientLast,
      id: 'testid2'
    }
  ]
};

const testConstructorMove = {
  bun: { ...testBun, id: 'testid' },
  ingredients: [
    {
      ...testIngredientLast,
      id: 'testid2'
    },
    {
      ...testIngredientFirst,
      id: 'testid1'
    }
  ]
};

describe('Тест экшенов конструктора бургеров', () => {
  describe('Добавление ингредиентов', () => {
    test('Добавление булки', () => {
      const state = constructorReducer(
        constructorInitialState,
        addIngredient(testBun)
      );

      expect(state.constructorItems.bun).toEqual({ ...testBun, id: 'testid' });
      expect(state.constructorItems.ingredients).toHaveLength(0);
      expect(nanoid).toHaveBeenCalled();
    });
  });
  test('Добавление ингредиента', () => {
    const state = constructorReducer(
      constructorInitialState,
      addIngredient(testIngredientFirst)
    );
    console.log(state);
    expect(state.constructorItems.ingredients[0]).toEqual({
      ...testIngredientFirst,
      id: 'testid'
    });
    expect(state.constructorItems.bun).toBeNull();
    expect(nanoid).toHaveBeenCalled();
  });
  describe('Перемещение ингередиентов', () => {
    test('Перемещение вниз', () => {
      const state = constructorReducer(
        { ...constructorInitialState, constructorItems: testConstructor },
        moveIngredientDown(0)
      );

      expect(state.constructorItems).toEqual(testConstructorMove);
      expect(state.constructorItems.bun).toEqual({ ...testBun, id: 'testid' });
    });
    test('Перемещение вверх', () => {
      const state = constructorReducer(
        { ...constructorInitialState, constructorItems: testConstructor },
        moveIngredientUp(1)
      );

      expect(state.constructorItems).toEqual(testConstructorMove);
      expect(state.constructorItems.bun).toEqual({ ...testBun, id: 'testid' });
    });
  });
  test('Удаление ингредиента', () => {
    const state = constructorReducer(
      { ...constructorInitialState, constructorItems: testConstructor },
      removeIngredient('testid1')
    );

    expect(state.constructorItems.ingredients).toHaveLength(1);
    expect(state.constructorItems.ingredients[0]).toEqual({
      ...testIngredientLast,
      id: 'testid2'
    });
    expect(state.constructorItems.bun).toEqual({ ...testBun, id: 'testid' });
  });
});
