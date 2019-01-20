import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { LobbyComponent } from "./lobby.component";
import { GithubUser } from "../../../../../../shared";
import { githubUserMock } from "../../../shared/mocks/githubUser.mock";
import { of } from "rxjs";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { NgxsModule } from "@ngxs/store";
import { LoginState } from "../../../login/store/login.state";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { MatDialogModule, MatMenuModule } from "@angular/material";
import { AngularFireAuth } from "angularfire2/auth";

describe("LobbyComponent", () => {
  let component: LobbyComponent;
  let fixture: ComponentFixture<LobbyComponent>;

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

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LobbyComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        NgxsModule.forRoot([LoginState]),
        HttpClientTestingModule,
        RouterTestingModule,
        MatMenuModule,
        MatDialogModule
      ],
      providers: [{ provide: AngularFireAuth, useValue: mockAngularFireAuth }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LobbyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
