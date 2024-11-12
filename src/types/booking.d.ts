import { BaseModel, IRoom, ISchedule, IUser } from 'index';

export interface IBookingRoom extends BaseModel {
  userId: string;
  checkIn: Date;
  checkOut: Date;
  numberOfPeople: number;
  priceTotal: number;
  detailBookingRooms: IDetailBookingRoom[];
  status: string;
  user: IUser;
}

export interface IDetailBookingRoom extends BaseModel {
  bookingId: string;
  roomId: string;
  room: IRoom;
  adults: number;
  children: number;
  price: number;
}

export interface IBookingTour extends BaseModel {
  userId: string;
  scheduleId: string;
  seats: number;
  isLunch: boolean;
  isTips: boolean;
  isEntranceTicket: boolean;
  status: string;
  priceTotal: number;
  dateStart: Date;
  dateEnd: Date;
  user: IUser;
  schedule: ISchedule;
  travellers: any;
}
