import { Component, OnInit } from "@angular/core";
import { MatTableDataSource, MatDialog } from "@angular/material";
import { Select, Store } from "@ngxs/store";
import { AdminState } from "../../store/admin.state";
import { Observable, combineLatest } from "rxjs";
import { Page } from "../../../shared/model/get-pages.interface";
import { GetPages, ChangePath } from "../../store/admin.actions";
import { LoginState } from "../../../login/store/login.state";
import { User } from "../../../shared/model/user.interface";
import { ActivatedRoute } from "@angular/router";
import { filter } from "rxjs/operators";
import { AddPageDialogComponent } from "../../components/add-page-dialog/add-page-dialog.component";

export interface Page {
  name: string;
  updated: Date;
  slug: string;
  preview?: string;
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

  displayedColumns: string[] = ["name", "slug", "preview"];
  dataSource: Page[];

  constructor(
    private store: Store,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog
  ) {}

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
    this.store.dispatch(new ChangePath(path.substring(1).split("/")));
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddPageDialogComponent, {
      disableClose: true,
      panelClass: "add-page-dialog",
      data: {}
    });
  }
}
