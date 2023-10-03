import { RegisterFormType } from './../pages/RegisterPage';
import { LoginFormType } from './../redux/features/auth/authSaga';
import axiosClient from './AxiosClient';

const authService = {
  login(data: LoginFormType) {
    const url = '/auth/login';
    return axiosClient.post(url, data);
  },
  register(data: RegisterFormType) {
    const url = `/auth/register`;
    return axiosClient.post(url, data);
  },
  changePassword(data: {
    email: string;
    oldPassword: string;
    newPassword: string;
  }) {
    const url = `/auth/change-password`;

    return axiosClient.post(url, data);
  },
  getProfile() {
    const url = `/auth/profile`;
    return axiosClient.get(url);
  },
  refresh(refreshToken: string) {
    const url = `/auth/refresh-token`;
    return axiosClient.get(url, {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    });
  },
};

export default authService;
