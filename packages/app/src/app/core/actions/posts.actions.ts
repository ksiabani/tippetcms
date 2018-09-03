import { Post } from "../stores/posts.state";

export class AddPost {
  static readonly type = "[Posts] Add Post";
  constructor(public post: Post) {}
}

export class LoadPosts {
  static readonly type = "[Posts] Load Posts";
  constructor() {}
}
