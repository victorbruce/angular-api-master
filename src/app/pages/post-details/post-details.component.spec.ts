import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { PostDetailsComponent } from './post-details.component';
import { ActivatedRoute } from '@angular/router';
import { of, throwError } from 'rxjs';
import { PostService } from '../../services/post.service';
import { ApiClientService } from '../../services/api-client.service';
import { CommonModule } from '@angular/common';

fdescribe('PostDetailsComponent', () => {
  let component: PostDetailsComponent;
  let fixture: ComponentFixture<PostDetailsComponent>;
  let postServiceSpy: jasmine.SpyObj<PostService>;
  let apiClientSpy: jasmine.SpyObj<ApiClientService>;

  const mockPost = { id: 1, userId: 1, title: 'Test Post', body: 'Test Body' };
  const mockComments = [
    {
      postId: 1,
      id: 1,
      name: 'Commenter',
      email: 'test@test.com',
      body: 'Nice post!',
    },
  ];

  beforeEach(async () => {
    postServiceSpy = jasmine.createSpyObj('PostService', ['getByPostId']);

    (postServiceSpy as any).posts$ = of([mockPost]);
    apiClientSpy = jasmine.createSpyObj('ApiClientService', ['get']);

    await TestBed.configureTestingModule({
      imports: [PostDetailsComponent, CommonModule],
      providers: [
        { provide: PostService, useValue: postServiceSpy },
        { provide: ApiClientService, useValue: apiClientSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: { get: () => '1' } },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PostDetailsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load post and comments on init', fakeAsync(() => {
    postServiceSpy.getByPostId.and.returnValue(mockPost);
    apiClientSpy.get.and.returnValue(of(mockComments));

    component.ngOnInit();
    tick();
    fixture.detectChanges();

    expect(component.post).toEqual(mockPost);
    expect(component.comments).toEqual(mockComments);
    expect(component.loading).toBeFalse();
    expect(component.error).toBeNull();
  }));

  it('should set error if comments fail to load', fakeAsync(() => {
    postServiceSpy.getByPostId.and.returnValue(mockPost);
    apiClientSpy.get.and.returnValue(
      throwError(() => new Error('Failed to load comments'))
    );

    component.ngOnInit();
    tick();
    fixture.detectChanges();

    expect(component.error).toBe('Failed to load comments');
    expect(component.loading).toBeFalse();
  }));
});
