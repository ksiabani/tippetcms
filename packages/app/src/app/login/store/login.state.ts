import {
  State,
  Selector,
  Action,
  NgxsOnInit,
  Store,
  StateContext
} from "@ngxs/store";
import { GithubService } from "../services/github.service";
import * as actions from "./login.actions";
import { AngularFireAuth } from "angularfire2/auth";
import { Router, ActivatedRoute } from "@angular/router";
import { GithubUser } from "shared";
import { User } from "../../shared/model/user.interface";

export interface LoginStateModel {
  user: User;
  token: string;
}

@State<LoginStateModel>({
  name: "login",
  defaults: { user: null, token: null }
})
export class LoginState implements NgxsOnInit {
  @Selector()
  static token(state: LoginStateModel) {
    return state.token;
  }

  constructor(
    private githubService: GithubService,
    private store: Store,
    private afAuth: AngularFireAuth,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngxsOnInit() {
    this.afAuth.user.subscribe(async (user: firebase.User) => {
      if (user) {
        const { uid } = user.providerData[0];
        const githubUser: GithubUser = await this.githubService.getUserInfo(
          uid
        );
        const repos = await this.githubService.getRepos();
        console.log(repos);
        this.store.dispatch(new actions.SetUser({ ...user, githubUser }));
        if (this.activatedRoute.firstChild.routeConfig.path === "") {
          this.router.navigateByUrl("lobby");
          return;
        }
        return;
      }
      this.store.dispatch(new actions.SetUser(null));
      this.router.navigateByUrl("");
    });
  }

  @Selector()
  static user(state: LoginStateModel): firebase.User {
    return state.user;
  }

  @Action(actions.SetUser)
  setUser(ctx: StateContext<LoginStateModel>, { user }: actions.SetUser): void {
    ctx.patchState({ user });
  }

  @Action(actions.Logout)
  logout(ctx: StateContext<LoginStateModel>): void {
    this.githubService.logout().then(ctx.patchState({ token: null }));
  }

  @Action(actions.Login)
  login(ctx: StateContext<LoginStateModel>) {
    this.githubService
      .login()
      .then(res => {
        const token = (<any>res.credential).accessToken;
        ctx.patchState({ token });
      })
      .catch(error => {
        console.error(error.code, error.message);
      });
  }
}
