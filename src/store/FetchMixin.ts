import { AxiosResponse } from "axios";
import { observable, action, makeObservable } from "mobx";
import transformObjectKeys from "../helpers/transformObjectKeys";

class FetchMixin {
  @observable loading = false;
  @observable error = false;

  constructor() {
    makeObservable(this);
  }

  @action setLoading(value: boolean) {
    this.loading = value;
  }

  @action setError(value: boolean) {
    this.error = value;
  }

  async fetchApi<T>(
    method: () => Promise<AxiosResponse<T>>,
    thenCallback?: (data: T) => void,
    catchCallback?: () => void
  ) {
    try {
      this.setError(false);
      this.setLoading(true);

      const res = await method();

      if (res.status !== 200) {
        throw new Error();
      }

      const transformedData: T = transformObjectKeys(res.data);
      console.log(transformedData);
      thenCallback?.(transformedData);
      return res;
    } catch {
      catchCallback?.();
      this.setError(true);
      return null;
    } finally {
      this.setLoading(false);
    }
  }
}

export default FetchMixin;
