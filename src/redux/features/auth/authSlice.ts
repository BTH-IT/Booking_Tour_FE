import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoginFormType } from './authSaga';
import { toast } from 'react-toastify';
export interface AuthState {
  isLoggedIn: boolean;
  loggedIn?: boolean;
  account?: any;
  user?: any;
  accessToken: string;
  refreshToken: string;
}

const initialState: AuthState = {
  isLoggedIn: Boolean(localStorage.getItem('access_token')),
  account: JSON.parse(localStorage.getItem('current_account') || '{}'),
  user: JSON.parse(localStorage.getItem('current_user') || '{}'),
  accessToken: localStorage.getItem('access_token') || '',
  refreshToken: localStorage.getItem('refresh_token') || '',
  loggedIn: false,
};

const authSlide = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, payload: PayloadAction<LoginFormType>) => {},
    refreshToken: (
      state,
      payload: PayloadAction<{ refreshToken: string }>,
    ) => {},
    updateAccessToken: (
      state,
      payload: PayloadAction<{ accessToken: string }>,
    ) => {
      return {
        ...state,
        accessToken: payload.payload.accessToken,
      };
    },
    updateAccount: (state, payload: PayloadAction<{ account: any }>) => {
      return {
        ...state,
        account: {
          ...state.account,
          ...payload.payload.account,
        },
      };
    },
    updateUser: (state, payload: PayloadAction<{ user: any }>) => {
      return {
        ...state,
        user: {
          ...state.user,
          ...payload.payload.user,
        },
      };
    },
    loginSuccess: (state, payload: PayloadAction<AuthState>) => {
      toast.success('Login Success!!');
      return {
        ...state,
        ...payload.payload,
      };
    },
    logout: (state) => {
      state.accessToken = '';
      state.refreshToken = '';
      state.account = {};
      state.user = {};
      state.loggedIn = false;
    },
    loginFailed: (state) => {
      toast.error('Login Failure!!');
      state.accessToken = '';
      state.refreshToken = '';
      state.account = {};
      state.user = {};
      state.loggedIn = false;
    },
  },
});

// Actions
export const authActions = authSlide.actions;

// Selectors
export const selectAuth = (state: any) => state.auth;

// Reducer
const authReducer = authSlide.reducer;
export default authReducer;
