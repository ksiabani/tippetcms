import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { NewSectionData } from "../add-section-dialog/add-section-dialog.component";

@Component({
  selector: "app-add-media-dialog",
  templateUrl: "./add-media-dialog.component.html",
  styleUrls: ["./add-media-dialog.component.scss"]
})
export class AddMediaDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<AddMediaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) {}

  ngOnInit() {}

  selectMedia(image){
    this.data = image;
    this.dialogRef.close(image);
  }

  close(): void {
    this.dialogRef.close();
  }
}
