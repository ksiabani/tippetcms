import { Component, OnInit, OnDestroy } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from "@angular/forms";
import { Subscription, Observable } from "rxjs";
import { DragulaService } from "ng2-dragula";
import { Store, Select } from "@ngxs/store";
import { filter } from "rxjs/operators";
import { GetSinglePage, SavePage } from "../../store/admin.actions";
import { ActivatedRoute } from "@angular/router";
import { LoginState } from "../../../login/store/login.state";
import { User } from "src/app/shared/model/user.interface";
import { SinglePageState } from "../../store/children/single-page.state";
import { AdminState } from "../../store/admin.state";
import { Page, Section } from "shared";
import { MatDialog } from "@angular/material";
import { AddSectionDialogComponent } from "../../components/add-section-dialog/add-section-dialog.component";
import { untilComponentDestroyed } from "@w11k/ngx-componentdestroyed";
import { AddMediaDialogComponent } from "../../components/add-media-dialog/add-media-dialog.component";
import { environment } from "../../../../environments/environment";

export interface Option {
  name: string;
  value: string;
}

@Component({
  selector: "app-page",
  templateUrl: "./page.component.html",
  styleUrls: ["./page.component.scss"]
})
export class PageComponent implements OnInit, OnDestroy {
  pageMetaForm: FormGroup;
  articleForm: FormGroup;
  sections$ = new Subscription();
  sections: Section[];
  page: Page;
  user: User;
  isArticle: boolean = false;
  quillEditor: any;

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
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.user$
      .pipe(
        filter(user => !!user),
        untilComponentDestroyed(this)
      )
      .subscribe(user => {
        this.user = user;
        this.getPage(user);
      });
    this.page$
      .pipe(
        filter(page => !!page),
        untilComponentDestroyed(this)
      )
      .subscribe(page => {
        // Do not show components that have no data, e.g. Excerpts component
        this.sections = page.components.filter(com => !!com.data);
        this.page = page;
        this.createForm(page);
        this.isArticle =
          this.sections.length === 1 && this.sections[0].name === "editor";
        if (this.isArticle) {
          this.createArticleForm(this.sections[0].data);
        }
      });
    this.sections$.add(
      this.dragulaService
        .dropModel("sections")
        .pipe(untilComponentDestroyed(this))
        .subscribe(({ targetModel }) => this.orderSections(targetModel))
    );
    this.initSave
      .pipe(
        filter(initSave => initSave && this.pageMetaForm.valid),
        untilComponentDestroyed(this)
      )
      .subscribe(() => this.save());
  }

  ngOnDestroy() {}

  editorInit(quill) {
    quill
      .getModule("toolbar")
      .addHandler("image", this.openAddMediaDialog.bind(this));
    quill.focus();
    this.quillEditor = quill;
  }

  openDialog(): void {
    const pageId: string = this.activatedRoute.snapshot.params["pageId"];
    const dialogRef = this.dialog.open(AddSectionDialogComponent, {
      disableClose: true,
      panelClass: "add-section-dialog",
      data: { pageId }
    });
  }

  openAddMediaDialog(): void {
    const dialogRef = this.dialog.open(AddMediaDialogComponent, {
      disableClose: true,
      panelClass: "add-media-dialog"
    });
    dialogRef.afterClosed().subscribe(image => {
      if (this.user && image) {
        const siteId: string = this.activatedRoute.root.snapshot.children[0]
          .params["id"];
        const imageUrl = `${environment.api.root}/${
          this.user.githubUser.login
        }/${siteId}/images/${image}`;
        const range = this.quillEditor.getSelection();
        this.quillEditor.insertEmbed(range.index, "image", imageUrl || image);
      }
    });
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

  private createForm(page: any): void {
    this.pageMetaForm = this.fb.group({
      title: [page.title, Validators.required],
      slug: [page.slug, Validators.required]
    });
  }

  private createArticleForm(article: any): void {
    this.articleForm = this.fb.group({
      heading: [article.heading],
      description: [article.description],
      html: [article.html]
    });
  }

  private save() {
    if (this.user && this.page) {
      const siteId: string = this.activatedRoute.root.snapshot.children[0]
        .params["id"];
      const login = this.user.githubUser.login;
      const components = this.isArticle
        ? [
            {
              ...this.sections[0],
              data: {
                ...this.sections[0].data,
                heading: this.articleForm.value.heading,
                description: this.articleForm.value.description,
                html: this.articleForm.value.html
              }
            }
          ]
        : this.sections;
      const newPageData: Page = {
        ...this.page,
        ...this.pageMetaForm.value,
        components
      };
      this.store.dispatch(
        new SavePage(login, siteId, this.page.id, newPageData)
      );
    }
  }

  private orderSections(sections) {
    for (let i = 0; i < sections.length; i++) {
      sections[i].position = i + 1;
    }
    this.sections = sections;
    this.save();
  }
}
