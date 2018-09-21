import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Subscription, combineLatest, Observable, forkJoin } from "rxjs";
import { DragulaService } from "ng2-dragula";
import { Store, Select } from "@ngxs/store";
import { filter } from "rxjs/operators";
import { GetSinglePage, SavePage, InitSave } from "../../store/admin.actions";
import { ActivatedRoute } from "@angular/router";
import { LoginState } from "../../../login/store/login.state";
import { User } from "src/app/shared/model/user.interface";
import { SinglePageState } from "../../store/children/single-page.state";
import { AdminState } from "../../store/admin.state";
import { Page, Section } from "shared";

export interface Option {
  name: string;
  value: string;
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
  sections$ = new Subscription();
  sections: Section[];
  page: Page;
  user: User;

  // selectors
  @Select(LoginState.user)
  user$: Observable<User>;
  @Select(SinglePageState.page)
  page$: Observable<any>;
  @Select(AdminState.initSave)
  initSave: Observable<any>;

  constructor(
    private fb: FormBuilder,
    private dragulaService: DragulaService,
    private store: Store,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.page$.pipe(filter(page => !!page)).subscribe(page => {
      this.sections = page.components;
      this.page = page;
      this.createForm(page);
    });
    this.user$.pipe(filter(user => !!user)).subscribe(user => {
      this.user = user;
      this.getPage(user);
    });
    this.sections$.add(
      this.dragulaService.dropModel("sections").subscribe(({ targetModel }) => {
        this.orderSections(targetModel);
      })
    );
    this.initSave.subscribe(initSave => {
      if (initSave && this.pageMetaForm.valid) {
        this.save();
      }
    });
  }

  ngOnDestroy() {
    this.sections$.unsubscribe();
    this.dragulaService.destroy("sections");
  }

  getPage(user) {
    const pageId = this.activatedRoute.snapshot.params["pageId"];
    const siteId: string = this.activatedRoute.root.snapshot.children[0].params[
      "id"
    ];
    pageId &&
      siteId &&
      this.store.dispatch(
        new GetSinglePage(user.githubUser.login, siteId, pageId)
      );
  }

  createForm(page: any): void {
    this.pageMetaForm = this.fb.group({
      name: [page.name, Validators.required],
      path: [page.path, Validators.required],
      slug: [page.slug]
    });
  }

  save() {
    const siteId: string = this.activatedRoute.root.snapshot.children[0].params[
      "id"
    ];
    this.page.name = this.pageMetaForm.get("name").value;
    this.page.path = this.pageMetaForm.get("path").value;
    this.page.slug = this.pageMetaForm.get("slug").value;
    this.page.components = this.sections;
    this.user &&
      this.page &&
      this.store.dispatch(
        new SavePage(
          this.user.githubUser.login,
          siteId,
          this.page.id,
          this.page
        )
      );
    // TODO: @Megas how to dispatch the following action after the previous one has "finished"
    this.store.dispatch(new InitSave(false));
  }

  orderSections(sections) {
    for (let i = 0; i < sections.length; i++) {
      sections[i].position = i + 1;
    }
    this.sections = sections;
    this.save();
  }
}
