import { AxiosResponse } from "axios";
import { IComment } from "../../types";
import HTTPRequestService from "./HTTPRequestService";

class CommentService extends HTTPRequestService {
  async getByPostId(
    postId: string,
    page?: number
  ): Promise<AxiosResponse<IComment[]>> {
    return this.api.client.get(`posts/${postId}/comments`, {
      params: { page },
    });
  }
}

export default CommentService;
