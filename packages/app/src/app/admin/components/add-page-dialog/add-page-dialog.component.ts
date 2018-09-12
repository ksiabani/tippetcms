import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";

export interface NewPageData {
  name: string;
  path: string;
  slug: string;
  template: string;
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
  templates: Option[] = [
    {value: "home", name: "Homepage"},
    {value: "blogIndex", name: "Blog index"},
    {value: "blogPage", name: "Blog page"},
    {value: "generic", name: "Generic page"}
  ];

  constructor(
    public dialogRef: MatDialogRef<AddPageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: NewPageData,
    private fb: FormBuilder
  ) {
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.addPageForm = this.fb.group({
      name: [this.data.name],
      path: [this.data.path],
      slug: [this.data.slug],
      template: [this.data.template]
    });
  }

  close(): void {
    this.dialogRef.close();
  }
}
