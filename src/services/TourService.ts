import { ITour, ISchedule } from './../types/tour.d';
import axiosClient from './ConfigService';

const tourService = {
  getATour(tourId: string): Promise<ITour> {
    const url = `/tours/${tourId}`;
    return axiosClient.get(url);
  },
  getSchedulesOfTour(tourId: string): Promise<ISchedule[]> {
    const url = `/tours/${tourId}/schedules`;
    return axiosClient.get(url);
  },
  getAllTour(params?: any): Promise<{
    tours: ITour[];
    maxPrice: number;
    minPrice: number;
  }> {
    return axiosClient.get('/tours/', { params: params });
  },
  getAllReviews(): Promise<any> {
    return axiosClient.get('/tours/reviews');
  },
  createTour(data: ITour) {
    return axiosClient.post('/tours', data);
  },
  updateTour(data: ITour) {
    return axiosClient.patch('/tours/' + data._id, data);
  },
  deleteTour(tourId: string) {
    const url = `/tours/${tourId}`;
    return axiosClient.delete(url);
  },
};

export default tourService;
