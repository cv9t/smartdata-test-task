import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import UserService from "./services/UserService";

const defaultConfig: AxiosRequestConfig = {
  baseURL: "https://gorest.co.in/public/v2",
};

class Api {
  axios: AxiosInstance;
  userService: UserService;

  constructor(config: AxiosRequestConfig = defaultConfig) {
    this.axios = axios.create(config);
    this.userService = new UserService(this.axios);
  }
}

const api = new Api();

export default api;
