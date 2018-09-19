import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { FormControl, FormGroup, FormBuilder } from "@angular/forms";
import { Select, Store } from "@ngxs/store";
import { SinglePageState } from "../../store/children/single-page.state";
import { Observable } from "rxjs";
import { filter } from "rxjs/operators";
import { User } from "src/app/shared/model/user.interface";
import { GetSinglePage } from "../../store/admin.actions";
import { LoginState } from "../../../login/store/login.state";

@Component({
  selector: "app-section",
  templateUrl: "./section.component.html",
  styleUrls: ["./section.component.scss"]
})
export class SectionComponent implements OnInit {
  sectionDataForm: FormGroup;
  sectionDataProps: string[] = [];
  subForms: FormGroup[] = [];
  subFormProps: any[] = [];
  section: any; //TODO: Type this
  tiles: any[]; // TODO: Type this
  pageId: string;
  sectionId: string;

  // Selectors
  @Select(LoginState.user)
  user: Observable<User>;
  @Select(SinglePageState.page)
  page: Observable<any>;

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private store: Store
  ) {}

  ngOnInit() {
    this.pageId = this.activatedRoute.snapshot.params["pageId"];
    this.sectionId = this.activatedRoute.snapshot.params["sectionId"];
    this.getPage();
    this.page.pipe(filter(page => !!page)).subscribe(page => {
      this.section = page.components.find(
        section => section.id === this.sectionId
      );
      this.tiles = this.section && this.section.dependencies;
      if (this.section && this.section.data) {
        this.createForm(this.section.data);
      }
      if (this.tiles) {
        this.createSubForms(this.tiles);
      }
    });
  }

  createForm(section): void {
    this.sectionDataProps = []; // TODO: @Megas please have a look
    const formDataObj = {};
    for (const prop of Object.keys(section)) {
      formDataObj[prop] = new FormControl(section[prop]);
      this.sectionDataProps.push(prop);
    }
    this.sectionDataForm = this.fb.group(formDataObj);
  }

  createSubForms(tiles): void {
    this.subForms = []; // TODO: @Megas please have a look
    this.subFormProps = []; // TODO: @Megas please have a look
    for (let j = 0; j < tiles.length; j++) {
      let tile = tiles[j];
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
