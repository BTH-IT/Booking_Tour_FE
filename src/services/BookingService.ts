// import { IBooking } from '../types/Booking';
import { API_URL } from '@/constants/endpoints';
import configService from './ConfigService';

const bookingService = {
  getABooking(bookingId: string): Promise<any> {
    const url = `${API_URL.BOOKING_TOURS}/${bookingId}`;
    return configService.get(url);
  },
  getAllBooking(params?: any): Promise<any[]> {
    return configService.get(`${API_URL.BOOKING_TOURS}`, { params: params });
  },
  createBooking(data: any) {
    return configService.post(`${API_URL.BOOKING_TOURS}`, data);
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
