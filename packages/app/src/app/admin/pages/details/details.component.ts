import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";

export interface Option {
  name: string;
  value: string;
}

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  pageMetaForm: FormGroup;
  paths: Option[] = [
    {name: "/", value: "/"},
    {name: "/blog", value: "/blog"},
    {name: "/products", value: "/products"}
  ];

  constructor(
    private fb: FormBuilder
  ) {
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.pageMetaForm = this.fb.group({
      name: [],
      path: [],
      slug: []
    });
  }
}
