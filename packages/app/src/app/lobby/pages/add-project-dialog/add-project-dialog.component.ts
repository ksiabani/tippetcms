import { Component, OnInit,  Inject} from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

export interface newProjectData {
  siteName: string;
  siteTemplate: string;
}

@Component({
  selector: "app-add-project-dialog",
  templateUrl: "./add-project-dialog.component.html",
  styleUrls: ["./add-project-dialog.component.scss"]
})
export class AddProjectDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AddProjectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: newProjectData
  ) {}

  ngOnInit() {}

  close(): void {
    this.dialogRef.close();
  }
}
