import { IRole } from 'role';

export interface IAccount {
  id: string;
  email: string;
  password: string;
  roleId: string;
  role: IRole;
  createdAt: Date;
  updatedAt: Date | null;
  deletedAt: Date | null;
}
