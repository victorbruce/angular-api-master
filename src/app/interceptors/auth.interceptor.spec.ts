import { TestBed } from '@angular/core/testing';
import { HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { AuthService } from '../services/auth.service';
import { of } from 'rxjs';

fdescribe('AuthInterceptor', () => {
  let interceptor: AuthInterceptor;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('AuthService', ['getToken']);
    TestBed.configureTestingModule({
      providers: [AuthInterceptor, { provide: AuthService, useValue: spy }],
    });
    interceptor = TestBed.inject(AuthInterceptor);
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should add Authorization header if token exists', () => {
    authServiceSpy.getToken.and.returnValue('mock-token');
    const httpRequest = new HttpRequest('GET', '/test');
    const httpHandler: HttpHandler = {
      handle: (req: HttpRequest<any>) => {
        expect(req.headers.get('Authorization')).toBe('Bearer mock-token');
        return of({} as HttpEvent<any>);
      },
    };
    interceptor.intercept(httpRequest, httpHandler).subscribe();
  });

  it('should not add Authorization header if token does not exist', () => {
    authServiceSpy.getToken.and.returnValue(null);
    const httpRequest = new HttpRequest('GET', '/test');
    const httpHandler: HttpHandler = {
      handle: (req: HttpRequest<any>) => {
        expect(req.headers.has('Authorization')).toBeFalse();
        return of({} as HttpEvent<any>);
      },
    };
    interceptor.intercept(httpRequest, httpHandler).subscribe();
  });
});
