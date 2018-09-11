import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Store, Select } from "@ngxs/store";
import { AddSite } from "../../store/lobby.actions";
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { LobbyState } from "../../store/lobby.state";
import { Observable } from "rxjs";

export interface NewProjectData {
  siteName: string;
  siteTemplate: string;
  username: string;
}

@Component({
  selector: "app-add-project-dialog",
  templateUrl: "./add-project-dialog.component.html",
  styleUrls: ["./add-project-dialog.component.scss"]
})
export class AddProjectDialogComponent implements OnInit {
  @Select(LobbyState.sites)
  sites$: Observable<string[]>;
  sites: string[] = [];
  newSiteForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddProjectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: NewProjectData,
    private store: Store,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.sites$.subscribe(sites => (!!sites ? (this.sites = sites) : []));
    this.createForm();
  }

  createForm() {
    this.newSiteForm = this.fb.group({
      siteName: [
        this.data.siteName,
        [Validators.required, AddProjectDialogComponent.validateSiteName(this.sites)]
      ],
      siteTemplate: [this.data.siteTemplate, Validators.required],
      username: [this.data.username, Validators.required]
    });
  }

  static validateSiteName(sites: string[]) {
    return (c: FormControl) =>
      !sites.includes(c.value) ? null : { validateSiteName: { valid: false } };
  }

  createSite(user) {
    this.store.dispatch(new AddSite(this.data));
  }

  close(): void {
    this.dialogRef.close();
  }
}
