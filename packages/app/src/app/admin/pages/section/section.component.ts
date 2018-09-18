import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { FormControl, FormGroup, FormBuilder } from "@angular/forms";
import { Select, Store } from "@ngxs/store";
import { SinglePageState } from "../../store/children/single-page.state";
import { Observable } from "rxjs";
import { filter } from "rxjs/operators";
import { User } from "src/app/shared/model/user.interface"
import { GetSinglePage } from "../../store/admin.actions";
import { LoginState } from "../../../login/store/login.state";

// export interface SectionData {
//   [key: string]: string;
// }

@Component({
  selector: "app-section",
  templateUrl: "./section.component.html",
  styleUrls: ["./section.component.scss"]
})
export class SectionComponent implements OnInit {
  // data: SectionData = {
  //   title: "Our Offered Services",
  //   subtitle: "We offer some hell of a services",
  //   description: "lorem ipsum"
  // };
  // tiles: any[] = [
  //   {
  //     name: "tile",
  //     data: [
  //       {
  //         title: "Unlimited Colors",
  //         subtitle: "Lorem ipsum dolor sit amet",
  //         icon: "img/site/icon1.png"
  //       }
  //     ]
  //   },
  //   {
  //     name: "square",
  //     data: [
  //       {
  //         title: "Free Coffee",
  //         subtitle: "Lorem ipsum dolor sit amet",
  //         icon: "img/site/icon1.png",
  //         descr: "hello there"
  //       }
  //     ]
  //   }
  // ];
  sectionDataForm: FormGroup;
  sectionDataProps: string[] = [];
  subForms: FormGroup[] = [];
  subFormProps: any[] = [];
  sectionData: any;
  tiles: any[];

  // Selectors
  @Select(LoginState.user)
  user: Observable<User>;
  @Select(SinglePageState.page)
  page: Observable<any>;

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private store: Store
  ) {
  }

  ngOnInit() {
    this.getPage();
    // this.createForm();
    // this.createSubForms();
    this.page.pipe(filter(page => !!page)).subscribe(page => {
      const sectionId = this.activatedRoute.snapshot.params["sectionId"];
      this.sectionData  = page.components.find(section => section.id === sectionId).data;
      console.log(this.sectionData);
      // this.tiles = this.sectionData.dependencies;
      this.createForm(this.sectionData);
      // console.log(this.section, this.tiles);
    });
  }

  createForm(section): void {
    const formDataObj = {};
    for (const prop of Object.keys(section)) {
      formDataObj[prop] = new FormControl(section[prop]);
      this.sectionDataProps.push(prop);
    }
    console.log(formDataObj)
    this.sectionDataForm = this.fb.group(formDataObj);
  }

  createSubForms(): void {
    for (let j = 0; j < this.tiles.length; j++) {
      let tile = this.tiles[j];
      for (let i = 0; i < tile.data.length; i++) {
        const formDataObj = {};
        this.subFormProps.push([]);
        for (const prop of Object.keys(tile.data[i])) {
          formDataObj[prop] = new FormControl(tile.data[i][prop]);
          this.subFormProps[j].push(prop);
        }
        this.subForms.push(this.fb.group(formDataObj));
      }
    }
  }

  getPage() {
    const pageId = this.activatedRoute.snapshot.params["pageId"];
    const siteId: string = this.activatedRoute.root.snapshot.children[0].params[
      "id"
      ];
    this.user
      .pipe(filter(user => !!user && !!siteId && !!pageId))
      .subscribe(user =>
        this.store.dispatch(
          new GetSinglePage(user.githubUser.login, siteId, pageId)
        )
      );
  }
}
