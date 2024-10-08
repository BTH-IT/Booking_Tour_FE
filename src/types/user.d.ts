import { IAccount } from 'account';

export interface IUser {
  id: string;
  fullname: string;
  birthDate: Date;
  country: string;
  phone: string;
  gender: string;
  accountId: string;
  account: IAccount;
  createAt: Date;
  updateAt: Date;
  deleteAt: Date;
}
