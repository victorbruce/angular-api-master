import { TestBed } from '@angular/core/testing';

import { PostService } from './post.service';

fdescribe('PostServiceService', () => {
  let service: PostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
