import { Component, OnInit, Inject } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Select, Store } from "@ngxs/store";
import {
  CreatePage,
  GetFolders,
  GetPageTemplates
} from "../../store/admin.actions";
import { LoginState } from "../../../login/store/login.state";
import { Observable } from "rxjs";
import { User } from "../../../shared/model/user.interface";
import { filter, map } from "rxjs/operators";
import { AdminState } from "../../store/admin.state";
import { PageTemplate, xFile } from "shared";

export interface NewPageData {
  title: string;
  path: string;
  template: string;
  currPath?: string[];
  isIndex: boolean;
}

@Component({
  selector: "app-add-page-dialog",
  templateUrl: "./add-page-dialog.component.html",
  styleUrls: ["./add-page-dialog.component.scss"]
})
export class AddPageDialogComponent implements OnInit {
  addPageForm: FormGroup;
  // folders: xFile[];

  // selectors
  @Select(LoginState.user)
  user: Observable<User>;
  @Select(AdminState.pageTemplates)
  templates: Observable<PageTemplate[]>;
  // @Select(PagesState.pages)
  // pages: Observable<xFile[]>;
  @Select(AdminState.folders)
  folders: Observable<xFile[]>;

  constructor(
    public dialogRef: MatDialogRef<AddPageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: NewPageData,
    private fb: FormBuilder,
    private store: Store,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.createForm();
    this.getPageTemplates();
    this.getFolders();
  }

  createForm() {
    // TODO: Form validations
    this.addPageForm = this.fb.group({
      title: [this.data.title, Validators.required],
      path: [this.data.path || ""],
      template: [this.data.template, Validators.required],
      isIndex: [this.data.isIndex]
    });
  }

  close(): void {
    this.dialogRef.close();
  }

  createPage(user) {
    const siteId: string = this.activatedRoute.root.snapshot.children[0].params[
      "id"
    ];
    const pathValue = this.addPageForm.value.path;
    // Lowercase path and add leading slash if missing
    const path =
      pathValue.substring(0, 1) !== "/"
        ? `/${pathValue.toLowerCase()}`
        : pathValue.toLowerCase();
    //TODO: replace with ...this.addPageForm.value below;
    this.store.dispatch(
      new CreatePage(
        user.githubUser.login,
        siteId,
        this.addPageForm.value.title,
        path,
        this.addPageForm.value.template,
        this.addPageForm.value.isIndex || false
      )
    );
  }

  getPageTemplates() {
    const siteId: string = this.activatedRoute.root.snapshot.children[0].params[
      "id"
    ];
    this.user
      .pipe(filter(user => !!user && !!siteId))
      .subscribe(user =>
        this.store.dispatch(new GetPageTemplates(user.githubUser.login, siteId))
      );
  }

  getFolders() {
    const siteId: string = this.activatedRoute.root.snapshot.children[0].params[
      "id"
    ];
    this.user
      .pipe(filter(user => !!user && !!siteId))
      .subscribe(user =>
        this.store.dispatch(new GetFolders(user.githubUser.login, siteId))
      );
  }
}
