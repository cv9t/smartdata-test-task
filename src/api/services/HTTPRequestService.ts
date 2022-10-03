import { AxiosInstance } from "axios";

class HTTPRequestService {
  axios: AxiosInstance;

  constructor(axios: AxiosInstance) {
    this.axios = axios;
  }
}

export default HTTPRequestService;
