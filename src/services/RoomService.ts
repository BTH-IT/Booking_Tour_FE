import { ApiResponse, IRoom } from '@/types';

import configService from './ConfigService';
import { API_URL } from '@/constants/endpoints';

const roomService = {
  getRoom(roomId: string): Promise<ApiResponse<IRoom>> {
    return configService.get(`${API_URL.ROOMS}/${roomId}`);
  },
  getAllRooms(params?: any): Promise<ApiResponse<IRoom[]>> {
    return configService.get(API_URL.ROOMS, { params });
  },
  createRoom(data: Partial<IRoom>): Promise<ApiResponse<IRoom>> {
    return configService.post(API_URL.ROOMS, data);
  },
  updateRoom(data: Partial<IRoom>): Promise<ApiResponse<IRoom>> {
    return configService.put(API_URL.ROOMS, data);
  },
  deleteRoom(roomId: string): Promise<ApiResponse<boolean>> {
    return configService.delete(`${API_URL.ROOMS}/${roomId}`);
  },
};

export default roomService;
