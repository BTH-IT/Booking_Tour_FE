export * from './account';
export * from './booking';
export * from './destination';
export * from './hotel';
export * from './review';
export * from './role';
export * from './room';
export * from './tour';
export * from './user';

export interface ApiResponse<T> {
  statusCode: number;
  message?: string;
  result: T;
}

export type MODAL_SIZE_OPTIONS =
  | 50
  | 100
  | 150
  | 200
  | 250
  | 300
  | 400
  | 500
  | 600
  | 700
  | 800
  | 900
  | 1000;

export type BaseModel = {
  id: string;
  createAt: Date;
  updateAt: Date | null;
  deleteAt: Date | null;
};
