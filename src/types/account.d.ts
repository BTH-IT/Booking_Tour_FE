import { BaseModel, IRole } from 'index';

export interface IAccount extends BaseModel {
  email: string;
  password: string;
  roleId: string;
  role: IRole;
}
