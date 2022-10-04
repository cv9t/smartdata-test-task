import { AxiosResponse } from "axios";
import { IUser } from "../../types";
import HTTPRequestService from "./HTTPRequestService";

class UserService extends HTTPRequestService {
  async getAll(page?: number): Promise<AxiosResponse<IUser[]>> {
    return this.api.client.get("users", { params: { page } });
  }

  async getById(id: string): Promise<AxiosResponse<IUser>> {
    return this.api.client.get(`users/${id}`);
  }
}

export default UserService;
