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

  /* TOUR */
};

export default bookingService;
