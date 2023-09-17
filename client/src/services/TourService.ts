import axiosClient from './AxiosClient';

const tourApi = {
  getATour(tourId: string) {
    const url = `/tour/${tourId}`;
    return axiosClient.get(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    });
  },
  getAllTour() {
    return axiosClient.get('/tour/', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    });
  },
  createTour(data: any) {
    return axiosClient.post('/tour', data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    });
  },
  updateTour(data: any) {
    return axiosClient.patch('/tour', data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    });
  },
  deleteTour(tourId: string, userId: string) {
    const url = `/tour/${userId}/${tourId}`;
    return axiosClient.delete(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    });
  },
};

export default tourApi;
