import { LoginFormType } from './../redux/features/auth/authSaga';
import configService from './ConfigService';

import { API_URL } from '@/constants/endpoints';
import { ApiResponse, IUser } from '@/types';
import { KEY_LOCALSTORAGE } from '@/utils/constants';

const authService = {
  login(data: LoginFormType) {
    return configService.post(`${API_URL.AUTHORIZES}/login`, data);
  },
  register(data: any): Promise<ApiResponse<IUser>> {
    return configService.post(`${API_URL.AUTHORIZES}/register`, data);
  },

  changePassword(data: {
    currentPassword: string;
    newPassword: string;
  }): Promise<ApiResponse<IUser>> {
    return configService.put(`${API_URL.USERS}/change-password`, data);
  },
  getProfile() {
    return configService.get(`${API_URL.AUTHORIZES}/profile`);
  },
  refresh() {
    return configService.get(`${API_URL.AUTHORIZES}/refresh-token`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(
          KEY_LOCALSTORAGE.REFRESH_TOKEN
        )}`,
      },
    });
  },
};

export default authService;
