import { IReview } from 'review';

export interface ITour {
  id: string;
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
  video: IFile;
  salePercent: number;
  priceExcludes: string[];
  priceIncludes: string[];
  activities: string[];
  imageList: string[];
  dayList: string[];
  destinationId: string;
  reviewList: IReview[];
  location: string;
  createAt: Date;
  rate: number;
  updateAt: Date | null;
  deleteAt: Date | null;
}

export interface ISchedule {
  id: string;
  tourId: string;
  dateStart: Date;
  dateEnd: Date;
  availableSeats: number;
}

export interface ITourItem {
  id: string;
  title: string;
}
