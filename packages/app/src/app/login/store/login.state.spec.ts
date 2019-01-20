import { async, TestBed } from "@angular/core/testing";
import { NgxsModule, Store } from "@ngxs/store";
import { LoginState } from "./login.state";
import { Login } from "./login.actions";
import { of } from "rxjs";
import { GithubUser } from "../../../../../shared";
import { githubUserMock } from "../../shared/mocks/githubUser.mock";
import { AngularFireAuth } from "angularfire2/auth";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { GithubService } from "../services/github.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";

describe("Login state when called", () => {
  let store: Store;
  let router: Router;
  let location: Location;

  const routerSpy = jasmine.createSpyObj("Router", ["navigateByUrl"]);

  // Mock user
  const mockGitHubUser: GithubUser = githubUserMock();

  // Mock auth service
  const mockAngularFireAuth: any = {
    user: of({
      providerData: [{ uid: "12345", displayName: "Michael Burnham" }]
    })
  };

  // Mock GitHub service
  const mockGitHubService: any = {
    login: () =>
      Promise.resolve({
        user: {
          providerData: [{ uid: "12345", displayName: "Michael Burnham" }]
        },
        credential: {
          accessToken: "12345"
        }
      }),
    getUserInfo: () => Promise.resolve(mockGitHubUser)
  };

  // Mock activated route
  const mockActivatedRoute: any = {
    firstChild: {
      routeConfig: {
        path: ""
      }
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NgxsModule.forRoot([LoginState]),
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        {
          provide: AngularFireAuth,
          useValue: mockAngularFireAuth
        },
        {
          provide: GithubService,
          useValue: mockGitHubService
        },
        {
          provide: ActivatedRoute,
          useValue: mockActivatedRoute
        },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();
    store = TestBed.get(Store);
    router = TestBed.get(Router);
    location = TestBed.get(Location);
  }));

  it("should login user with GitHub account", async(() => {
    store.dispatch(new Login());
    store.selectOnce(state => state.login.user).subscribe(user => {
      expect(user.githubUser).toBe(mockGitHubUser);
    });
  }));

  it("should redirect user to lobby", async(() => {
    // args passed to router.navigateByUrl() spy
    const spy = router.navigateByUrl as jasmine.Spy;
    const navArgs = spy.calls.first().args[0];

    store.dispatch(new Login());
    store.selectOnce(state => state.login.user).subscribe(() => {
      expect(navArgs).toBe("lobby");
    });
  }));
});
