import { call, fork, put, take } from 'redux-saga/effects';
import { authActions } from './authSlice';
import { PayloadAction } from '@reduxjs/toolkit';
import authService from '@/services/AuthService';
import jwt_decode from 'jwt-decode';

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

    localStorage.setItem('access_token', res.data.accessToken);
    localStorage.setItem('current_user', JSON.stringify(res.data.user));
    localStorage.setItem('current_account', JSON.stringify(res.data.account));
    localStorage.setItem('refresh_token', res.data.refreshToken);

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
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('current_user');
  localStorage.removeItem('current_account');
  yield put(authActions.logout());
}

function* handleRefreshToken(refreshToken: string) {
  try {
    const res: ResponseGenerator = yield call(
      authService.refresh,
      refreshToken,
    );

    localStorage.setItem('access_token', res.data.accessToken);

    yield put(
      authActions.updateAccessToken({
        accessToken: res.data.accessToken,
      }),
    );
  } catch (error) {
    yield put(authActions.loginFailed());
  }
}

function* watchLoginFlow() {
  while (true) {
    let isLoggedIn = false;

    const refreshToken = localStorage.getItem('refresh_token') || '';

    if (refreshToken) {
      const now = Math.floor(Date.now() / 1000);
      const refreshTokenDecode: any = jwt_decode(refreshToken);

      if (now > refreshTokenDecode.exp && refreshTokenDecode) {
        isLoggedIn = false;
        yield call(handleLogout);
      } else {
        const accessToken = localStorage.getItem('access_token') || '';
        const accessTokenDecode: any = jwt_decode(accessToken);

        isLoggedIn = true;

        if (now > accessTokenDecode.exp && accessTokenDecode) {
          yield call(handleRefreshToken, refreshToken);
        }
      }
    } else {
      yield call(handleLogout);
    }

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
