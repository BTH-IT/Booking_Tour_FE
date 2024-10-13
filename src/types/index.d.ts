export * from './destination';
export * from './hotel';
export * from './room';
export * from './tour';
export * from './user';
export * from './account';
export * from './role';
export * from './review';

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
