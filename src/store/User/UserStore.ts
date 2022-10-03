import { RootStore } from "../RootStore";

class UserStore {
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }
}

export { UserStore };
