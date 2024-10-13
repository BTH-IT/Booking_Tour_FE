// import { IBooking } from '../types/Booking';
import configService from './ConfigService';

const bookingService = {
  getABooking(bookingId: string): Promise<any> {
    const url = `/bookings/${bookingId}`;
    return configService.get(url);
  },
  getAllBooking(params?: any): Promise<any[]> {
    return configService.get('/bookings/', { params: params });
  },
  createBooking(data: any) {
    return configService.post('/bookings', data);
  },
  updateBooking(data: any) {
    return configService.patch('/bookings', data);
  },
  deleteBooking(BookingId: string) {
    const url = `/bookings/${BookingId}`;
    return configService.delete(url);
  },
};

export default bookingService;
