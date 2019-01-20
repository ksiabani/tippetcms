import { TestBed, inject } from "@angular/core/testing";
import { GithubService } from "./github.service";
import { AngularFireAuth } from "angularfire2/auth";
import { GithubUser } from "../../../../../shared";
import { githubUserMock } from "../../shared/mocks/githubUser.mock";
import { of } from "rxjs";
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe("GithubService", () => {
  // Mock user
  const authState: GithubUser = githubUserMock();

  // Mock auth service
  const mockAngularFireAuth: any = {
    auth: jasmine.createSpyObj("auth", {
      signInAnonymously: Promise.reject({
        code: "auth/operation-not-allowed"
      })
      // 'signInWithPopup': Promise.reject(),
      // 'signOut': Promise.reject()
    }),
    authState: of(authState)
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        GithubService,
        { provide: AngularFireAuth, useValue: mockAngularFireAuth }
      ]
    });
  });

  it("should be created", inject([GithubService], (service: GithubService) => {
    expect(service).toBeTruthy();
  }));
});
