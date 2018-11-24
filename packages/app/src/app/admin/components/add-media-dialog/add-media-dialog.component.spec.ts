import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMediaDialogComponent } from './add-media-dialog.component';

describe('AddMediaDialogComponent', () => {
  let component: AddMediaDialogComponent;
  let fixture: ComponentFixture<AddMediaDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMediaDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMediaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
