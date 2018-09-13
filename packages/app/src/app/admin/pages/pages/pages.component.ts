import { Component, OnInit } from "@angular/core";
import { MatTableDataSource } from "@angular/material";
import { Select, Store } from "@ngxs/store";
import { AdminState } from "../../store/admin.state";
import { Observable, combineLatest } from "rxjs";
import { Page } from "../../../shared/model/get-pages.interface";
import { GetPages, ChangePath } from "../../store/admin.actions";
import { LoginState } from "../../../login/store/login.state";
import { User } from "../../../shared/model/user.interface";
import { ActivatedRoute } from "@angular/router";
import { filter } from "rxjs/operators";

export interface PeriodicElement {
  name: string;
  updated: Date;
  icon?: string;
}

@Component({
  selector: "app-pages",
  templateUrl: "./pages.component.html",
  styleUrls: ["./pages.component.scss"]
})
export class PagesComponent implements OnInit {
  @Select(AdminState.pages)
  pages: Observable<Page[]>;
  @Select(AdminState.path)
  path: Observable<string[]>;
  @Select(LoginState.user)
  user: Observable<User>;

  displayedColumns: string[] = ["name", "updated"];
  dataSource: Page[];
  emptyDataSource = new MatTableDataSource<Page[]>(null);
  inFolder: boolean = false;

  constructor(private store: Store, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.pages.subscribe((pages: Page[]) => (this.dataSource = pages));
    const siteId: string = this.activatedRoute.root.snapshot.children[0].params["id"];
    combineLatest(this.user, this.path)
      .pipe(filter(([user, path]) => !!user && !!siteId && !!path))
      .subscribe(([user, path]) =>
        this.store.dispatch(
          new GetPages(user.githubUser.login, siteId, path.length ? path.join("-") : "0")
        )
      );
  }

  changeFolder(path: string): void {
    console.log(path);

    this.store.dispatch(new ChangePath(path.substring(1).split("/")));
  }
}
