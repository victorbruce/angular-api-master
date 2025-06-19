import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { PostsComponent } from './posts.component';
import { ApiClientService } from '../../services/api-client.service';
import { PostService } from '../../services/post.service';
import { of, throwError } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';

fdescribe('PostsComponent', () => {
  let component: PostsComponent;
  let fixture: ComponentFixture<PostsComponent>;
  let apiClientSpy: jasmine.SpyObj<ApiClientService>;
  let postServiceSpy: jasmine.SpyObj<PostService>;

  const mockPosts = [
    { id: 1, userId: 1, title: 'Test Post 1', body: 'Body 1' },
    { id: 2, userId: 1, title: 'Test Post 2', body: 'Body 2' },
  ];

  beforeEach(async () => {
    apiClientSpy = jasmine.createSpyObj('ApiClientService', [
      'get',
      'clearCache',
    ]);
    postServiceSpy = jasmine.createSpyObj('PostService', [
      'getPosts',
      'setPosts',
    ]);

    (postServiceSpy as any).posts$ = of(mockPosts);

    await TestBed.configureTestingModule({
      imports: [PostsComponent, CommonModule, RouterTestingModule],
      providers: [
        { provide: ApiClientService, useValue: apiClientSpy },
        { provide: PostService, useValue: postServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should subscribe to posts$ and set posts', () => {
    expect(component.posts).toEqual(mockPosts);
  });
});
