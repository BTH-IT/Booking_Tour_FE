import { IRoom } from 'room';

export interface IHotel {
  id: string;
  name: string;
  location: string;
  locationCode: number;
  description: string;
  contactInfo: string;
  reviewList?: IReview[];
  hotelRules: IHotelRule[];
  rooms: IRoom[];
  hotelAmenities: IHotelAmenity[];
  createdAt: Date;
  updatedAt: Date | null;
  deletedAt: Date | null;
}

export interface IHotelRule {
  id: string;
  title: string;
}

export interface IHotelAmenity {
  id: string;
  title: string;
}
