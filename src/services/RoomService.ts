import configService from './ConfigService';

import { API_URL } from '@/constants/endpoints';
import { ApiResponse, IReview, IRoom } from '@/types';

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
  updateRoom(
    roomId: string,
    data: Partial<IRoom>
  ): Promise<ApiResponse<IRoom>> {
    return configService.put(`${API_URL.ROOMS}/${roomId}`, data);
  },
  deleteRoom(roomId: string): Promise<ApiResponse<boolean>> {
    return configService.delete(`${API_URL.ROOMS}/${roomId}`);
  },
  getRoomSearch(params?: any): Promise<
    ApiResponse<{
      rooms: IRoom[];
      maxPrice: number;
      minPrice: number;
      totalItems: number;
      pageNumber: number;
      pageSize: number;
    }>
  > {
    return configService.get(`${API_URL.ROOMS}/search`, {
      params: params,
      paramsSerializer: {
        indexes: null,
      },
    });
  },
  createReview(data: Partial<IReview>): Promise<IReview> {
    return configService.post('/room/ReviewRoom', data);
  },
};

export default roomService;
