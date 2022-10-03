import { makeObservable, observable, runInAction } from "mobx";
import User from "../models/User";
import api from "../api/Api";
import FetchMixin from "./FetchMixin";

class UserStore extends FetchMixin {
  transportLayer = api.userService;
  @observable users: User[] = [];

  constructor() {
    super();
    makeObservable(this);
  }

  async fetchUsers(page = 0) {
    const users = await this.fetchApi(() => this.transportLayer.getUsers(page));
    if (users) {
      runInAction(() => {
        this.users = users.map((user) => new User(user));
      });
    }
  }

  async fetchUser(id: string) {
    const user = await this.fetchApi(() => this.transportLayer.getUser(id));
    if (user) {
      runInAction(() => {
        this.users.push(new User(user));
      });
    }
  }

  getUserById(id: string | undefined): User | undefined {
    return this.users.find((user) => Number(user.id) === Number(id));
  }
}

export default UserStore;
