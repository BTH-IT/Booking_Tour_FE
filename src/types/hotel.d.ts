export interface IHotel {
  _id: string;
  name: string;
  description: string;
  location: string;
  locationDetail: string;
  rules: string[];
  hotelAmenities: string[];
}

export interface IAmenities {
  _id: string;
  name: string;
  description?: string;
}