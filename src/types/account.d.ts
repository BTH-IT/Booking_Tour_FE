import { IRole } from 'role';

export interface IAccount {
  id: string;
  email: string;
  password: string;
  roleId: string;
  role: IRole;
  createAt: Date;
  updateAt: Date;
  deleteAt: Date;
}
