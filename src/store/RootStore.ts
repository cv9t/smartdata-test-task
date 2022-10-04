import Api from "../api/Api";
import PostStore from "./PostStore";
import UserStore from "./UserStore";

class RootStore {
  private api = new Api();

  userStore: UserStore;
  postStore: PostStore;

  constructor() {
    this.userStore = new UserStore(this, this.api.userService);
    this.postStore = new PostStore(this, this.api.postService);
  }
}

export default RootStore;
