import { BaseModel } from 'index';

export interface IRole extends BaseModel {
  roleName: string;
  status: boolean;
  createAt: Date;
}
