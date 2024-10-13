import { IFile } from 'file';
import { IHotel } from 'hotel';

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
  reviews: any;
  roomAmenities: any;
  hotelId: string;
  hotel: IHotel;
  createAt: Date;
  updateAt: Date;
  deleteAt: Date;
}

export interface IRoomAmenity {
  id: string;
  title: string;
}
