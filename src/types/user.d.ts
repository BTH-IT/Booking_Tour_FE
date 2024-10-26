import { BaseModel, IAccount } from 'index';

export interface IUser extends BaseModel {
  fullname: string;
  birthDate: Date;
  picture?: string;
  country: string;
  phone: string;
  gender: string;
  accountId: string;
  account: IAccount;
}
