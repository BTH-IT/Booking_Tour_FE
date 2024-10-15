import { BaseModel } from 'index';

export interface IDestination extends BaseModel {
  name: string;
  description: string;
  url: string;
}

export interface ILocation {
  name: string;
  code: number;
  division_type: string;
  codename: string;
  phone_code: number;
  districts: any;
}
