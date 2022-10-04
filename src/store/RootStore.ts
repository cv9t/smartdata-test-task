import Api from "../api/Api";
import CommentStore from "./CommentStore";
import PostStore from "./PostStore";
import UserStore from "./UserStore";

class RootStore {
  private api = new Api();

  userStore: UserStore;
  postStore: PostStore;
  commentStore: CommentStore;

  constructor() {
    this.userStore = new UserStore(this, this.api.userService);
    this.postStore = new PostStore(this, this.api.postService);
    this.commentStore = new CommentStore(this, this.api.commentService);
  }
}

export default RootStore;
