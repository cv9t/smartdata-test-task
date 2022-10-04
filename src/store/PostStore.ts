import { action, makeObservable, observable } from "mobx";
import PostService from "../api/services/PostService";
import PostModel from "../models/PostModel";
import { IPost } from "../types";
import FetchMixin from "./FetchMixin";
import RootStore from "./RootStore";

class PostStore extends FetchMixin {
  rootStore: RootStore;
  @observable posts: PostModel[] = [];

  constructor(rootStore: RootStore, private transportLayer: PostService) {
    super();
    makeObservable(this);
    this.rootStore = rootStore;
  }

  getPostsByUserId(userId: string) {
    return this.posts.filter((post) => post.userId === userId);
  }

  @action setPosts(posts: IPost[]) {
    this.posts = posts.map((post) => new PostModel(this, post));
  }

  async fetchPostsByUserId(userId: string, page?: number) {
    return this.fetchApi(
      () => this.transportLayer.getAllByUserId(userId, page),
      (posts) => this.setPosts(posts)
    );
  }
}

export default PostStore;
