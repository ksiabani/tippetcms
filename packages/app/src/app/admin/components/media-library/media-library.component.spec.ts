import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { MediaLibraryComponent } from "./media-library.component";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { MatMenuModule } from "@angular/material";
import { NgxsModule } from "@ngxs/store";
import { LoginState } from "../../../login/store/login.state";
import { AngularFireAuth } from "angularfire2/auth";
import { GithubUser } from "../../../../../../shared";
import { githubUserMock } from "../../../shared/mocks/githubUser.mock";
import { of } from "rxjs";
import { HttpClientModule } from "@angular/common/http";
import { RouterTestingModule } from "@angular/router/testing";
import { ActivatedRoute } from "@angular/router";

describe("MediaLibraryComponent", () => {
  let component: MediaLibraryComponent;
  let fixture: ComponentFixture<MediaLibraryComponent>;

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

  // Mock activated route
  const mockActivatedRoute: any = {
    root: {
      snapshot: {
        children: [
          {
            params: [{ id: 1 }]
          }
        ]
      }
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MediaLibraryComponent],
      imports: [
        MatMenuModule,
        NgxsModule.forRoot([LoginState]),
        HttpClientModule,
        RouterTestingModule
      ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: AngularFireAuth, useValue: mockAngularFireAuth },
        {
          provide: ActivatedRoute,
          useValue: mockActivatedRoute
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
