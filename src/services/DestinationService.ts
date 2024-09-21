import { IDestination } from '../types/destination';
import axiosClient from './AxiosClient';

const destinationService = {
  getADestination(destinationId: string): Promise<IDestination> {
    const url = `/destinations/${destinationId}`;
    return axiosClient.get(url);
  },
  getAllDestination(): Promise<IDestination[]> {
    return axiosClient.get('/destinations');
  },
  createDestination(data: IDestination) {
    return axiosClient.post('/destinations', data);
  },
  updateDestination(data: IDestination) {
    return axiosClient.patch('/destinations', data);
  },
  deleteDestination(destinationId: string, userId: string) {
    const url = `/destination/${userId}/${destinationId}`;
    return axiosClient.delete(url);
  },
};

export default destinationService;
