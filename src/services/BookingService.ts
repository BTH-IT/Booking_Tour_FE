<<<<<<< HEAD
import { IBookingRoom } from 'booking';
=======
// import { IBooking } from '../types/Booking';
import { API_URL } from '@/constants/endpoints';
>>>>>>> 8c3a46e267c74bc7554e37ae40c4b59719ba63e4
import configService from './ConfigService';
import { API_URL } from '@/constants/endpoints';

const bookingService = {
<<<<<<< HEAD
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
=======
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
>>>>>>> 8c3a46e267c74bc7554e37ae40c4b59719ba63e4
  },

  /* TOUR */
};

export default bookingService;
