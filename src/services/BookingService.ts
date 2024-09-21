// import { IBooking } from '../types/Booking';
import axiosClient from './AxiosClient';

const bookingService = {
  getABooking(bookingId: string): Promise<any> {
    const url = `/bookings/${bookingId}`;
    return axiosClient.get(url);
  },
  getAllBooking(params?: any): Promise<any[]> {
    return axiosClient.get('/bookings/', { params: params });
  },
  createBooking(data: any) {
    return axiosClient.post('/bookings', data);
  },
  updateBooking(data: any) {
    return axiosClient.patch('/bookings', data);
  },
  deleteBooking(BookingId: string) {
    const url = `/bookings/${BookingId}`;
    return axiosClient.delete(url);
  },
};

export default bookingService;
