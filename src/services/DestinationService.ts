import axios from 'axios';
import { IDestination } from '../types/destination';
import axiosClient from './ConfigService';
import { ApiResponse } from 'index';

const PREFIX = '/tour/Destinations';

const destinationService = {
  getADestination(destinationId: string): Promise<ApiResponse<IDestination>> {
    const url = `${PREFIX}/${destinationId}`;
    return axiosClient.get(url);
  },
  getCities(): Promise<any> {
    return axios.get('https://provinces.open-api.vn/api/');
  },
  getAllDestination(): Promise<ApiResponse<IDestination[]>> {
    return axiosClient.get(`${PREFIX}`);
  },
  createDestination(data: IDestination) {
    return axiosClient.post(`${PREFIX}/${data.id}`, data);
  },
  updateDestination(data: IDestination) {
    return axiosClient.put(`${PREFIX}/${data.id}`, data);
  },
  deleteDestination(destinationId: string) {
    const url = `${PREFIX}/${destinationId}`;
    return axiosClient.delete(url);
  },
};

export default destinationService;
