import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Select, Store } from "@ngxs/store";
import { LoginState } from "../../../login/store/login.state";
import { User } from "../../../shared/model/user.interface";
import { Observable } from "rxjs/internal/Observable";
import { AddSite } from "../../store/lobby.actions";

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
  constructor(
    public dialogRef: MatDialogRef<AddProjectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: NewProjectData,
    private store: Store
  ) {}

  ngOnInit() {}

  createSite(user) {
    this.store.dispatch(new AddSite(this.data));
  }

  close(): void {
    this.dialogRef.close();
  }
}
