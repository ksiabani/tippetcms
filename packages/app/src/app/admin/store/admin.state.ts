import { State, Action, StateContext, Selector, Store } from "@ngxs/store";
import { PagesState } from "./children/pages.state";
import { SinglePageState } from "./children/single-page.state";
import { AdminService } from "../services/admin.service";
import * as actions from "./admin.actions";
import { tap } from "rxjs/operators";
import { MediaState } from "./children/media.state";
import { PageTemplate } from "shared";

export interface AdminStateModel {
  building: boolean;
  initSave: boolean;
  pageTemplates: PageTemplate[];
}

@State<AdminStateModel>({
  name: "admin",
  defaults: { building: false, initSave: false, pageTemplates: [] },
  children: [PagesState, SinglePageState, MediaState]
})
export class AdminState {
  constructor(private adminService: AdminService, private store: Store) {}

  @Selector()
  static building(state: AdminStateModel): boolean {
    return state.building;
  }

  @Selector()
  static initSave(state: AdminStateModel): boolean {
    return state.initSave;
  }

  @Selector()
  static pageTemplates(
    state: AdminStateModel
  ): PageTemplate[] {
    return state.pageTemplates;
  }

  @Action(actions.BuildSite)
  buildSite(
    ctx: StateContext<AdminStateModel>,
    { username, site }: actions.BuildSite
  ) {
    ctx.patchState({ building: true });
    return this.adminService
      .buildSite(username, site)
      .pipe(tap(() => ctx.patchState({ building: false })));
  }

  @Action(actions.InitSave)
  initSave(
    ctx: StateContext<AdminStateModel>,
    { initSave }: actions.InitSave
  ): void {
    ctx.patchState({ initSave: initSave });
  }

  @Action(actions.GetPageTemplates)
  getPageTemplates(
    ctx: StateContext<AdminStateModel>,
    { username, site }: actions.GetPageTemplates
  ) {
    return this.adminService
      .getPageTemplates(username, site)
      .pipe(
        tap((pageTemplates: PageTemplate[]) =>
          ctx.patchState({ pageTemplates: pageTemplates })
        )
      );
  }
}
