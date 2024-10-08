import { KEY_LOCALSTORAGE } from '@/utils/constants';
import { RegisterFormType } from './../pages/RegisterPage';
import { LoginFormType } from './../redux/features/auth/authSaga';
import { ApiResponse, IUser } from '@/types';
import { API_URL } from '@/constants/endpoints';
import configService from './ConfigService';

const authService = {
  login(data: LoginFormType) {
    return configService.post(`${API_URL.AUTHORIZES}/login`, data);
  },
  register(data: any): Promise<ApiResponse<IUser>> {
    return configService.post(`${API_URL.AUTHORIZES}/register`, data);
  },

  changePassword(data: {
    email: string;
    oldPassword: string;
    newPassword: string;
  }): Promise<ApiResponse<IUser>> {
    return configService.post(`${API_URL.AUTHORIZES}/change-password`, data);
  },
  getProfile() {
    return configService.get(`${API_URL.AUTHORIZES}/profile`);
  },
  refresh() {
    return configService.get(`${API_URL.AUTHORIZES}/refresh-token`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(
          KEY_LOCALSTORAGE.REFRESH_TOKEN,
        )}`,
      },
    });
  },
};

export default authService;
