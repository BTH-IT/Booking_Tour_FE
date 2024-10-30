import { BaseModel, IRoom, IUser } from 'index';

export interface IBookingRoom extends BaseModel {
  userId: string;
  checkIn: Date;
  checkOut: Date;
  numberOfPeople: number;
  priceTotal: number;
  detailBookingRooms: IDetailBookingRoom[];
  user: IUser;
}

export interface IDetailBookingRoom extends BaseModel {
  bookingId: string;
  roomId: string;
  price: number;
  adults: number;
  children: number;
  room: IRoom;
}
