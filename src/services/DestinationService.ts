import axios from 'axios';
import { IDestination } from '../types/destination';
import configService from './ConfigService';
import { ApiResponse } from 'index';
import { API_URL } from '@/constants/endpoints';

const destinationService = {
  getDestination(destinationId: string): Promise<ApiResponse<IDestination>> {
    return configService.get(`${API_URL.DESTINATIONS}/${destinationId}`);
  },
  getCities(): Promise<any> {
    return axios.get('https://provinces.open-api.vn/api/');
  },
  getAllDestinations(): Promise<ApiResponse<IDestination[]>> {
    return configService.get(`${API_URL.DESTINATIONS}`);
  },
  createDestination(
    data: Partial<IDestination>,
  ): Promise<ApiResponse<IDestination>> {
    return configService.post(`${API_URL.DESTINATIONS}`, data);
  },
  updateDestination(
    data: Partial<IDestination>,
  ): Promise<ApiResponse<IDestination>> {
    return configService.put(`${API_URL.DESTINATIONS}`, data);
  },
  deleteDestination(destinationId: string): Promise<ApiResponse<boolean>> {
    return configService.delete(`${API_URL.DESTINATIONS}/${destinationId}`);
  },
};

export default destinationService;
