import { call, fork, put, take } from 'redux-saga/effects';
import { authActions } from './authSlice';
import { PayloadAction } from '@reduxjs/toolkit';
import authService from '@/services/AuthService';
import { CLEAR_LOCALSTORAGE, SET_LOCALSTORAGE } from '@/utils/constants';

export interface ResponseGenerator {
  config?: Record<string, any>;
  data?: any;
  headers?: Record<string, any>;
  request?: any;
  status?: number;
  statusText?: string;
}

export interface LoginFormType {
  email: string;
  password: string;
}

export function* handleLogin(payload: LoginFormType) {
  try {
    const res: ResponseGenerator = yield call(authService.login, payload);

    SET_LOCALSTORAGE(res);

    yield put(
      authActions.loginSuccess({
        ...res.data,
        loggedIn: true,
      }),
    );
  } catch (error) {
    yield put(authActions.loginFailed());
  }
}

function* handleLogout() {
  CLEAR_LOCALSTORAGE();
  yield put(authActions.logout());
}

function* watchLoginFlow() {
  while (true) {
    let isLoggedIn = false;

    if (!isLoggedIn) {
      const action: PayloadAction<LoginFormType> = yield take(
        authActions.login.type,
      );

      yield fork(handleLogin, action.payload);
      continue;
    }

    yield take(authActions.logout.type);
    yield call(handleLogout);
  }
}

export default function* authSaga() {
  yield fork(watchLoginFlow);
}
