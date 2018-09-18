import { Selector, State, Action, StateContext } from "@ngxs/store";
import * as actions from ".././admin.actions";
import { AdminService } from "../../services/admin.service";
import { tap } from "rxjs/operators";

export interface SinglePageStateModel {
  page: any;
  loading: boolean;
}

@State<SinglePageStateModel>({
  name: "singlePages",
  defaults: { page: null, loading: false }
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

  @Action(actions.GetSinglePage)
  getPage(ctx: StateContext<SinglePageStateModel>, { username, site, id }: actions.GetSinglePage) {
    ctx.patchState({ loading: true });
    return this.adminService
      .getSinglePage(username, site, id)
      .pipe(tap((page: any) => ctx.patchState({ page, loading: false })));
  }
}
