import axios, { AxiosRequestConfig } from "axios";
import PostService from "./services/PostService";
import UserService from "./services/UserService";

const defaultConfig: AxiosRequestConfig = {
  baseURL: "https://gorest.co.in/public/v2",
};

class Api {
  client = axios.create(defaultConfig);

  userService: UserService;
  postService: PostService;

  constructor() {
    this.userService = new UserService(this);
    this.postService = new PostService(this);
  }
}

export default Api;
