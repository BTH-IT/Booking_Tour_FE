export interface ITour {
  _id: string;
  name: string;
  maxGuests: number;
  isWifi: string;
  days: Day[];
  detail: string;
  priceExcludes: string[];
  priceIncludes: string[];
  expect: string;
  activities: string[];
  price: number;
  dateFrom: Date;
  dateTo: Date;
  rate: number;
  images: string[];
  video?: string;
  location: string;
  reviews: CreateNewReviewDto[];
  salePercent: number;
  destination: string;
  createAt: Date;
  updateAt: Date;
  deleteAt: Date;
}

export interface ISchedule {
  tourId: string;
  dateStart: Date;
  dateEnd: Date;
  availableSeats: number;
  isActive: boolean;
}
