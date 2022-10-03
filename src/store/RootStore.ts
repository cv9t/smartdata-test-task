import { UserStore } from "./User/UserStore";

class RootStore {
  userStore: UserStore;

  constructor() {
    this.userStore = new UserStore(this);
  }
}

export { RootStore };
