export interface IRoom {
  id: string;
  name: string;
  hotelId: string;
  rate: number;
  video: string;
  detail: string;
  price: number;
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
