import { IComment } from "../types";

class CommentModel implements IComment {
  id: string;
  postId: string;
  name: string;
  email: string;
  body: string;

  constructor(comment: IComment) {
    this.id = comment.id;
    this.name = comment.name;
    this.email = comment.email;
    this.postId = comment.postId;
    this.body = comment.body;
  }
}

export default CommentModel;
