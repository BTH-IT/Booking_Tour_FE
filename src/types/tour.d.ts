import { BaseModel, IDestination, IReview } from 'index';

export interface ITour extends BaseModel {
  name: string;
  maxGuests: number;
  isWifi: boolean;
  detail: string;
  priceExcludeList: string[];
  priceIncludeList: string[];
  expect: string;
  activityList: string[];
  price: number;
  dateFrom: Date;
  dateTo: Date;
  video: string;
  salePercent: number;
  priceExcludeList: string[];
  priceIncludeList: string[];
  activityList: string[];
  imageList: string[];
  dayList: string[];
  destinationId: string;
  destination: IDestination;
  reviewList: IReview[];
  location: string;
  rate: number;
}

export interface ISchedule {
  id: string;
  tourId: string;
  dateStart: Date;
  dateEnd: Date;
  availableSeats: number;
  tour: ITour;
}

export interface ITourItem {
  id: number;
  title: string;
}
