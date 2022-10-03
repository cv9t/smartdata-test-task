import { action, makeObservable, observable } from "mobx";

class PaginationMixin {
  @observable numberOfPages = 0;

  constructor() {
    makeObservable(this);
  }

  @action
  setNumberOfPages(value: number) {
    this.numberOfPages = value;
  }
}

export default PaginationMixin;
