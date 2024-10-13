export interface IRole {
  id: string;
  roleName: string;
  status: boolean;
  createAt: Date;
  updateAt: Date | null;
  deleteAt: Date | null;
}
