import { AxiosResponse } from "axios";
import { observable, action, makeObservable } from "mobx";
import PaginationMixin from "./PaginationMixin";

class FetchMixin {
  pagination: PaginationMixin;
  @observable loading = false;

  constructor() {
    makeObservable(this);
    this.pagination = new PaginationMixin();
  }

  @action
  setLoading(value: boolean) {
    this.loading = value;
  }

  async fetchApi<T>(
    method: () => Promise<AxiosResponse<T>>
  ): Promise<T | null> {
    try {
      this.setLoading(true);

      const response = await method();

      if (response.status !== 200) {
        return null;
      }

      const numberOfPages = Number(response.headers["x-pagination-pages"]);
      this.pagination.setNumberOfPages(numberOfPages);

      return response.data;
    } catch {
      return null;
    } finally {
      this.setLoading(false);
    }
  }
}

export default FetchMixin;
