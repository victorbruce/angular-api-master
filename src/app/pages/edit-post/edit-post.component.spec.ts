import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { EditPostComponent } from './edit-post.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ApiClientService } from '../../services/api-client.service';
import { PostService } from '../../services/post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { CommonModule } from '@angular/common';

fdescribe('EditPostComponent', () => {
  let component: EditPostComponent;
  let fixture: ComponentFixture<EditPostComponent>;
  let apiClientSpy: jasmine.SpyObj<ApiClientService>;
  let postServiceSpy: jasmine.SpyObj<PostService>;
  let routerSpy: jasmine.SpyObj<Router>;

  const mockPost = { id: 1, userId: 1, title: 'Old Title', body: 'Old Body' };
  const updatedPost = {
    id: 1,
    userId: 1,
    title: 'New Title',
    body: 'New Body',
  };

  beforeEach(async () => {
    apiClientSpy = jasmine.createSpyObj('ApiClientService', ['put']);
    postServiceSpy = jasmine.createSpyObj('PostService', [
      'getByPostId',
      'setPosts',
      'getPosts',
    ]);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    postServiceSpy.getByPostId.and.returnValue(mockPost);
    postServiceSpy.getPosts.and.returnValue([mockPost]);

    await TestBed.configureTestingModule({
      imports: [EditPostComponent, ReactiveFormsModule, CommonModule],
      providers: [
        { provide: ApiClientService, useValue: apiClientSpy },
        { provide: PostService, useValue: postServiceSpy },
        { provide: Router, useValue: routerSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: { get: () => '1' } },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EditPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with post data', () => {
    expect(component.postForm.value.title).toBe('Old Title');
    expect(component.postForm.value.body).toBe('Old Body');
    expect(component.postForm.value.userId).toBe(1);
  });

  it('should call ApiClientService.put and navigate on success', fakeAsync(() => {
    apiClientSpy.put.and.returnValue(of(updatedPost));
    component.postForm.setValue({
      title: 'New Title',
      body: 'New Body',
      userId: 1,
    });

    component.submit();
    tick();

    expect(apiClientSpy.put).toHaveBeenCalledWith(
      jasmine.any(String),
      jasmine.objectContaining({
        title: 'New Title',
        body: 'New Body',
        userId: 1,
        id: 1,
      })
    );
    expect(postServiceSpy.setPosts).toHaveBeenCalled();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/']);
    expect(component.loading).toBeFalse();
  }));

  // it('should show error message on failure', fakeAsync(() => {
  //   apiClientSpy.put.and.returnValue(throwError(() => new Error('Failed')));
  //   component.postForm.setValue({
  //     title: 'New Title',
  //     body: 'New Body',
  //     userId: 1,
  //   });

  //   component.submit();
  //   tick();

  //   expect(component.errorMessage).toBe('Failed');
  //   expect(component.loading).toBeFalse();
  // }));
});
