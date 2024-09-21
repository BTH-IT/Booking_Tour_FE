import { IUser } from "../types/user";
import axiosClient from "./AxiosClient";

const userService = {
  getAUser(userId: string): Promise<IUser> {
    const url = `/users/${userId}`;
    return axiosClient.get(url);
  },
  getAllUser(params?: any): Promise<IUser[]> {
    return axiosClient.get("/users/", { params: params });
  },
  createUser(data: IUser) {
    return axiosClient.post("/users", data);
  },
  updateUser(data: IUser) {
    return axiosClient.patch("/users", data);
  },
  deleteUser(userId: string) {
    const url = `/users/${userId}`;
    return axiosClient.delete(url);
  },
};

export default userService;
