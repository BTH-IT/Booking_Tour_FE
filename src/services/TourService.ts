import axiosClient from './AxiosClient';

const tourApi = {
  getATour(tourId: string) {
    const url = `/tour/${tourId}`;
    return axiosClient.get(url);
  },
  getAllTour() {
    return axiosClient.get('/tour/');
  },
  createTour(data: any) {
    return axiosClient.post('/tour', data);
  },
  updateTour(data: any) {
    return axiosClient.patch('/tour', data);
  },
  deleteTour(tourId: string, userId: string) {
    const url = `/tour/${userId}/${tourId}`;
    return axiosClient.delete(url);
  },
};

export default tourApi;
