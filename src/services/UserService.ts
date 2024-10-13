import { ApiResponse, IUser } from '@/types';

import configService from './ConfigService';
import { API_URL } from '@/constants/endpoints';

const userService = {
  getUser(userId: string): Promise<ApiResponse<IUser>> {
    const url = `${API_URL.USERS}/${userId}`;
    return configService.get(url);
  },
  getAllUsers(): Promise<ApiResponse<IUser[]>> {
    return configService.get(`${API_URL.USERS}`);
  },
  createUser(data: Partial<IUser>): Promise<ApiResponse<IUser>> {
    return configService.post(`${API_URL.USERS}`, data);
  },
  updateUser(data: Partial<IUser>): Promise<ApiResponse<IUser>> {
    return configService.patch(`${API_URL.USERS}`, data);
  },
  deleteUser(userId: string): Promise<ApiResponse<boolean>> {
    const url = `${API_URL.USERS}/${userId}`;
    return configService.delete(url);
  },
};

export default userService;
