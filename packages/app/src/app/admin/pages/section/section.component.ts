import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, FormBuilder } from "@angular/forms";

export interface SectionData {
  [key: string]: string;
}

@Component({
  selector: "app-section",
  templateUrl: "./section.component.html",
  styleUrls: ["./section.component.scss"]
})
export class SectionComponent implements OnInit {
  data: SectionData = {
    title: "Our Offered Services",
    subtitle: "We offer some hell of a services",
    description: "lorem ipsum"
  };
  tiles: any[] = [
    {
      name: "tile",
      data: [
        {
          title: "Unlimited Colors",
          subtitle: "Lorem ipsum dolor sit amet",
          icon: "img/site/icon1.png"
        }
      ]
    },
    {
      name: "some other sub",
      data: [
        {
          title: "Free Coffee",
          subtitle: "Lorem ipsum dolor sit amet",
          icon: "img/site/icon1.png",
          descr: "hello there"
        }
      ]
    }
  ];
  sectionDataForm: FormGroup;
  sectionDataProps: string[] = [];
  subForms: FormGroup[] = [];
  subFormProps: any[] = [];

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.createForm();
    this.createSubForms();
    console.log(this.subForms);
    console.log(this.subFormProps);
  }

  createForm(): void {
    const formDataObj = {};
    for (const prop of Object.keys(this.data)) {
      formDataObj[prop] = new FormControl(this.data[prop]);
      this.sectionDataProps.push(prop);
    }
    this.sectionDataForm = this.fb.group(formDataObj);
  }

  createSubForms(): void {
    for (let tile of this.tiles) {
      for (let i = 0; i < tile.data.length; i++) {
        const formDataObj = {};
        this.subFormProps.push([]);
        for (const prop of Object.keys(tile.data[i])) {
          formDataObj[prop] = new FormControl(tile.data[i][prop]);
          this.subFormProps[i].push(prop);
        }
        this.subForms.push(this.fb.group(formDataObj));
      }
    }
  }
}
