import { IFile } from 'file';
import { IHotel } from 'hotel';
import { IReview } from 'review';

export interface IRoom {
  id: string;
  name: string;
  images: IFile[];
  video: IFile;
  detail: string;
  price: number;
  imageList: string[];
  isAvailable: boolean;
  maxGuests: number;
  reviews: IReview[];
  roomAmenities: IRoomAmenity[];
  hotelId: string;
  hotel: IHotel;
  createAt: Date;
  updateAt: Date | null;
  deleteAt: Date | null;
}

export interface IRoomAmenity {
  id: string;
  title: string;
}
