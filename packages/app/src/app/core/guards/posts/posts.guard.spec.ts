import { TestBed, async, inject } from '@angular/core/testing';

import { PostsGuard } from './posts.guard';

describe('PostsGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PostsGuard]
    });
  });

  it('should ...', inject([PostsGuard], (guard: PostsGuard) => {
    expect(guard).toBeTruthy();
  }));
});
