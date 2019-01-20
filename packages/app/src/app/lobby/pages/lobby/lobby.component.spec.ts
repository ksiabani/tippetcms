import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { LobbyComponent } from "./lobby.component";
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

  // Mock auth service
  const mockAngularFireAuth: any = {
    user: of({
      providerData: [{ uid: "12345", displayName: "Michael Burnham" }]
    })
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
    Object.defineProperty(component, "sites", { writable: true });
    component.sites = of(["Leicester", "London"]);
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should list all my sites", () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelectorAll(".lobby__projects__project").length).toBe(
      3
    );
  });
});
