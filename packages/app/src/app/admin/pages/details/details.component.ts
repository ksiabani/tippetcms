import { Component, OnInit, OnDestroy } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from "@angular/forms";
import { Subscription } from "rxjs";
import { DragulaService } from "ng2-dragula";

export interface Option {
  name: string;
  value: string;
}

export interface Section {
  name: string;
  icon: string;
  description: string;
  preview: string;
}

@Component({
  selector: "app-details",
  templateUrl: "./details.component.html",
  styleUrls: ["./details.component.scss"]
})
export class DetailsComponent implements OnInit, OnDestroy {
  pageMetaForm: FormGroup;
  paths: Option[] = [
    { name: "/", value: "/" },
    { name: "/blog", value: "/blog" },
    { name: "/products", value: "/products" }
  ];
  sections: Section[] = [
    {
      name: "Carousel",
      icon: "view_carousel",
      description: "Lorem ipsum dolor sit amet consectetur adipiscing elit",
      preview: "https://picsum.photos/150/50/?image=400"
    },
    {
      name: "Grid",
      icon: "view_comfy",
      description: "Lorem ipsum dolor sit amet consectetur adipiscing elit",
      preview: "https://picsum.photos/150/50/?image=200"
    },
    {
      name: "List",
      icon: "list",
      description: "Lorem ipsum dolor sit amet consectetur adipiscing elit",
      preview: "https://picsum.photos/150/50/?image=100"
    },
    {
      name: "Media card",
      icon: "art_track",
      description: "Lorem ipsum dolor sit amet consectetur adipiscing elit",
      preview: "https://picsum.photos/150/50/?image=301"
    }
  ];
  sections$ = new Subscription();

  constructor(
    private fb: FormBuilder,
    private dragulaService: DragulaService
  ) {}

  ngOnInit() {
    this.createForm();
    this.sections$.add(
      this.dragulaService.dropModel("sections").subscribe(({ targetModel }) => {
        console.log(targetModel);
      })
    );
    this.dragulaService.createGroup("sections", {
      moves: (el, container, handle) => {
        return handle.classList.contains("ng-handle");
      }
    });
  }

  ngOnDestroy() {
    this.sections$.unsubscribe();
    this.dragulaService.destroy("sections");
  }

  createForm() {
    this.pageMetaForm = this.fb.group({
      name: [],
      path: [],
      slug: []
    });
  }
}
