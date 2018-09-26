import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { FormControl, FormGroup, FormBuilder } from "@angular/forms";
import { Select, Store } from "@ngxs/store";
import { SinglePageState } from "../../store/children/single-page.state";
import { Observable } from "rxjs";
import { filter } from "rxjs/operators";
import { User } from "src/app/shared/model/user.interface";
import { GetSinglePage, SavePage } from "../../store/admin.actions";
import { LoginState } from "../../../login/store/login.state";
import { Section, Tile, Page } from "shared";
import { AdminState } from "../../store/admin.state";

export interface TileForm {
  name: string;
  subForms: FormGroup[];
}

@Component({
  selector: "app-section",
  templateUrl: "./section.component.html",
  styleUrls: ["./section.component.scss"]
})
export class SectionComponent implements OnInit {
  sectionDataForm: FormGroup;
  sectionDataProps: string[] = [];
  forms: TileForm[] = [];
  section: Section;
  tiles: Tile[];
  user: User;
  page: Page;

  // Selectors
  @Select(LoginState.user)
  user$: Observable<User>;
  @Select(SinglePageState.page)
  page$: Observable<Page>;
  @Select(AdminState.initSave)
  initSave: Observable<any>;

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private store: Store
  ) {}

  ngOnInit() {
    this.user$.pipe(filter(user => !!user)).subscribe(user => {
      this.user = user;
      this.getPage(user);
    });
    this.page$.pipe(filter(page => !!page)).subscribe(page => {
      const sectionId = this.activatedRoute.snapshot.params["sectionId"];
      this.page = page;
      this.section = page.components.find(section => section.id === sectionId);
      this.tiles = this.section && this.section.dependencies;
      if (this.section && this.section.data) {
        this.createForm(this.section.data);
      }
      if (this.tiles) {
        this.createSubForms(this.tiles);
      }
    });
    this.initSave
      .pipe(filter(initSave => initSave && this.sectionDataForm.valid))
      .subscribe(() => this.save());
  }

  private createForm(section): void {
    this.sectionDataProps = [];
    const formDataObj = {};
    for (const prop of Object.keys(section)) {
      formDataObj[prop] = new FormControl(section[prop]);
      this.sectionDataProps.push(prop);
    }
    this.sectionDataForm = this.fb.group(formDataObj);
  }

  private createSubForms(tiles): void {
    this.forms = [];
    tiles.map((tile, i) => {
      this.forms.push({
        name: tile.name,
        subForms: []
      });
      tile.data.map(piece => {
        const formDataObj = {};
        const form = this.forms.find(form => form.name === tile.name);
        for (const prop of Object.keys(piece)) {
          formDataObj[prop] = new FormControl(piece[prop]);
        }
        form.subForms.push(this.fb.group(formDataObj));
      });
    });
    console.log(this.forms);
  }

  getFormProps(form) {
    let props = [];
    Object.keys(form.controls).forEach(key => {
      props.push(key);
    });
    return props;
  }

  private getPage(user) {
    const pageId: string = this.activatedRoute.snapshot.params["pageId"];
    const siteId: string = this.activatedRoute.root.snapshot.children[0].params[
      "id"
    ];
    if (pageId && siteId) {
      this.store.dispatch(
        new GetSinglePage(user.githubUser.login, siteId, pageId)
      );
    }
  }

  private save() {
    if (this.user && this.page) {
      const siteId: string = this.activatedRoute.root.snapshot.children[0]
        .params["id"];
      const login = this.user.githubUser.login;
      const dependencies = this.forms.map(form => {
        return {
          name: form.name,
          data: form.subForms.map(subform => subform.value)
        };
      });
      const components: Section[] = [
        ...this.page.components.filter(
          section => section.id !== this.section.id
        ),
        {
          ...this.section,
          data: { ...this.sectionDataForm.value },
          dependencies: [...dependencies]
        }
      ];
      const newPageData: Page = {
        ...this.page,
        components
      };
      this.store.dispatch(
        new SavePage(login, siteId, this.page.id, newPageData)
      );
    }
  }
}
