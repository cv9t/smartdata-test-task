import { action, makeObservable, observable, computed } from "mobx";
import PostService from "../api/services/PostService";
import PostModel from "../models/PostModel";
import { IPost } from "../types";
import FetchMixin from "./FetchMixin";
import RootStore from "./RootStore";

class PostStore extends FetchMixin {
  @observable posts: PostModel[] = [];

  constructor(rootStore: RootStore, private transportLayer: PostService) {
    super(rootStore);
    makeObservable(this);
  }

  @action setPosts(posts: IPost[]) {
    this.posts = posts.map((post) => new PostModel(this, post));
  }

  async fetchPostsByUserId(userId: string, page?: number) {
    return this.fetchApi(
      () => this.transportLayer.getByUserId(userId, page),
      (posts) => this.setPosts(posts)
    );
  }

  async fetchPost(id: string) {
    return this.fetchApi(
      () => this.transportLayer.getById(id),
      (post) => this.setPosts([post])
    );
  }

  getPostsByUserId(userId: string) {
    return computed(() =>
      this.posts.filter((post) => post.userId === userId)
    ).get();
  }

  getPostById(id: string | undefined) {
    return computed(() => this.posts.find((post) => post.id === id)).get();
  }
}

export default PostStore;
