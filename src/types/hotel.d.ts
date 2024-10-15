import { BaseModel, IRoom } from 'index';

export interface IHotel extends BaseModel {
  name: string;
  location: string;
  locationCode: number;
  description: string;
  contactInfo: string;
  reviewList?: IReview[];
  hotelRules: IHotelRule[];
  rooms: IRoom[];
  hotelAmenities: IHotelAmenity[];
}

export interface IHotelRule {
  id: string;
  title: string;
}

export interface IHotelAmenity {
  id: string;
  title: string;
}
