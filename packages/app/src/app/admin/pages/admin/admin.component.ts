import { Component, OnInit } from "@angular/core";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Select } from "@ngxs/store";
import { Store } from "@ngxs/store";
import { LoginState } from "../../../login/store/login.state";
import { Logout } from "../../../login/store/login.actions";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.scss"]
})
export class AdminComponent implements OnInit {
  @Select(LoginState.user)
  user: Observable<firebase.User>;
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map(result => result.matches));

  constructor(
    private breakpointObserver: BreakpointObserver,
    private store: Store
  ) {}

  ngOnInit() {}

  logout() {
    this.store.dispatch(Logout);
  }
}
