import { computed, makeObservable } from "mobx";
import UserStore from "../store/UserStore";
import { GenderType, StatusType, IUser } from "../types";

class UserModel implements IUser {
  id: string;
  name: string;
  email: string;
  gender: GenderType;
  status: StatusType;

  constructor(private store: UserStore, user: IUser) {
    makeObservable(this);
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.gender = user.gender;
    this.status = user.status;
  }

  @computed get posts() {
    return this.store.rootStore.postStore.getPostsByUserId(this.id);
  }
}

export default UserModel;
