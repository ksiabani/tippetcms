import { Selector, State, Action, StateContext } from "@ngxs/store";
import * as actions from ".././admin.actions";
import { AdminService } from "../../services/admin.service";
import { tap } from "rxjs/operators";

export interface MediaStateModel {
  media: string[];
  loading: boolean;
}

@State<MediaStateModel>({
  name: "media",
  defaults: { media: [], loading: false }
})
export class MediaState {
  constructor(private adminService: AdminService) {}

  @Selector()
  static media(state: MediaStateModel): any {
    return state.media;
  }

  @Selector()
  static loading(state: MediaStateModel): boolean {
    return state.loading;
  }

  @Action(actions.GetMedia)
  getPage(ctx: StateContext<MediaStateModel>, { username, site }: actions.GetMedia) {
    ctx.patchState({ loading: true });
    return this.adminService
      .getMedia(username, site)
      .pipe(tap((media: string[]) => ctx.patchState({ media, loading: false })));
  }

  @Action(actions.RemoveMedia)
  removePage(
    ctx: StateContext<MediaStateModel>,
    { username, site, mediaName }: actions.RemoveMedia
  ) {
    ctx.patchState({ loading: true });
    return this.adminService.removeMedia(username, site, mediaName).pipe(
      tap((result: { success: boolean; reason?: any }) => {
        if (!result.success) return ctx.patchState({ loading: false });
        ctx.patchState({
          media: ctx.getState().media.filter(m => m !== mediaName),
          loading: false
        });
      })
    );
  }
}
