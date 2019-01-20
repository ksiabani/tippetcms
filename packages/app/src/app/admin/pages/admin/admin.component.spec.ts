import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { AdminComponent } from "./admin.component";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { MatMenuModule } from "@angular/material";
import { NgxsModule } from "@ngxs/store";
import { LoginState } from "../../../login/store/login.state";
import { GithubUser } from "../../../../../../shared";
import { githubUserMock } from "../../../shared/mocks/githubUser.mock";
import { of } from "rxjs";
import { AngularFireAuth } from "angularfire2/auth";
import { HttpClientModule } from "@angular/common/http";
import { RouterTestingModule } from "@angular/router/testing";

describe("AdminComponent", () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;

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
      declarations: [AdminComponent],
      imports: [
        MatMenuModule,
        NgxsModule.forRoot([LoginState]),
        HttpClientModule,
        RouterTestingModule
      ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [{ provide: AngularFireAuth, useValue: mockAngularFireAuth }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
