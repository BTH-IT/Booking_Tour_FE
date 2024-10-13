import { ApiResponse } from 'index';
import { ITour, ISchedule, IReview } from '@/types';
import configService from './ConfigService';
import { API_URL } from '@/constants/endpoints';

const PREFIX = '/tour';

const tourService = {
  getTour(tourId: string): Promise<ApiResponse<ITour>> {
    const url = `${PREFIX}/Tours/${tourId}`;
    return configService.get(url);
  },
  getSchedulesOfTour(tourId: string): Promise<ISchedule[]> {
    const url = `${API_URL.SCHEDULES}/tour/${tourId}`;
    return configService.get(url);
  },
  getAllTours(params?: any): Promise<ApiResponse<ITour[]>> {
    return configService.get(`${API_URL.TOURS}`, { params: params });
  },
  getTourSearch(
    params?: any
  ): Promise<
    ApiResponse<{
      tours: ITour[];
      maxPrice: number;
      minPrice: number;
    }>
  > {
    return configService.get(`${API_URL.TOURS}/search`, { params: params });
  },
  getAllReviews(): Promise<ApiResponse<IReview[]>> {
    return configService.get('/tours/reviewList');
  },
  createTour(data: Partial<ITour>): Promise<ApiResponse<ITour>> {
    return configService.post(`${API_URL.TOURS}`, data);
  },
  updateTour(data: Partial<ITour>): Promise<ApiResponse<ITour>> {
    return configService.patch(`${API_URL.TOURS}`, data);
  },
  deleteTour(tourId: string): Promise<ApiResponse<boolean>> {
    return configService.delete(`${API_URL.TOURS}/${tourId}`);
  },
};

export default tourService;
