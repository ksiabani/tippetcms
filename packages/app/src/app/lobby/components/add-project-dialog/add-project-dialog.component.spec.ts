import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { AddProjectDialogComponent } from "./add-project-dialog.component";
import { GithubUser } from "../../../../../../shared";
import { githubUserMock } from "../../../shared/mocks/githubUser.mock";
import { of } from "rxjs";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { NgxsModule } from "@ngxs/store";
import { LoginState } from "../../../login/store/login.state";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
  MatInputModule,
  MatSelectModule
} from "@angular/material";
import { DragulaService } from "ng2-dragula";
import { AngularFireAuth } from "angularfire2/auth";
import { ActivatedRoute } from "@angular/router";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

describe("AddProjectDialogComponent", () => {
  let component: AddProjectDialogComponent;
  let fixture: ComponentFixture<AddProjectDialogComponent>;

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
      declarations: [AddProjectDialogComponent],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        ReactiveFormsModule,
        NgxsModule.forRoot([LoginState]),
        HttpClientTestingModule,
        RouterTestingModule,
        MatDialogModule,
        MatSelectModule,
        MatInputModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: DragulaService, useValue: { dropModel: () => of({}) } },
        { provide: AngularFireAuth, useValue: mockAngularFireAuth },
        {
          provide: ActivatedRoute,
          useValue: mockActivatedRoute
        },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProjectDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
