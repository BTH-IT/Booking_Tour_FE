import { BaseModel, IRoomFile, IHotel, IReview } from 'index';

export interface IRoom extends BaseModel {
  name: string;
  images: IRoomFile[];
  video: IRoomFile;
  detail: string;
  price: number;
  imageList: string[];
  isAvailable: boolean;
  maxGuests: number;
  reviews: IReview[];
  roomAmenities: IRoomAmenity[];
  hotelId: string;
  hotel: IHotel;
}

export interface IRoomAmenity {
  id: string;
  title: string;
}
