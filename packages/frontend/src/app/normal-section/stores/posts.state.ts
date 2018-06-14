import { State, Action, StateContext } from "@ngxs/store";
import { AddPost, LoadPosts } from "../actions/posts.actions";
import { HttpClient } from "@angular/common/http";
import { tap } from "rxjs/operators";

export interface Post {
  id: string;
  name: string;
}

export interface PostsStateModel {
  entities: Post[];
  loading: boolean;
}

@State<PostsStateModel>({
  name: "posts",
  defaults: { entities: [], loading: false }
})
export class PostsState {
  postsUrl = "http://localhost:3000/posts";
  constructor(private http: HttpClient) {}

  @Action(AddPost)
  addPost(ctx: StateContext<PostsStateModel>, { post }: AddPost) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      entities: [...state.entities, post]
    });
  }

  @Action(LoadPosts)
  loadPosts(ctx: StateContext<PostsStateModel>) {
    const state = ctx.getState();
    this.http
      .get(this.postsUrl)
      .subscribe((posts: Post[]) => ctx.setState({ ...state, entities: [...posts] }));
    // .pipe(tap((posts: Post[]) => ));
  }
}
