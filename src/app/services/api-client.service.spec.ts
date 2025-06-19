import { TestBed } from '@angular/core/testing';

import { ApiClientService } from './api-client.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ErrorHandlerService } from './error-handler.service';

fdescribe('ApiClientService', () => {
  let service: ApiClientService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ErrorHandlerService],
    });
    service = TestBed.inject(ApiClientService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should perform a GET request and return data', () => {
    const mockData = [{ id: 1, title: 'Test Post' }];
    service
      .get<any[]>('https://jsonplaceholder.typicode.com/posts')
      .subscribe((data) => {
        expect(data).toEqual(mockData);
      });

    const req = httpMock.expectOne(
      'https://jsonplaceholder.typicode.com/posts'
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('should perform a POST request and return data', () => {
    const postData = { title: 'New Post' };
    const mockResponse = { id: 1, title: 'New Post' };

    service
      .post<any>('https://jsonplaceholder.typicode.com/posts', postData)
      .subscribe((data) => {
        expect(data).toEqual(mockResponse);
      });

    const req = httpMock.expectOne(
      'https://jsonplaceholder.typicode.com/posts'
    );
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(postData);
    req.flush(mockResponse);
  });

  it('should perform a PUT request and return data', () => {
    const putData = { id: 1, title: 'Updated Post' };
    const mockResponse = { id: 1, title: 'Updated Post' };

    service
      .put<any>('https://jsonplaceholder.typicode.com/posts/1', putData)
      .subscribe((data) => {
        expect(data).toEqual(mockResponse);
      });

    const req = httpMock.expectOne(
      'https://jsonplaceholder.typicode.com/posts/1'
    );
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(putData);
    req.flush(mockResponse);
  });

  it('should perform a DELETE request', () => {
    service
      .delete('https://jsonplaceholder.typicode.com/posts/1')
      .subscribe((response) => {
        expect(response).toBeNull();
      });

    const req = httpMock.expectOne(
      'https://jsonplaceholder.typicode.com/posts/1'
    );
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});
