import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { deleteCookie, setCookie } from '../../utils';

export interface UserState {
  isLoading: boolean;
  user: TUser | null;
  error: string | null;
}

const initialState: UserState = {
  isLoading: false,
  user: null,
  error: null
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUserError: (state) => {
      state.error = null;
    }
  },
  selectors: {
    getUserState: (sliceState) => sliceState,
    isAuthCheckedSelector: (sliceState) => sliceState.isLoading,
    userDataSelector: (sliceState) => sliceState.user,
    userErrorSelector: (sliceState) => sliceState.error
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoginUser.pending, (state) => {
        state.isLoading = true;
        state.user = null;
        state.error = null;
      })
      .addCase(fetchLoginUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.user = payload.user;
        state.error = null;
        setCookie('accessToken', payload.accessToken);
        localStorage.setItem('refreshToken', payload.refreshToken);
      })
      .addCase(fetchLoginUser.rejected, (state, { error }) => {
        state.user = null;
        state.isLoading = false;
        state.error = error.message as string;
      })
      .addCase(fetchRegisterUser.pending, (state) => {
        state.isLoading = true;
        state.user = null;
        state.error = null;
      })
      .addCase(fetchRegisterUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.user = payload.user;
        state.error = null;
        setCookie('accessToken', payload.accessToken);
        localStorage.setItem('refreshToken', payload.refreshToken);
      })
      .addCase(fetchRegisterUser.rejected, (state, { error }) => {
        state.user = null;
        state.isLoading = false;
        state.error = error.message as string;
      })
      .addCase(fetchLogoutUser.pending, (state) => {
        state.isLoading = true;
        state.user = null;
        state.error = null;
      })
      .addCase(fetchLogoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.error = null;
        deleteCookie('accessToken');
        localStorage.removeItem('refreshToken');
      })
      .addCase(fetchLogoutUser.rejected, (state, { error }) => {
        state.user = null;
        state.isLoading = false;
        state.error = error.message as string;
      })
      .addCase(fetchGetUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchGetUser.rejected, (state, { error }) => {
        state.isLoading = false;
        state.error = error.message as string;
        state.user = null;
      })
      .addCase(fetchGetUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        state.user = payload.user;
      })
      .addCase(fetchUpdateUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUpdateUser.rejected, (state, { error }) => {
        state.isLoading = false;
        state.error = error.message as string;
      })
      .addCase(fetchUpdateUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        state.user = payload.user;
      });
  }
});

export const fetchLoginUser = createAsyncThunk('user/login', loginUserApi);

export const fetchRegisterUser = createAsyncThunk(
  'user/register',
  registerUserApi
);

export const fetchLogoutUser = createAsyncThunk('user/logout', logoutApi);

export const fetchGetUser = createAsyncThunk('user/get', getUserApi);

export const fetchUpdateUser = createAsyncThunk(
  'user/updateUser',
  updateUserApi
);

export const {
  getUserState,
  isAuthCheckedSelector,
  userDataSelector,
  userErrorSelector
} = userSlice.selectors;

export const { clearUserError } = userSlice.actions;

export default userSlice.reducer;
