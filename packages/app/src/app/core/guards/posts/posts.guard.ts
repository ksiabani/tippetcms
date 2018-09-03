import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from "@angular/router";
import { Store } from "@ngxs/store";
import { LoadPosts } from "../../actions/posts.actions";

@Injectable({
  providedIn: "root"
})
export class PostsGuard implements Resolve<any> {
  constructor(private store: Store) {}

  resolve(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    if (this.store.snapshot().posts.entities.length) {
      return true;
    }
    this.store.dispatch(new LoadPosts());
    return true;
  }
}
