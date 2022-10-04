import { makeObservable, observable, computed, action } from "mobx";
import UserService from "../api/services/UserService";
import UserModel from "../models/UserModel";
import { IUser } from "../types";
import FetchMixin from "./FetchMixin";
import RootStore from "./RootStore";

class UserStore extends FetchMixin {
  rootStore: RootStore;
  @observable users: UserModel[] = [];

  constructor(rootStore: RootStore, private transportLayer: UserService) {
    super();
    makeObservable(this);
    this.rootStore = rootStore;
  }

  @action setUsers(users: IUser[]) {
    this.users = users.map((user) => new UserModel(this, user));
  }

  async fetchUsers(page?: number) {
    return this.fetchApi(
      () => this.transportLayer.getAll(page),
      (users) => this.setUsers(users)
    );
  }

  async fetchUser(id: string) {
    return this.fetchApi(
      () => this.transportLayer.getById(id),
      (user) => this.setUsers([user])
    );
  }

  getUserById(id: string | undefined) {
    return this.users.find((user) => user.id === id);
  }

  @computed get all() {
    return this.users.values();
  }
}

export default UserStore;
