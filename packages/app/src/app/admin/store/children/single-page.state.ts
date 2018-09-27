import { Selector, State, Action, StateContext } from "@ngxs/store";
import * as actions from ".././admin.actions";
import { AdminService } from "../../services/admin.service";
import { tap } from "rxjs/operators";
import { Page } from "shared";

export interface SinglePageStateModel {
  page: Page;
  loading: boolean;
  saving: boolean;
}

@State<SinglePageStateModel>({
  name: "singlePages",
  defaults: { page: null, loading: false, saving: false }
})
export class SinglePageState {
  constructor(private adminService: AdminService) {}

  @Selector()
  static page(state: SinglePageStateModel): any {
    return state.page;
  }

  @Selector()
  static pageComponents(state: SinglePageStateModel): any {
    return state.page && state.page.components;
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
    { username, site, currPath, title, path, template }: actions.CreatePage
  ) {
    ctx.patchState({ saving: true });
    return this.adminService
      .createPage(username, site, title, path, template)
      .pipe(
        tap((page: Page) => {
          ctx.patchState({ page, saving: false });
          ctx.dispatch(new actions.GetPages(username, site, currPath.length ? currPath.join("-") : "0"));
        })
      );
  }
}
