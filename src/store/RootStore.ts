import { action, makeObservable, observable } from "mobx";
import Api from "../api/Api";
import CommentStore from "./CommentStore";
import PostStore from "./PostStore";
import UserStore from "./UserStore";

class RootStore {
  private api = new Api();

  userStore: UserStore;
  postStore: PostStore;
  commentStore: CommentStore;

  @observable errorMessage: string | null = null;

  constructor() {
    makeObservable(this);
    this.userStore = new UserStore(this, this.api.userService);
    this.postStore = new PostStore(this, this.api.postService);
    this.commentStore = new CommentStore(this, this.api.commentService);
  }

  @action setErrorMessage(value: string | null) {
    this.errorMessage = value;
  }
}

export default RootStore;
