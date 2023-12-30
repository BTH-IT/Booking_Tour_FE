import { IRoom } from './../types/room.d';
import axiosClient from './AxiosClient';

const roomService = {
  getARoom(roomId: string): Promise<IRoom> {
    const url = `/rooms/${roomId}`;
    return axiosClient.get(url);
  },
  // getSchedulesOfRoom(roomId: string): Promise<ISchedule[]> {
  //   const url = `/rooms/${roomId}/schedules`;
  //   return axiosClient.get(url);
  // },
  getAllRoom(params?: any): Promise<{
    rooms: IRoom[];
    maxPrice: number;
    minPrice: number;
  }> {
    return axiosClient.get('/rooms/', { params: params });
  },
  getAllReviews(): Promise<any> {
    return axiosClient.get('/rooms/reviews');
  },
  createRoom(data: IRoom) {
    return axiosClient.post('/rooms', data);
  },
  updateRoom(data: IRoom) {
    return axiosClient.patch('/rooms/' + data._id, data);
  },
  deleteRoom(roomId: string) {
    const url = `/rooms/${roomId}`;
    return axiosClient.delete(url);
  },
};

export default roomService;
