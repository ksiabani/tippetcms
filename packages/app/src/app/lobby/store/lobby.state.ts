import { Selector, State, Action, StateContext, Store } from "@ngxs/store";
import * as actions from "./lobby.actions";
import { LobbyService } from "../services/lobby.service";
import { GetSitesResponse } from "shared";
import { filter, tap } from "rxjs/operators";

export interface LobbyStateModel {
  sites: string[];
  loading: boolean;
}

@State<LobbyStateModel>({
  name: "lobby",
  defaults: { sites: [], loading: false }
})
export class LobbyState {
  constructor(private lobbyService: LobbyService, private store: Store) {}

  @Selector()
  static sites(state: LobbyStateModel): string[] {
    return state.sites;
  }

  @Selector()
  static loading(state: LobbyStateModel): boolean {
    return state.loading;
  }

  @Action(actions.GetSites)
  setUser(ctx: StateContext<LobbyStateModel>, { username }: actions.GetSites) {
    return this.lobbyService.getSites(username).pipe(
      filter(({ sites }: GetSitesResponse) => !!sites),
      tap(({ sites }: GetSitesResponse) => ctx.patchState({ sites }))
    );
  }

  @Action(actions.AddSite)
  addSite(
    ctx: StateContext<LobbyStateModel>,
    { newProjectData }: actions.AddSite
  ) {
    ctx.patchState({ loading: true });
    return this.lobbyService.addSite(newProjectData).pipe(
      tap(res => {
        this.store.dispatch(new actions.GetSites(newProjectData.username));
        ctx.patchState({ loading: false });
      })
    );
  }
}
