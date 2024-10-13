import { ApiResponse, IHotel } from '@/types';

import configService from './ConfigService';
import { API_URL } from '@/constants/endpoints';

const hotelService = {
  getHotel(hotelId: string): Promise<ApiResponse<IHotel>> {
    const url = `${API_URL.HOTELS}/${hotelId}`;
    return configService.get(url);
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
    const url = `${API_URL.HOTELS}/${hotelId}`;
    return configService.delete(url);
  },
};

export default hotelService;
