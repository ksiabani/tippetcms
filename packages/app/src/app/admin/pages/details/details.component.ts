import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { Subscription, combineLatest, Observable } from "rxjs";
import { DragulaService } from "ng2-dragula";
import { Store, Select } from "@ngxs/store";
import { filter } from "rxjs/operators";
import { GetSinglePage } from "../../store/admin.actions";
import { ActivatedRouteSnapshot, ActivatedRoute } from "@angular/router";
import { LoginState } from "../../../login/store/login.state";
import { User } from "src/app/shared/model/user.interface";
import { SinglePageState } from "../../store/children/single-page.state";

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
  @Select(LoginState.user)
  user: Observable<User>;
  pageMetaForm: FormGroup;
  paths: Option[] = [
    { name: "/", value: "/" },
    { name: "/blog", value: "/blog" },
    { name: "/products", value: "/products" }
  ];
  @Select(SinglePageState.page)
  page: Observable<any>;
  sections$ = new Subscription();

  constructor(
    private fb: FormBuilder,
    private dragulaService: DragulaService,
    private store: Store,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getPage();
    this.page.pipe(filter(page => !!page)).subscribe(page => this.createForm(page));
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

  getPage() {
    const pageId = this.activatedRoute.snapshot.params["pageId"];
    const siteId: string = this.activatedRoute.root.snapshot.children[0].params["id"];
    this.user
      .pipe(filter(user => !!user && !!siteId && !!pageId))
      .subscribe(user =>
        this.store.dispatch(new GetSinglePage(user.githubUser.login, siteId, pageId))
      );
  }

  createForm(page: any): void {
    this.pageMetaForm = this.fb.group({
      name: [page.name],
      path: [page.path],
      slug: [page.slug]
    });
  }
}
