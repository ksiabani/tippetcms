import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPageDialogComponent } from './add-page-dialog.component';

describe('AddProjectDialogComponent', () => {
  let component: AddPageDialogComponent;
  let fixture: ComponentFixture<AddPageDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPageDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
