import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { PageComponent } from "./page.component";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { SortPipe } from "../../../shared/pipes/sort/sort.pipe";
import { DragulaService } from "ng2-dragula";
import { NgxsModule } from "@ngxs/store";
import { LoginState } from "../../../login/store/login.state";
import { RouterTestingModule } from "@angular/router/testing";
import { AngularFireAuth } from "angularfire2/auth";
import { ActivatedRoute } from "@angular/router";
import { GithubUser } from "../../../../../../shared";
import { githubUserMock } from "../../../shared/mocks/githubUser.mock";
import { of } from "rxjs";
import { MatDialogModule } from "@angular/material";
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe("PageComponent", () => {
  let component: PageComponent;
  let fixture: ComponentFixture<PageComponent>;

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
      declarations: [PageComponent, SortPipe],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        ReactiveFormsModule,
        NgxsModule.forRoot([LoginState]),
        HttpClientTestingModule,
        RouterTestingModule,
        MatDialogModule
      ],
      providers: [
        { provide: DragulaService, useValue: { dropModel: () => of({}) } },
        { provide: AngularFireAuth, useValue: mockAngularFireAuth },
        {
          provide: ActivatedRoute,
          useValue: mockActivatedRoute
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
