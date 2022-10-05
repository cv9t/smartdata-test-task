import { observable, makeObservable, action, computed } from "mobx";
import CommentService from "../api/services/CommentService";
import CommentModel from "../models/CommentModel";
import { IComment } from "../types";
import FetchMixin from "./FetchMixin";
import RootStore from "./RootStore";

class CommentStore extends FetchMixin {
  @observable comments: CommentModel[] = [];

  constructor(rootStore: RootStore, private transportLayer: CommentService) {
    super(rootStore);
    makeObservable(this);
  }

  @action setComments(comments: IComment[]) {
    this.comments = comments.map((comment) => new CommentModel(this, comment));
  }

  async fetchCommentsByPostId(postId: string, page?: number) {
    return this.fetchApi(
      () => this.transportLayer.getByPostId(postId, page),
      (comments) => this.setComments(comments)
    );
  }

  getCommentsByPostId(postId: string) {
    return computed(() =>
      this.comments.filter((comment) => comment.postId === postId)
    ).get();
  }
}

export default CommentStore;
