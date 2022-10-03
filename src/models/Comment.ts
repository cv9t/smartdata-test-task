import { observable } from "mobx";
import { IComment } from "../types";

class Comment implements IComment {
  @observable id: string;
  @observable postId: string;
  @observable name: string;
  @observable email: string;
  @observable body: string;

  constructor(comment: IComment) {
    this.id = comment.id;
    this.name = comment.name;
    this.email = comment.email;
    this.postId = comment.postId;
    this.body = comment.body;
  }
}

export default Comment;
