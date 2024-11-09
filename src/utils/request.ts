import { setCookie } from './cookie';

export const BASE_URL = process.env.BURGER_API_URL;

type TServerResponse<T> = {
  success: boolean;
} & T;

type TRefreshResponse = TServerResponse<{
  refreshToken: string;
  accessToken: string;
}>;

// создаем функцию проверки ответа на `ok`
const checkResponse = <T>(res: Response): Promise<TServerResponse<T>> => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
};

// создаем функцию проверки на `success`
const checkSuccess = <U>(
  res: TServerResponse<U>
): Promise<TServerResponse<U>> | TServerResponse<U> => {
  if (res && res.success) {
    return res;
  }
  return Promise.reject(`Ответ не success: ${res}`);
};

// создаем универсальную фукнцию запроса с проверкой ответа и `success`
export const request = <T>(endpoint: string, options?: RequestInit) =>
  fetch(`${BASE_URL}/${endpoint}`, options)
    .then(checkResponse<T>)
    .then(checkSuccess<T>);

export const refreshToken = (): Promise<TRefreshResponse> =>
  fetch(`${BASE_URL}/auth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({
      token: localStorage.getItem('refreshToken')
    })
  })
    .then(checkResponse<TRefreshResponse>)
    .then((refreshData) => {
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      localStorage.setItem('refreshToken', refreshData.refreshToken);
      setCookie('accessToken', refreshData.accessToken);
      return refreshData;
    });

export const fetchWithRefresh = async <T>(
  endpoint: string,
  options: RequestInit
) => {
  try {
    const res = await fetch(`${BASE_URL}/${endpoint}`, options);
    return await checkResponse<T>(res);
  } catch (err) {
    if ((err as { message: string }).message === 'jwt expired') {
      const refreshData = await refreshToken();
      if (options.headers) {
        (options.headers as { [key: string]: string }).authorization =
          refreshData.accessToken;
      }
      const res = await fetch(`${BASE_URL}/${endpoint}`, options);
      return await checkResponse<T>(res);
    } else {
      return Promise.reject(err);
    }
  }
};
