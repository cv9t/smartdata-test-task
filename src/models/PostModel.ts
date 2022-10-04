import PostStore from "../store/PostStore";
import { IPost } from "../types";

class PostModel implements IPost {
  id: string;
  userId: string;
  title: string;
  body: string;

  constructor(private store: PostStore, post: IPost) {
    this.id = post.id;
    this.userId = post.userId;
    this.title = post.title;
    this.body = post.body;
  }
}

export default PostModel;
