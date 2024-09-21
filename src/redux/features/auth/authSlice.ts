import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoginFormType } from './authSaga';
import { toast } from 'react-toastify';
import { KEY_LOCALSTORAGE } from '@/utils/constants';
import { RootState } from '@/redux/store';
export interface AuthState {
  isLoggedIn: boolean;
  account?: any;
  user?: any;
  accessToken: string;
  refreshToken: string;
}

const initialState: AuthState = {
  isLoggedIn: Boolean(localStorage.getItem(KEY_LOCALSTORAGE.CURRENT_USER)),
  account: JSON.parse(
    localStorage.getItem(KEY_LOCALSTORAGE.CURRENT_ACCOUNT) || '{}',
  ),
  user: JSON.parse(localStorage.getItem(KEY_LOCALSTORAGE.CURRENT_USER) || '{}'),
  accessToken: localStorage.getItem(KEY_LOCALSTORAGE.ACCESS_TOKEN) || '',
  refreshToken: localStorage.getItem(KEY_LOCALSTORAGE.REFRESH_TOKEN) || '',
};

const authSlide = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (
      state,
      payload: PayloadAction<
        LoginFormType & {
          actionSuccess: () => void;
        }
      >,
    ) => {},
    refreshToken: (
      state,
      payload: PayloadAction<{ refreshToken: string }>,
    ) => {},
    updateAccessToken: (
      state,
      { payload }: PayloadAction<{ accessToken: string }>,
    ) => {
      state.accessToken = payload.accessToken;
    },
    updateAccount: (state, { payload }: PayloadAction<{ account: any }>) => {
      state.account = payload.account;
    },
    updateUser: (state, { payload }: PayloadAction<{ user: any }>) => {
      state.user = payload.user;
    },
    loginSuccess: (
      state,
      {
        payload,
      }: PayloadAction<
        AuthState & {
          actionSuccess: () => void;
        }
      >,
    ) => {
      const { actionSuccess, ...rest } = payload;
      actionSuccess();

      return {
        ...state,
        ...rest,
      };
    },
    logout: (state) => {
      toast.success('Logout Success!!');
      state.accessToken = '';
      state.refreshToken = '';
      state.account = {};
      state.user = {};
      state.isLoggedIn = false;
      window.location.href = '/';
    },
    loginFailed: (state) => {
      toast.error('Login Failure!!');
      state.accessToken = '';
      state.refreshToken = '';
      state.account = {};
      state.user = {};
      state.isLoggedIn = false;
    },
  },
});

// Actions
export const authActions = authSlide.actions;

// Selectors
export const selectAuth = (state: RootState) => state.auth;

// Reducer
const authReducer = authSlide.reducer;
export default authReducer;
