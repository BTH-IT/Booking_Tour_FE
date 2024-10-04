import { call, put, takeLatest } from 'redux-saga/effects';
import { authActions } from './authSlice';
import authService from '@/services/AuthService';
import { CLEAR_LOCALSTORAGE, SET_LOCALSTORAGE } from '@/utils/constants';
import { IUser } from 'user';

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

export interface ActionParams<T> {
  type: string;
  payload: T;
}

export function* handleLogin(
  action: ActionParams<LoginFormType & { actionSuccess: () => void }>,
) {
  const { actionSuccess, ...rest } = action.payload;
  try {
    const data: {
      message: string;
      result: {
        accessToken: string;
        refreshToken: string;
        user: IUser;
        account: any;
      };
      statusCode: number;
    } = yield call(authService.login, rest);

    SET_LOCALSTORAGE(data.result);

    yield put(
      authActions.loginSuccess({
        ...data.result,
        isLoggedIn: true,
        actionSuccess,
      }),
    );
  } catch (error) {
    yield put(authActions.loginFailed());
  }
}

function* handleLogout() {
  yield CLEAR_LOCALSTORAGE();
}

export default function* authSaga() {
  yield takeLatest(authActions.logout.type, handleLogout);
  yield takeLatest(authActions.login.type, handleLogin);
}
