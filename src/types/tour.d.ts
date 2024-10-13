export interface ITour {
  id: string;
  name: string;
  maxGuests: number;
  isWifi: string;
  dayList: Day[];
  detail: string;
  priceExcludeList: string[];
  priceIncludeList: string[];
  expect: string;
  activityList: string[];
  price: number;
  dateFrom: Date;
  dateTo: Date;
  rate: number;
  imageList: string[];
  video?: string;
  location: string;
  reviewList: CreateNewReviewDto[];
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
