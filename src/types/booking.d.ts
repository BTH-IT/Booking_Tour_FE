import { BaseModel, IRoom, IUser } from 'index';

export interface IBookingRoom extends BaseModel {
  userId: string;
  checkIn: Date;
  checkOut: Date;
  numberOfPeople: number;
  priceTotal: number;
  bookingRoomDetails: any;
  user: IUser;
}
