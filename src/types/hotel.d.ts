import { BaseModel, IRoom } from 'index';

export interface IHotel extends BaseModel {
  name: string;
  location: string;
  locationCode: number;
  description: string;
  contactInfo: string;
  reviewList?: IReview[];
  hotelRules: string[];
  rooms: IRoom[];
  hotelAmenities: string[];
}

export interface IHotelItem {
  id: number;
  title: string;
}
