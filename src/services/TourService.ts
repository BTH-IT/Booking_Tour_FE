import { ApiResponse } from 'index';
import { ITour, ISchedule } from './../types/tour.d';
import configService from './ConfigService';

const PREFIX = '/tour';

const tourService = {
  getATour(tourId: string): Promise<ITour> {
    const url = `${PREFIX}/Tours/${tourId}`;
    return configService.get(url);
  },
  getSchedulesOfTour(tourId: string): Promise<ISchedule[]> {
    const url = `${PREFIX}/Tours/${tourId}/schedules`;
    return configService.get(url);
  },
  getAllTour(params?: any): Promise<ApiResponse<ITour[]>> {
    return configService.get(`${PREFIX}/Tours`, { params: params });
  },
  getTourSearch(params?: any): Promise<
    ApiResponse<{
      tours: ITour[];
      maxPrice: number;
      minPrice: number;
    }>
  > {
    return configService.get(`${PREFIX}/Tours/search`, { params: params });
  },
  getAllReviews(): Promise<any> {
    return configService.get('/tours/reviewList');
  },
  createTour(data: ITour) {
    return configService.post(`${PREFIX}/Tours`, data);
  },
  updateTour(data: ITour) {
    return configService.patch(`${PREFIX}/Tours/` + data.id, data);
  },
  deleteTour(tourId: string) {
    const url = `${PREFIX}/Tours/${tourId}`;
    return configService.delete(url);
  },
};

export default tourService;
