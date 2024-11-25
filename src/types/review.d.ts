export interface IReview {
  id: string;
  userId: string;
  tourId?: string;
  roomId?: string;
  content: string;
  rating: number;
  createdAt: Date;
}
