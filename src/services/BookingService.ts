import { IBookingRoom } from 'booking';
import { API_URL } from '@/constants/endpoints';
import configService from './ConfigService';
import { ISchedule } from 'tour';
import { ApiResponse } from 'index';
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
    data: Partial<IBookingRoom>,
  ): Promise<ApiResponse<IBookingRoom>> {
    return configService.post(`${API_URL.SAGA_ROOM}`, data);
  },
  /* TOUR */
  getABooking(bookingId: string): Promise<ApiResponse<any>> {
    const url = `${API_URL.BOOKING_TOURS}/${bookingId}`;
    return configService.get(url);
  },
  getAllBooking(params?: any): Promise<ApiResponse<any[]>> {
    return configService.get(`${API_URL.BOOKING_TOURS}`, { params: params });
  },
  createBooking(data: any) {
    return configService.post(`${API_URL.SAGAS + API_URL.BOOKING_TOURS}`, data);
  },
  updateBooking(data: any) {
    return configService.patch(`${API_URL.BOOKING_TOURS}`, data);
  },
  deleteBooking(BookingId: string) {
    const url = `${API_URL.BOOKING_TOURS}/${BookingId}`;
    return configService.delete(url);
  },
};

export default bookingService;
