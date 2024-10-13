import { ApiResponse, IHotel } from '@/types';

import configService from './ConfigService';
import { API_URL } from '@/constants/endpoints';

const hotelService = {
  getHotel(hotelId: string): Promise<ApiResponse<IHotel>> {
    return configService.get(`${API_URL.HOTELS}/${hotelId}`);
  },
  getAllHotels(): Promise<ApiResponse<IHotel[]>> {
    return configService.get(`${API_URL.HOTELS}`);
  },
  createHotel(data: Partial<IHotel>): Promise<ApiResponse<IHotel>> {
    return configService.post(`${API_URL.HOTELS}`, data);
  },
  updateHotel(data: Partial<IHotel>): Promise<ApiResponse<IHotel>> {
    return configService.put(`${API_URL.HOTELS}`, data);
  },
  deleteHotel(hotelId: string): Promise<ApiResponse<boolean>> {
    return configService.delete(`${API_URL.HOTELS}/${hotelId}`);
  },
};

export default hotelService;
