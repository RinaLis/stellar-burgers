import { getCookie } from './cookie';
import { fetchWithRefresh, request } from './request';
import { TIngredient, TOrder, TUser } from './types';

type TIngredientsData = {
  data: TIngredient[];
};

type TFeedsData = {
  orders: TOrder[];
  total: number;
  totalToday: number;
};

export const getIngredientsApi = () => request<TIngredientsData>('ingredients');

export const getFeedsApi = () => request<TFeedsData>(`orders/all`);

export const getOrdersApi = () =>
  fetchWithRefresh<TFeedsData>(`orders`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      authorization: getCookie('accessToken')
    } as HeadersInit
  }).then((data) => {
    if (data?.success) return data;
    return Promise.reject(data);
  });

type TNewOrderData = {
  order: TOrder;
  name: string;
};

export const orderBurgerApi = (data: string[]) =>
  fetchWithRefresh<TNewOrderData>(`orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      authorization: getCookie('accessToken')
    } as HeadersInit,
    body: JSON.stringify({
      ingredients: data
    })
  }).then((data) => {
    if (data?.success) return data;
    return Promise.reject(data);
  });

type TOrderData = {
  orders: TOrder[];
};

export const getOrderByNumberApi = (number: number) =>
  request<TOrderData>(`orders/${number}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });

export type TRegisterData = {
  email: string;
  name: string;
  password: string;
};

type TAuthData = {
  refreshToken: string;
  accessToken: string;
  user: TUser;
};

export const registerUserApi = (data: TRegisterData) =>
  request<TAuthData>(`auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(data)
  });

export type TLoginData = {
  email: string;
  password: string;
};

export const loginUserApi = (data: TLoginData) =>
  request<TAuthData>(`auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(data)
  });

export const forgotPasswordApi = (data: { email: string }) =>
  request<{}>(`password-reset`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(data)
  });

export const resetPasswordApi = (data: { password: string; token: string }) =>
  request<{}>(`password-reset/reset`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(data)
  });

type TUserData = { user: TUser };

export const getUserApi = () =>
  fetchWithRefresh<TUserData>(`auth/user`, {
    headers: {
      authorization: getCookie('accessToken')
    } as HeadersInit
  });

export const updateUserApi = (user: Partial<TRegisterData>) =>
  fetchWithRefresh<TUserData>(`auth/user`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      authorization: getCookie('accessToken')
    } as HeadersInit,
    body: JSON.stringify(user)
  });

export const logoutApi = () =>
  request<{}>(`auth/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({
      token: localStorage.getItem('refreshToken')
    })
  });
