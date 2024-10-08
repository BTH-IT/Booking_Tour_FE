import axios from 'axios';
import { IDestination, ILocation } from '../types/destination';
import axiosClient from './ConfigService';
import { ApiResponse } from 'index';

const destinationService = {
  getADestination(destinationId: string): Promise<ApiResponse<IDestination>> {
    const url = `/destinations/${destinationId}`;
    return axiosClient.get(url);
  },
  getCities(): Promise<any> {
    return axios.get('https://provinces.open-api.vn/api/');
  },
  getAllDestination(): Promise<ApiResponse<IDestination[]>> {
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
