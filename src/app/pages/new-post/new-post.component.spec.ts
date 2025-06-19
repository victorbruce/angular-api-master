import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ApiClientService } from '../../services/api-client.service';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { NewPostComponent } from './new-post.component';

fdescribe('NewPostComponent', () => {
  let component: NewPostComponent;
  let fixture: ComponentFixture<NewPostComponent>;
  let apiClientServiceSpy: jasmine.SpyObj<ApiClientService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    apiClientServiceSpy = jasmine.createSpyObj('ApiClientService', ['post']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [NewPostComponent, ReactiveFormsModule, CommonModule],
      providers: [
        { provide: ApiClientService, useValue: apiClientServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NewPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not submit if form is invalid', () => {
    component.postForm.setValue({ userId: '', title: '', body: '' });
    component.submit();
    expect(apiClientServiceSpy.post).not.toHaveBeenCalled();
    expect(component.errorMessage).toBe('Please fill in all required fields.');
  });

  it('should call ApiClientService.post and navigate on success', fakeAsync(() => {
    const mockPost = { id: 1, userId: 1, title: 'Test', body: 'Body' };
    apiClientServiceSpy.post.and.returnValue(of(mockPost));
    component.postForm.setValue({ userId: 1, title: 'Test', body: 'Body' });

    component.submit();
    tick();

    expect(apiClientServiceSpy.post).toHaveBeenCalled();
    expect(component.successMessage).toBe('Post created successfully!');
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/']);
  }));

  it('should show error message on failure', fakeAsync(() => {
    apiClientServiceSpy.post.and.returnValue(
      throwError(() => new Error('Failed'))
    );
    component.postForm.setValue({ userId: 1, title: 'Test', body: 'Body' });

    component.submit();
    tick();

    expect(component.errorMessage).toBe(
      'Failed'
    );
    expect(component.loading).toBeFalse();
  }));
});
