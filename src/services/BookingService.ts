import { IBookingRoom } from 'booking';
import configService from './ConfigService';
import { API_URL } from '@/constants/endpoints';

const bookingService = {
  /* ROOM */
  getAllBookingRooms(): Promise<IBookingRoom[]> {
    return configService.get(`${API_URL.BOOKING_ROOM}`);
  },
  getBookingRoom(bookingId: string): Promise<IBookingRoom> {
    return configService.get(`${API_URL.BOOKING_ROOM}/${bookingId}`);
  },
  getCurrentUserBookingRooms(): Promise<IBookingRoom[]> {
    return configService.get(`${API_URL.BOOKING_ROOM}/current-user`);
  },
  createBookingRoom(data: Partial<IBookingRoom>): Promise<IBookingRoom> {
    return configService.post(`${API_URL.SAGA_ROOM}`, data);
  },
  getABooking(bookingId: string): Promise<any> {
    const url = `${API_URL.BOOKING_TOURS}/${bookingId}`;
    return configService.get(url);
  },
  getAllBooking(params?: any): Promise<any[]> {
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

  /* TOUR */
};

export default bookingService;
