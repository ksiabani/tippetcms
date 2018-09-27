import { Component, OnInit, Inject } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Select, Store } from "@ngxs/store";
import { CreatePage } from "../../store/admin.actions";
import { LoginState } from "../../../login/store/login.state";
import { Observable } from "rxjs";
import { User } from "../../../shared/model/user.interface";

export interface NewPageData {
  title: string;
  path: string;
  template: string;
  currPath?: string[];
}

export interface Option {
  value: string;
  name: string;
}

@Component({
  selector: "app-add-page-dialog",
  templateUrl: "./add-page-dialog.component.html",
  styleUrls: ["./add-page-dialog.component.scss"]
})
export class AddPageDialogComponent implements OnInit {
  addPageForm: FormGroup;
  // TODO: Replace this with data from the server
  templates: Option[] = [
    { value: "homePage", name: "Homepage" },
    { value: "blogIndex", name: "Blog index" },
    { value: "blogPost", name: "Blog post" },
    { value: "generic", name: "Generic page" }
  ];
  // TODO: Replace this with data from the server
  folders: Option[] = [
    { name: "/", value: "/" },
    { name: "/blog", value: "/blog" },
    { name: "/products", value: "/products" }
  ];

  // selectors
  @Select(LoginState.user)
  user: Observable<User>;

  constructor(
    public dialogRef: MatDialogRef<AddPageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: NewPageData,
    private fb: FormBuilder,
    private store: Store,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    // TODO: Form validations
    this.addPageForm = this.fb.group({
      title: [this.data.title, Validators.required],
      path: [this.data.path || ""],
      template: [this.data.template, Validators.required]
    });
  }

  close(): void {
    this.dialogRef.close();
  }

  createPage(user) {
    const siteId: string = this.activatedRoute.root.snapshot.children[0].params[
      "id"
    ];
    //TODO: replace with ...this.addPageForm.value below;
    this.store.dispatch(
      new CreatePage(
        user.githubUser.login,
        siteId,
        this.addPageForm.value.title,
        this.addPageForm.value.path,
        this.addPageForm.value.template
      )
    );
  }
}
