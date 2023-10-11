import { ITour } from './../types/tour.d';
import axiosClient from './AxiosClient';

const tourService = {
  getATour(tourId: string): Promise<ITour> {
    const url = `/tours/${tourId}`;
    return axiosClient.get(url);
  },
  getAllTour(params?: any): Promise<{
    tours: ITour[];
    maxPrice: number;
    minPrice: number;
  }> {
    return axiosClient.get('/tours/', { params: params });
  },
  createTour(data: ITour) {
    return axiosClient.post('/tours', data);
  },
  updateTour(data: ITour) {
    return axiosClient.patch('/tours', data);
  },
  deleteTour(tourId: string, userId: string) {
    const url = `/tour/${userId}/${tourId}`;
    return axiosClient.delete(url);
  },
};

export default tourService;
