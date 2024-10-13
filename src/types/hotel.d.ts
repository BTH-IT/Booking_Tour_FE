import { IRoom } from 'room';

export interface IHotel {
  id: string;
  name: string;
  location: string;
  locationCode: number;
  description: string;
  contactInfo: string;
  rate?: number;
  reviewList?: any;
  hotelRules?: any;
  rooms: IRoom[];
  hotelAmenities?: any;
  createAt: Date;
  updateAt: Date;
  deleteAt: Date;
}

export interface IHotelRule {
  id: string;
  title: string;
}

export interface IHotelAmenity {
  id: string;
  title: string;
}
