import { expect, test, describe } from '@jest/globals';
import { configureStore } from '@reduxjs/toolkit';
import userReducer, {
  fetchLoginUser,
  fetchRegisterUser,
  fetchLogoutUser,
  fetchGetUser,
  fetchUpdateUser
} from './userSlice';
import { getCookie } from '@cookie';

const setupStore = () =>
  configureStore({
    reducer: {
      user: userReducer
    }
  });

const testUserWithTokenResponse = {
  success: true,
  user: {
    email: 'Rina@yandex.ru',
    name: 'Rina Lis'
  },
  accessToken:
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MTZiMmE2ZDgyOWJlMDAxYzc3Nzg5OCIsImlhdCI6MTczMDUzMzg5OSwiZXhwIjoxNzMwNTM1MDk5fQ.aRT9RweUkUNmT9k_nyPvYGVlofPY7Yga1Viy5bWHOSE',
  refreshToken:
    'e4a46afabd2fd7d0e44c04c7b74115250dadc04e21fa0de8c71cb719751984768057269df46829d0'
};

const testUserResponse = {
  success: true,
  user: {
    email: 'Rina@yandex.ru',
    name: 'Rina Lis'
  }
};

describe('Проверка редьюсеров слайса пользователя', () => {
  describe('Проверка редьюсера получения пользователя', () => {
    test('Тест экшена ожидания ответа после запроса', () => {
      const store = setupStore();
      store.dispatch({ type: fetchGetUser.pending.type });

      const state = store.getState();
      expect(state.user.isLoading).toBeTruthy();
      expect(state.user.user).toBeNull();
      expect(state.user.error).toBeNull();
    });
    test('Тест экшена успешного ответа', () => {
      const store = setupStore();
      store.dispatch({
        type: fetchGetUser.fulfilled.type,
        payload: testUserResponse
      });

      const state = store.getState();
      expect(state.user.isLoading).toBeFalsy();
      expect(state.user.user).toEqual(testUserResponse.user);
      expect(state.user.error).toBeNull();
    });
    test('Тест экшена ошибки после запроса', () => {
      const store = setupStore();
      const error = 'test error';
      store.dispatch({
        type: fetchGetUser.rejected.type,
        error: { message: error }
      });

      const state = store.getState();
      expect(state.user.user).toBeNull();
      expect(state.user.isLoading).toBeFalsy();
      expect(state.user.error).toBe(error);
    });
  });
  describe('Проверка редьюсера авторизации пользователя', () => {
    test('Тест экшена ожидания ответа после запроса', () => {
      const store = setupStore();
      store.dispatch({ type: fetchLoginUser.pending.type });

      const state = store.getState();
      expect(state.user.isLoading).toBeTruthy();
      expect(state.user.user).toBeNull();
      expect(state.user.error).toBeNull();
    });
    test('Тест экшена успешного ответа', () => {
      const store = setupStore();
      store.dispatch({
        type: fetchLoginUser.fulfilled.type,
        payload: testUserWithTokenResponse
      });

      const state = store.getState();
      expect(state.user.isLoading).toBeFalsy();
      expect(state.user.user).toEqual(testUserWithTokenResponse.user);
      expect(state.user.error).toBeNull();
      expect(getCookie('accessToken')).toBe(
        testUserWithTokenResponse.accessToken
      );
      expect(localStorage.getItem('refreshToken')).toBe(
        testUserWithTokenResponse.refreshToken
      );
    });
    test('Тест экшена ошибки после запроса', () => {
      const store = setupStore();
      const error = 'test error';
      store.dispatch({
        type: fetchLoginUser.rejected.type,
        error: { message: error }
      });

      const state = store.getState();
      expect(state.user.user).toBeNull();
      expect(state.user.isLoading).toBeFalsy();
      expect(state.user.error).toBe(error);
    });
  });
  describe('Проверка редьюсера регистрации пользователя', () => {
    test('Тест экшена ожидания ответа после запроса', () => {
      const store = setupStore();
      store.dispatch({ type: fetchRegisterUser.pending.type });

      const state = store.getState();
      expect(state.user.isLoading).toBeTruthy();
      expect(state.user.user).toBeNull();
      expect(state.user.error).toBeNull();
    });
    test('Тест экшена успешного ответа', () => {
      const store = setupStore();
      store.dispatch({
        type: fetchRegisterUser.fulfilled.type,
        payload: testUserWithTokenResponse
      });

      const state = store.getState();
      expect(state.user.isLoading).toBeFalsy();
      expect(state.user.user).toEqual(testUserWithTokenResponse.user);
      expect(state.user.error).toBeNull();
      expect(getCookie('accessToken')).toBe(
        testUserWithTokenResponse.accessToken
      );
      expect(localStorage.getItem('refreshToken')).toBe(
        testUserWithTokenResponse.refreshToken
      );
    });
    test('Тест экшена ошибки после запроса', () => {
      const store = setupStore();
      const error = 'test error';
      store.dispatch({
        type: fetchRegisterUser.rejected.type,
        error: { message: error }
      });

      const state = store.getState();
      expect(state.user.user).toBeNull();
      expect(state.user.isLoading).toBeFalsy();
      expect(state.user.error).toBe(error);
    });
  });
  describe('Проверка редьюсера выхода пользователя из профиля', () => {
    test('Тест экшена ожидания ответа после запроса', () => {
      const store = setupStore();
      store.dispatch({ type: fetchLogoutUser.pending.type });

      const state = store.getState();
      expect(state.user.isLoading).toBeTruthy();
      expect(state.user.user).toBeNull();
      expect(state.user.error).toBeNull();
    });
    test('Тест экшена успешного ответа', () => {
      const store = setupStore();
      store.dispatch({
        type: fetchLogoutUser.fulfilled.type
      });

      const state = store.getState();
      expect(state.user.isLoading).toBeFalsy();
      expect(state.user.user).toBeNull();
      expect(state.user.error).toBeNull();
      expect(getCookie('accessToken')).toBeUndefined();
      expect(localStorage.getItem('refreshToken')).toBeNull();
    });
    test('Тест экшена ошибки после запроса', () => {
      const store = setupStore();
      const error = 'test error';
      store.dispatch({
        type: fetchLogoutUser.rejected.type,
        error: { message: error }
      });

      const state = store.getState();
      expect(state.user.user).toBeNull();
      expect(state.user.isLoading).toBeFalsy();
      expect(state.user.error).toBe(error);
    });
  });
  describe('Проверка редьюсера изменения данных пользователя', () => {
    test('Тест экшена ожидания ответа после запроса', () => {
      const store = setupStore();
      store.dispatch({ type: fetchUpdateUser.pending.type });

      const state = store.getState();
      expect(state.user.isLoading).toBeTruthy();
      expect(state.user.user).toBeNull();
      expect(state.user.error).toBeNull();
    });
    test('Тест экшена успешного ответа', () => {
      const store = setupStore();
      store.dispatch({
        type: fetchUpdateUser.fulfilled.type,
        payload: testUserResponse
      });

      const state = store.getState();
      expect(state.user.isLoading).toBeFalsy();
      expect(state.user.user).toEqual(testUserResponse.user);
      expect(state.user.error).toBeNull();
    });
    test('Тест экшена ошибки после запроса', () => {
      const store = setupStore();
      const error = 'test error';
      store.dispatch({
        type: fetchUpdateUser.rejected.type,
        error: { message: error }
      });

      const state = store.getState();
      expect(state.user.user).toBeNull();
      expect(state.user.isLoading).toBeFalsy();
      expect(state.user.error).toBe(error);
    });
  });
});
