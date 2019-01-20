import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { ContentComponent } from "./content.component";
import { GithubUser } from "../../../../../../shared";
import { githubUserMock } from "../../../shared/mocks/githubUser.mock";
import { of } from "rxjs";
import {
  MAT_DIALOG_DATA, MatDialogModule,
  MatDialogRef,
  MatTableModule
} from "@angular/material";
import { AngularFireAuth } from "angularfire2/auth";
import { ActivatedRoute } from "@angular/router";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { NgxsModule } from "@ngxs/store";
import { LoginState } from "../../../login/store/login.state";
import { HttpClientModule } from "@angular/common/http";
import { RouterTestingModule } from "@angular/router/testing";

describe("ContentComponent", () => {
  let component: ContentComponent;
  let fixture: ComponentFixture<ContentComponent>;

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
      declarations: [ContentComponent],
      imports: [
        MatTableModule,
        MatDialogModule,
        NgxsModule.forRoot([LoginState]),
        HttpClientModule,
        RouterTestingModule
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
        { provide: AngularFireAuth, useValue: mockAngularFireAuth },
        {
          provide: ActivatedRoute,
          useValue: mockActivatedRoute
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
