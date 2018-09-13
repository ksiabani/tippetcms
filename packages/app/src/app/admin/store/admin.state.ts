import { Selector, State, Action, StateContext } from "@ngxs/store";
import * as actions from "./admin.actions";
import { Page } from "../../shared/model/get-pages.interface";
import { AdminService } from "../services/admin.service";
import { take } from "rxjs/operators";

export interface AdminStateModel {
  pages: Page[];
  path: string[];
  loading: boolean;
}

@State<AdminStateModel>({
  name: "admin",
  defaults: { pages: [], path: [], loading: false }
})
export class AdminState {
  constructor(private adminService: AdminService) {}

  @Selector()
  static pages(state: AdminStateModel): Page[] {
    return state.pages;
  }

  @Selector()
  static path(state: AdminStateModel): string[] {
    return state.path;
  }

  @Selector()
  static loading(state: AdminStateModel): boolean {
    return state.loading;
  }

  @Action(actions.ChangePath)
  changePath(ctx: StateContext<AdminStateModel>, { path }: actions.ChangePath): void {
    ctx.patchState({ path });
  }

  @Action(actions.GetPages)
  setUser(ctx: StateContext<AdminStateModel>, { username, site, path }: actions.GetPages): void {
    ctx.patchState({ loading: true });
    this.adminService
      .getPages(username, site, path)
      .pipe(take(1))
      .subscribe((pages: Page[]) => ctx.patchState({ pages, loading: false }));
  }
}
