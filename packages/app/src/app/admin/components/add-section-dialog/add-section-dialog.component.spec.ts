import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { AddSectionDialogComponent } from "./add-section-dialog.component";
import { ReactiveFormsModule } from "@angular/forms";
import { MatAutocompleteModule, MatDialogModule } from "@angular/material";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { NgxsModule } from "@ngxs/store";
import { LoginState } from "../../../login/store/login.state";
import { AngularFireAuth } from "angularfire2/auth";
import { GithubUser } from "shared";
import { of } from "rxjs";
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientModule } from "@angular/common/http";
import { ActivatedRoute } from "@angular/router";
import { githubUserMock } from "../../../shared/mocks/githubUser.mock";

describe("AddSectionDialogComponent", () => {
  let component: AddSectionDialogComponent;
  let fixture: ComponentFixture<AddSectionDialogComponent>;

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
      declarations: [AddSectionDialogComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
        { provide: AngularFireAuth, useValue: mockAngularFireAuth },
        {
          provide: ActivatedRoute,
          useValue: mockActivatedRoute
        }
      ],
      imports: [
        ReactiveFormsModule,
        MatAutocompleteModule,
        MatDialogModule,
        NgxsModule.forRoot([LoginState]),
        HttpClientModule,
        RouterTestingModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSectionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
