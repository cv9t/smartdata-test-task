import { AxiosResponse } from "axios";
import transformObjectKeys from "../../helpers/transformObjectKeys";
import { IComment, IUser } from "../../types";
import HTTPRequestService from "./HTTPRequestService";

enum QUERY {
  USERS = "users",
  POSTS = "posts",
}

class UserService extends HTTPRequestService {
  async getUser(id: string): Promise<AxiosResponse<IUser>> {
    return this.axios.get(`${QUERY.USERS}/${id}`);
  }

  async getUsers(page: number): Promise<AxiosResponse<IUser[]>> {
    return this.axios.get(QUERY.USERS, { params: { page } });
  }

  async getUserPosts(
    id: string,
    page: number
  ): Promise<AxiosResponse<IComment[]>> {
    return transformObjectKeys(
      this.axios.get(`${QUERY.USERS}/${id}/${QUERY.POSTS}`, {
        params: { page },
      })
    );
  }
}

export default UserService;
