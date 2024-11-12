import { IBookingRoom, IBookingTour } from 'booking';
import { ApiResponse } from 'index';

import configService from './ConfigService';

import { API_URL } from '@/constants/endpoints';

const bookingService = {
  /* ROOM */
  getAllBookingRooms(): Promise<ApiResponse<IBookingRoom[]>> {
    return configService.get(`${API_URL.BOOKING_ROOM}`);
  },
  getBookingRoom(bookingId: string): Promise<ApiResponse<IBookingRoom>> {
    return configService.get(`${API_URL.BOOKING_ROOM}/${bookingId}`);
  },
  getCurrentUserBookingRooms(): Promise<ApiResponse<IBookingRoom[]>> {
    return configService.get(`${API_URL.BOOKING_ROOM}/current-user`);
  },
  getOccupiedSchedule(roomId: string): Promise<ApiResponse<any>> {
    return configService.get(`${API_URL.BOOKING_ROOM}/${roomId}/data`);
  },
  createBookingRoom(
    data: Partial<IBookingRoom>
  ): Promise<ApiResponse<IBookingRoom>> {
    return configService.post(`${API_URL.SAGA_ROOM}`, data);
  },
  cancelBookingRoom(bookingId: string): Promise<ApiResponse<boolean>> {
    return configService.delete(`${API_URL.BOOKING_ROOM}/${bookingId}/cancel`);
  },

  /* TOUR */
  createBooking(data: any): Promise<ApiResponse<IBookingTour>> {
    return configService.post(`${API_URL.SAGAS + API_URL.BOOKING_TOURS}`, data);
  },
  updateBooking(data: any): Promise<ApiResponse<IBookingTour>> {
    return configService.patch(`${API_URL.BOOKING_TOURS}`, data);
  },
  deleteBooking(BookingId: string): Promise<ApiResponse<boolean>> {
    const url = `${API_URL.BOOKING_TOURS}/${BookingId}`;
    return configService.delete(url);
  },
  getAllBookingTours(): Promise<ApiResponse<IBookingTour[]>> {
    return configService.get(`${API_URL.BOOKING_TOUR}`);
  },
  getBookingTour(bookingId: string): Promise<ApiResponse<IBookingTour>> {
    return configService.get(`${API_URL.BOOKING_TOUR}/${bookingId}`);
  },
  getCurrentUserBookingTours(): Promise<ApiResponse<IBookingTour[]>> {
    return configService.get(`${API_URL.BOOKING_TOUR}/current-user`);
  },
  cancelBookingTour(bookingId: string): Promise<ApiResponse<boolean>> {
    return configService.delete(`${API_URL.BOOKING_TOUR}/${bookingId}/cancel`);
  },
};

export default bookingService;
