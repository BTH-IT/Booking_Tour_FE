export interface IRoom {
  _id: string;
  hotelId: string;
  name: string;
  bed: string;
  area: number;
  maxRooms: number;
  view: string;
  price: number;
  detail: string;
  description: string;
  rate: number;
  roomAmenities: string[];
  roomImages: string[];
  otherImages?: string[];
  video?: string;
  reviews: CreateNewReviewDto[];
  salePercent: number;
}

export interface IAmenities {
  roomId: string;
  name: string;
  description?: string;
}

export interface ISchedule {
  roomId: string;
  checkIn: Date;
  checkOut: Date;
  roomQuantity: number;
  isActive: boolean;
}