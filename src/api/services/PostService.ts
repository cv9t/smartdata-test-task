import { AxiosResponse } from "axios";
import { IPost } from "../../types";
import HTTPRequestService from "./HTTPRequestService";

class PostService extends HTTPRequestService {
  async getAllByUserId(
    userId: string,
    page?: number
  ): Promise<AxiosResponse<IPost[]>> {
    return this.api.client.get(`users/${userId}/posts`, { params: { page } });
  }
}

export default PostService;
