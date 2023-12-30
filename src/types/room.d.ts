export interface IRoom {
  _id: string;
  hotelId: string;
  name: string;
  maxGuests: number;
  bed: string;
  area: number;
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
  _id: string;
  name: string;
  description?: string;
}