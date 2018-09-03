import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { map } from "rxjs/operators";
import { Select, Store } from "@ngxs/store";
import { PostsState, PostsStateModel } from "../../stores/posts.state";
import { Observable } from "rxjs";
import { AddPost } from "../../actions/posts.actions";

@Component({
  selector: "app-posts",
  templateUrl: "./posts.component.html",
  styleUrls: ["./posts.component.css"]
})
export class PostsComponent implements OnInit {
  @Select(PostsState) posts$: Observable<PostsStateModel>;

  constructor(private route: ActivatedRoute, private store: Store) {}

  ngOnInit() {}

  addRandomPost() {
    const randomNum = Math.floor(Math.random() * 10 + 1);
    this.store.dispatch(new AddPost({ id: randomNum.toString(), name: randomNum.toString() }));
  }
}
