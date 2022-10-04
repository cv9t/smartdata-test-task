import axios, { AxiosRequestConfig } from "axios";
import CommentService from "./services/CommentService";
import PostService from "./services/PostService";
import UserService from "./services/UserService";

const defaultConfig: AxiosRequestConfig = {
  baseURL: "https://gorest.co.in/public/v2",
};

class Api {
  client = axios.create(defaultConfig);

  userService: UserService;
  postService: PostService;
  commentService: CommentService;

  constructor() {
    this.userService = new UserService(this);
    this.postService = new PostService(this);
    this.commentService = new CommentService(this);
  }
}

export default Api;
