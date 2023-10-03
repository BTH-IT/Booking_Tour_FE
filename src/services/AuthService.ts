import { RegisterFormType } from './../pages/RegisterPage';
import { LoginFormType } from './../redux/features/auth/authSaga';
import axios from 'axios';

const authService = {
  login(data: LoginFormType) {
    const url = '/auth/login';
    return axios.post(url, data);
  },
  register(data: RegisterFormType) {
    const url = `/auth/register`;
    return axios.post(url, data);
  },
  changePassword(data: {
    email: string;
    oldPassword: string;
    newPassword: string;
  }) {
    const url = `/auth/change-password`;

    return axios.post(url, data);
  },
  getProfile() {
    const url = `/auth/profile`;
    return axios.get(url);
  },
  refresh(refreshToken: string) {
    const url = `/auth/refresh-token`;
    return axios.get(url, {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    });
  },
};

export default authService;
