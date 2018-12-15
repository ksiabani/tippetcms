import { State, Action, StateContext, Selector, Store } from "@ngxs/store";
import { PagesState } from "./children/pages.state";
import { SinglePageState } from "./children/single-page.state";
import { AdminService } from "../services/admin.service";
import * as actions from "./admin.actions";
import { tap } from "rxjs/operators";
import { MediaState } from "./children/media.state";
import { PageTemplate, xFile } from "shared";
import { GithubService } from "../../login/services/github.service";
import * as shortid from "shortid";

export interface AdminStateModel {
  building: boolean;
  publishing: boolean;
  initSave: boolean;
  pageTemplates: PageTemplate[];
  folders: xFile[];
}

@State<AdminStateModel>({
  name: "admin",
  defaults: {
    building: false,
    publishing: false,
    initSave: false,
    pageTemplates: [],
    folders: []
  },
  children: [PagesState, SinglePageState, MediaState]
})
export class AdminState {
  constructor(
    private adminService: AdminService,
    private githubService: GithubService,
    private store: Store
  ) {}

  @Selector()
  static building(state: AdminStateModel): boolean {
    return state.building;
  }

  @Selector()
  static initSave(state: AdminStateModel): boolean {
    return state.initSave;
  }

  @Selector()
  static pageTemplates(state: AdminStateModel): PageTemplate[] {
    return state.pageTemplates;
  }

  @Selector()
  static folders(state: AdminStateModel): xFile[] {
    return state.folders;
  }

  @Selector()
  static publishing(state: AdminStateModel): boolean {
    return state.publishing;
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

  @Action(actions.PublishSite)
  publishSite(
    ctx: StateContext<AdminStateModel>,
    { username, site }: actions.PublishSite
  ) {
    ctx.patchState({ publishing: true });
    // Does this site has a remote repo already
    return this.adminService
      .getRemoteRepo(username, site)
      .subscribe(async data => {
        try {
          let repo;
          const remote = data.remote;
          // If no remote repo exists we will create one
          if (!remote) {
            // Get user's repos
            const repos = await this.githubService.getRepos();
            // Check if repo with the site name exists
            const repoExists = repos.find(repo => repo.name === site);
            // No repo with the same name exists, we will create one
            if (!repoExists) {
              await this.githubService.createRepo(username, site);
              repo = site;
            }
            // Name exists, we will add a short id
            else {
              const repoName = `${site}-${shortid.generate()}`;
              await this.githubService.createRepo(username, repoName);
              repo = repoName;
            }
          }
          // Publish site to existing or newly created repo
          this.adminService
            .publishSite(username, site, remote || repo)
            // TODO: return something here, maybe success?
            .subscribe(res => {
              console.log(res);
              ctx.patchState({ publishing: false })
            });
        } catch (error) {
          // TODO: Rollback if needed
          console.log(error);
        }
      });
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

  @Action(actions.GetFolders)
  getFolders(
    ctx: StateContext<AdminStateModel>,
    { username, site }: actions.GetFolders
  ) {
    return this.adminService
      .getFolders(username, site)
      .pipe(tap((folders: xFile[]) => ctx.patchState({ folders: folders })));
  }
}
