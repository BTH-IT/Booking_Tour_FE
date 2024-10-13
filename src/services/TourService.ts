import { ApiResponse } from 'index';
import { ITour, ISchedule } from './../types/tour.d';
import axiosClient from './ConfigService';

const PREFIX = '/tour';

const tourService = {
  getATour(tourId: string): Promise<ITour> {
    const url = `${PREFIX}/Tours/${tourId}`;
    return axiosClient.get(url);
  },
  getSchedulesOfTour(tourId: string): Promise<ISchedule[]> {
    const url = `${PREFIX}/Tours/${tourId}/schedules`;
    return axiosClient.get(url);
  },
  getAllTour(params?: any): Promise<ApiResponse<ITour[]>> {
    return axiosClient.get(`${PREFIX}/Tours`, { params: params });
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
    return axiosClient.get(`${PREFIX}/Tours/search`, { params: params });
  },
  getAllReviews(): Promise<any> {
    return axiosClient.get('/tours/reviewList');
  },
  createTour(data: ITour) {
    return axiosClient.post(`${PREFIX}/Tours`, data);
  },
  updateTour(data: ITour) {
    return axiosClient.patch(`${PREFIX}/Tours/` + data.id, data);
  },
  deleteTour(tourId: string) {
    const url = `${PREFIX}/Tours/${tourId}`;
    return axiosClient.delete(url);
  },
};

export default tourService;
