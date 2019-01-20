import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { OverviewComponent } from "./overview.component";
import { NO_ERRORS_SCHEMA } from "@angular/core";

describe("OverviewComponent", () => {
  let component: OverviewComponent;
  let fixture: ComponentFixture<OverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OverviewComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
