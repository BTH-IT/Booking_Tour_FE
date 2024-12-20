import configService from './ConfigService';

import { API_URL } from '@/constants/endpoints';
import { ApiResponse, IUser } from '@/types';

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
  updateUser(
    userId: string,
    data: Partial<IUser>
  ): Promise<ApiResponse<IUser>> {
    return configService.put(`${API_URL.USERS}/${userId}`, data);
  },
  deleteUser(userId: string): Promise<ApiResponse<boolean>> {
    const url = `${API_URL.USERS}/${userId}`;
    return configService.delete(url);
  },
};

export default userService;
