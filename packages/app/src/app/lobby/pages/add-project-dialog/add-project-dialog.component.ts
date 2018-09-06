import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Component({
  selector: 'app-add-project-dialog',
  templateUrl: './add-project-dialog.component.html',
  styleUrls: ['./add-project-dialog.component.scss']
})
export class AddProjectDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddProjectDialogComponent>) {}

  ngOnInit() {
  }

  close(): void {
    this.dialogRef.close();
  }

}
