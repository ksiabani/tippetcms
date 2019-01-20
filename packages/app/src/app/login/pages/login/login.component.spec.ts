import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { LoginComponent } from "./login.component";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { NgxsModule } from "@ngxs/store";
import { LoginState } from "../../store/login.state";
import { AngularFireAuth } from "angularfire2/auth";
import { of } from "rxjs";
import { GithubUser } from "../../../../../../shared";
import { githubUserMock } from "../../../shared/mocks/githubUser.mock";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";

describe("LoginComponent", () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

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
      declarations: [LoginComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        NgxsModule.forRoot([LoginState]),
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [{ provide: AngularFireAuth, useValue: mockAngularFireAuth }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
