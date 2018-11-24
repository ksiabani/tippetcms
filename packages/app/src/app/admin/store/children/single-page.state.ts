import { Selector, State, Action, StateContext, Store } from "@ngxs/store";
import * as actions from ".././admin.actions";
import { AdminService } from "../../services/admin.service";
import { tap } from "rxjs/operators";
import { Page, Section } from "shared";
import { PagesState } from "./pages.state";

export interface SinglePageStateModel {
  page: Page;
  loading: boolean;
  saving: boolean;
  sectionTemplates: Section[];
}

@State<SinglePageStateModel>({
  name: "singlePages",
  defaults: { page: null, loading: false, saving: false, sectionTemplates: [] }
})
export class SinglePageState {
  constructor(private adminService: AdminService, private store: Store) {}

  @Selector()
  static page(state: SinglePageStateModel): any {
    return state.page;
  }

  @Selector()
  static pageComponents(state: SinglePageStateModel): any {
    return state.page && state.page.components;
  }

  @Selector()
  static sectionTemplates(state: SinglePageStateModel): any {
    return state.sectionTemplates;
  }

  @Selector()
  static loading(state: SinglePageStateModel): boolean {
    return state.loading;
  }

  @Selector()
  static saving(state: SinglePageStateModel): boolean {
    return state.saving;
  }

  @Action(actions.GetSinglePage)
  getPage(
    ctx: StateContext<SinglePageStateModel>,
    { username, site, id }: actions.GetSinglePage
  ) {
    ctx.patchState({ loading: true });
    return this.adminService
      .getSinglePage(username, site, id)
      .pipe(tap((page: any) => ctx.patchState({ page, loading: false })));
  }

  @Action(actions.SavePage)
  savePage(
    ctx: StateContext<SinglePageStateModel>,
    { username, site, id, page }: actions.SavePage
  ) {
    ctx.patchState({ saving: true });
    return this.adminService.savePage(username, site, id, page).pipe(
      tap((page: Page) => {
        ctx.patchState({ page, saving: false });
        ctx.dispatch(new actions.InitSave(false));
      })
    );
  }

  @Action(actions.CreatePage)
  createPage(
    ctx: StateContext<SinglePageStateModel>,
    { username, site, title, path, template, isIndex }: actions.CreatePage
  ) {
    ctx.patchState({ saving: true });
    const currPath = this.store.selectSnapshot(PagesState.path);
    return this.adminService
      .createPage(username, site, title, path, template, isIndex)
      .pipe(
        tap((page: Page) => {
          ctx.patchState({ page, saving: false });
          ctx.dispatch(new actions.GetPages(username, site, currPath.length ? currPath.join("-") : "0"));
        })
      );
  }

  @Action(actions.CreateSection)
  createSection(
    ctx: StateContext<SinglePageStateModel>,
    { username, site, pageId, title, description, template }: actions.CreateSection
  ) {
    ctx.patchState({ saving: true });
    return this.adminService
      .createSection(username, site, pageId, title, description, template)
      .pipe(
        tap((page: Page) => {
          ctx.patchState({ page, saving: false });
          ctx.dispatch(new actions.GetSinglePage(username, site, page.id));
        })
      );
  }

  @Action(actions.GetSectionTemplates)
  getSectionTemplates(
    ctx: StateContext<SinglePageStateModel>,
    { username, site, pageId }: actions.GetSectionTemplates
  ) {
    return this.adminService
      .getSectionTemplates(username, site, pageId)
      .pipe(
        tap((sectionTemplates: Section[]) =>
          ctx.patchState({ sectionTemplates: sectionTemplates })
        )
      );
  }
}
