import { AxiosResponse } from "axios";
import { IPost } from "../../types";
import HTTPRequestService from "./HTTPRequestService";

class PostService extends HTTPRequestService {
  async getByUserId(
    userId: string,
    page?: number
  ): Promise<AxiosResponse<IPost[]>> {
    return this.api.client.get(`users/${userId}/posts`, { params: { page } });
  }

  async getById(id: string): Promise<AxiosResponse<IPost>> {
    return this.api.client.get(`posts/${id}`);
  }
}

export default PostService;
