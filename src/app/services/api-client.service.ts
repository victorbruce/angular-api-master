import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError, retry } from 'rxjs';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root',
})
export class ApiClientService {
  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandlerService
  ) {}

  get<T>(url: string): Observable<T> {
    return this.http.get<T>(url).pipe(
      retry(2),
      catchError((error) => {
        const message = this.errorHandler.getErrorMessage(error);
        return throwError(() => new Error(message));
      })
    );
  }

  post<T>(url: string, body: T): Observable<T> {
    return this.http.post<T>(url, body).pipe(
      retry(2),
      catchError((error) => {
        const message = this.errorHandler.getErrorMessage(error);
        return throwError(() => new Error(message));
      })
    );
  }

  put<T>(url: string, body: T): Observable<T> {
    return this.http.put<T>(url, body).pipe(
      retry(2),
      catchError((error) => {
        const message = this.errorHandler.getErrorMessage(error);
        return throwError(() => new Error(message));
      })
    );
  }

  delete(url: string): Observable<void> {
    return this.http.delete<void>(url).pipe(
      retry(2),
      catchError((error) => {
        const message = this.errorHandler.getErrorMessage(error);
        return throwError(() => new Error(message));
      })
    );
  }
}
