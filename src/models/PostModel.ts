import { computed, makeObservable } from "mobx";
import PostStore from "../store/PostStore";
import { IPost } from "../types";

class PostModel implements IPost {
  id: string;
  userId: string;
  title: string;
  body: string;

  constructor(private store: PostStore, post: IPost) {
    makeObservable(this);
    this.id = post.id;
    this.userId = post.userId;
    this.title = post.title;
    this.body = post.body;
  }

  @computed get comments() {
    return this.store.rootStore.commentStore.getCommentsByPostId(this.id);
  }
}

export default PostModel;
