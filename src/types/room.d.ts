import { BaseModel, IHotel, IReview } from 'index';

export interface IRoom extends BaseModel {
  name: string;
  images: string[];
  video: string;
  detail: string;
  price: number;
  isAvailable: boolean;
  maxGuests: number;
  reviews: IReview[];
  roomAmenities: string[];
  hotelId: string;
  hotel: IHotel;
}

export interface IRoomItem {
  id: number;
  title: string;
}
