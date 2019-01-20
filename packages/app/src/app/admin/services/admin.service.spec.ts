import { TestBed, inject } from '@angular/core/testing';
import { AdminService } from './admin.service';
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe('AdminService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminService],
      imports: [HttpClientTestingModule]
    });
  });

  it('should be created', inject([AdminService], (service: AdminService) => {
    expect(service).toBeTruthy();
  }));
});
