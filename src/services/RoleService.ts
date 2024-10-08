import { ApiResponse, IRole } from '@/types';

import configService from './ConfigService';
import { API_URL } from '@/constants/endpoints';

const roleService = {
  getRole(roleId: string): Promise<ApiResponse<IRole>> {
    const url = `${API_URL.ROLES}/${roleId}`;
    return configService.get(url);
  },
  getAllRoles(): Promise<ApiResponse<IRole[]>> {
    return configService.get(`${API_URL.ROLES}`);
  },
  createRole(data: Partial<IRole>): Promise<ApiResponse<IRole>> {
    return configService.post(`${API_URL.ROLES}`, data);
  },
  updateRole(data: IRole): Promise<ApiResponse<IRole>> {
    return configService.patch(`${API_URL.ROLES}`, data);
  },
  deleteRole(roleId: string): Promise<ApiResponse<boolean>> {
    const url = `${API_URL.ROLES}/${roleId}`;
    return configService.delete(url);
  },
};

export default roleService;
