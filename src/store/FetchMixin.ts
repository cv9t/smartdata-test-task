import { AxiosResponse } from "axios";
import { observable, action, makeObservable } from "mobx";
import transformObjectKeys from "../helpers/transformObjectKeys";
import RootStore from "./RootStore";

class FetchMixin {
  @observable loading = false;
  @observable error = false;

  constructor(public rootStore: RootStore) {
    makeObservable(this);
  }

  @action setLoading(value: boolean) {
    this.loading = value;
  }

  @action setError(value: boolean) {
    this.error = value;
  }

  protected async fetchApi<T>(
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
      thenCallback?.(transformedData);
      return res;
    } catch (err: any) {
      catchCallback?.();
      this.rootStore.setErrorMessage(err.message);
      this.setError(true);
      return null;
    } finally {
      this.setLoading(false);
    }
  }
}

export default FetchMixin;
