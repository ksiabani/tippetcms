import { Component, OnInit, ViewChild } from "@angular/core";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { Observable } from "rxjs";
import { filter, map } from "rxjs/operators";
import { Select } from "@ngxs/store";
import { Store } from "@ngxs/store";
import { environment } from "../../../../environments/environment";
import { LoginState } from "../../../login/store/login.state";
import { Logout } from "../../../login/store/login.actions";
import { Router, ActivatedRoute } from "@angular/router";
import { BuildSite, InitSave, PublishSite } from "../../store/admin.actions";
import { AdminState } from "../../store/admin.state";
import { User } from "src/app/shared/model/user.interface";
import { SinglePageState } from "../../store/children/single-page.state";
import { Page } from "shared";
import { MatSidenav } from "@angular/material";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.scss"]
})
export class AdminComponent implements OnInit {
  isHome: boolean;
  isMobile: Observable<boolean> = this.breakpointObserver
    .observe([
      Breakpoints.Handset,
      Breakpoints.TabletPortrait,
      Breakpoints.WebPortrait
    ])
    .pipe(map(result => result.matches));

  // selectors
  @Select(LoginState.user)
  user: Observable<User>;
  @Select(AdminState.building)
  isBuilding: Observable<boolean>;
  @Select(SinglePageState.page)
  page: Observable<Page>;
  @Select(SinglePageState.saving)
  isSaving: Observable<boolean>;

  // Get a sidenav instance to use later
  @ViewChild("sidenav")
  sidenav: MatSidenav;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private store: Store,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {}

  getRoute() {
    this.isHome = this.router.url.split("/").length === 3;
  }

  logout() {
    this.store.dispatch(Logout);
  }

  build() {
    const siteId: string = this.activatedRoute.root.snapshot.children[0].params[
      "id"
    ];
    this.user
      .pipe(filter(user => !!user && !!siteId))
      .subscribe(user =>
        this.store.dispatch(new BuildSite(user.githubUser.login, siteId))
      );
  }

  save() {
    this.store.dispatch(new InitSave(true));
  }

  preview() {
    const siteId: string = this.activatedRoute.root.snapshot.children[0].params[
      "id"
    ];
    this.user
      .pipe(filter(user => !!user && !!siteId))
      .subscribe(user =>
        window.open(
          `${environment.api.root}/${user.githubUser.login}/${siteId}`,
          "_blank"
        )
      );
  }

  publish() {
    const siteId: string = this.activatedRoute.root.snapshot.children[0].params[
      "id"
      ];
    this.user
      .pipe(filter(user => !!user && !!siteId))
      .subscribe(user =>
        this.store.dispatch(new PublishSite(user.githubUser.login, siteId))
      );
  }

  // Get a sidenav instance to use later
  closeSidenav() {
    if (this.breakpointObserver.isMatched('(max-width: 959px)')) {
      this.sidenav.close();
    }
  }
}
