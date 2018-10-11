import { Selector, State, Action, StateContext } from "@ngxs/store";
import * as actions from ".././admin.actions";
import { AdminService } from "../../services/admin.service";
import { tap } from "rxjs/operators";
import { xFile } from "shared";

export interface PagesStateModel {
  pages: xFile[];
  path: string[];
  loading: boolean;
}

@State<PagesStateModel>({
  name: "allPages",
  defaults: {pages: [], path: [], loading: false}
})
export class PagesState {
  constructor(private adminService: AdminService) {
  }

  @Selector()
  static pages(state: PagesStateModel): xFile[] {
    return state.pages;
  }

  @Selector()
  static path(state: PagesStateModel): string[] {
    return state.path;
  }

  @Selector()
  static loading(state: PagesStateModel): boolean {
    return state.loading;
  }

  @Action(actions.ChangePath)
  changePath(ctx: StateContext<PagesStateModel>, {path}: actions.ChangePath): void {
    ctx.patchState({path});
  }

  @Action(actions.GetPages)
  getPages(ctx: StateContext<PagesStateModel>, {username, site, path}: actions.GetPages) {
    ctx.patchState({loading: true});
    return this.adminService
      .getPages(username, site, path)
      .pipe(tap((pages: xFile[]) => ctx.patchState({pages, loading: false})));
  }
}
