import { Selector, State, Action, StateContext } from "@ngxs/store";
import * as actions from "./lobby.actions";
import { LobbyService } from "../services/lobby.service";
import { GetSitesResponse } from "../../shared/model/get-sites.interface";
import { filter } from "rxjs/operators";

export interface LobbyStateModel {
  sites: string[];
}

@State<LobbyStateModel>({
  name: "lobby",
  defaults: { sites: [] }
})
export class LobbyState {
  constructor(private lobbyService: LobbyService) {}

  @Selector()
  static sites(state: LobbyStateModel): string[] {
    return state.sites;
  }

  @Action(actions.GetSites)
  setUser(ctx: StateContext<LobbyStateModel>, { username }: actions.GetSites): void {
    this.lobbyService
      .getSites(username)
      .pipe(filter(({ sites }: GetSitesResponse) => !!sites))
      .subscribe(({ sites }: GetSitesResponse) => ctx.patchState({ sites }));
  }
}
