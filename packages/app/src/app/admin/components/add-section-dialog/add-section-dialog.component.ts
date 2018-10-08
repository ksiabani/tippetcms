import { Component, OnInit, Inject } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Select, Store } from "@ngxs/store";
import { CreatePage, GetPageTemplates } from "../../store/admin.actions";
import { LoginState } from "../../../login/store/login.state";
import { Observable } from "rxjs";
import { User } from "../../../shared/model/user.interface";
import { filter } from "rxjs/operators";
import { AdminState } from "../../store/admin.state";
import { PageTemplate, Section } from "shared";

export interface NewSectionData {
  title: string;
  template: string;
}

export interface Option {
  value: string;
  name: string;
}

@Component({
  selector: "app-add-section-dialog",
  templateUrl: "./add-section-dialog.component.html",
  styleUrls: ["./add-section-dialog.component.scss"]
})
export class AddSectionDialogComponent implements OnInit {
  addSectionForm: FormGroup;
  sections: Section[];

  // selectors
  @Select(LoginState.user)
  user: Observable<User>;
  @Select(AdminState.pageTemplates)
  templates: Observable<PageTemplate[]>;

  constructor(
    public dialogRef: MatDialogRef<AddSectionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: NewSectionData,
    private fb: FormBuilder,
    private store: Store,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.createForm();
    this.getPageTemplates();
    // this.getSections();
  }

  createForm() {
    // TODO: Form validations
    this.addSectionForm = this.fb.group({
      title: [this.data.title, Validators.required],
      template: [this.data.template, Validators.required]
    });
  }

  close(): void {
    this.dialogRef.close();
  }

  createSection(user) {
    const siteId: string = this.activatedRoute.root.snapshot.children[0].params[
      "id"
    ];
    //TODO: replace with ...this.addPageForm.value below;
    this.store.dispatch(
      new CreatePage(
        user.githubUser.login,
        siteId,
        this.addSectionForm.value.title,
        this.addSectionForm.value.path,
        this.addSectionForm.value.template
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

  // TODO: You were here
  // getSections() {
  //   const pageId: string = this.activatedRoute.root.snapshot.children[1].params[
  //     "id"
  //     ];
  //   console.log(pageId);
  //   this.templates.subscribe(templates => {
  //       if(templates.length) {
  //         templates.filter()
  //       }
  //     }
  //   )
  // }
}
