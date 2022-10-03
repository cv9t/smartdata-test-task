import { makeObservable, observable } from "mobx";
import { GenderType, StatusType, IUser } from "../types";

class User implements IUser {
  @observable id: string;
  @observable name: string;
  @observable email: string;
  @observable gender: GenderType;
  @observable status: StatusType;

  constructor(user: IUser) {
    makeObservable(this);
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.gender = user.gender;
    this.status = user.status;
  }
}

export default User;
