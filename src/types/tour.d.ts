import { IReview } from 'review';

export interface ITour {
  id: string;
  name: string;
  maxGuests: number;
  isWifi: boolean;
  detail: string;
  expect: string;
  price: number;
  dateFrom: Date;
  dateTo: Date;
  video: IFile;
  salePercent: number;
  priceExcludes: ITourItem[];
  priceIncludes: ITourItem[];
  activities: ITourItem[];
  imageList: ITourItem[];
  dayList: ITourItem[];
  destinationId: string;
  reviewList: IReview[];
  location: string;
  createAt: Date;
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
