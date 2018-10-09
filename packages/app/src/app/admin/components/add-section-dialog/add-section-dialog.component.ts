import { Component, OnInit, Inject } from "@angular/core";
import { MatDialog } from "@angular/material";
import { ActivatedRoute } from "@angular/router";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Select, Store } from "@ngxs/store";
import { CreatePage, GetSectionTemplates } from "../../store/admin.actions";
import { LoginState } from "../../../login/store/login.state";
import { Observable } from "rxjs";
import { User } from "../../../shared/model/user.interface";
import { filter } from "rxjs/operators";
import { Section } from "shared";
import { SinglePageState } from "../../store/children/single-page.state";

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
  @Select(SinglePageState.sectionTemplates)
  templates: Observable<Section[]>;

  constructor(
    public dialogRef: MatDialogRef<AddSectionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: NewSectionData,
    private fb: FormBuilder,
    private store: Store,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.createForm();
    this.getSectionTemplates();
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

  // TODO
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

  getSectionTemplates() {
    const pageId = ""; //TODO
    console.log(this.activatedRoute.root.snapshot.children[0].params["id"])
    const siteId: string = this.activatedRoute.root.snapshot.children[0].params[
      "id"
    ];
    this.user
      .pipe(filter(user => !!user && !!siteId))
      .subscribe(user =>
        this.store.dispatch(new GetSectionTemplates(user.githubUser.login, siteId, pageId))
      );
  }
}
