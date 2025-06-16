import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiClientService {
  constructor(private http: HttpClient) {}

  get<T>(url: string): Observable<T> {
    return this.http.get<T>(url).pipe(
      catchError((error) => {
        console.error('API request failed', error);
        return throwError(() => new Error('API request failed'));
      })
    );
  }

  post<T>(url: string, body: T): Observable<T> {
    return this.http.post<T>(url, body).pipe(
      catchError((error) => {
        console.error('POST error:', error);
        return throwError(() => new Error('POST request failed'));
      })
    );
  }

  put<T>(url: string, body: T): Observable<T> {
    return this.http.put<T>(url, body).pipe(
      catchError((error) => {
        console.error('PUT error:', error);
        return throwError(() => new Error('PUT request failed'));
      })
    );
  }

  delete(url: string): Observable<void> {
    return this.http.delete<void>(url).pipe(
      catchError((error) => {
        console.error('DELETE error:', error);
        return throwError(() => new Error('DELETE request failed'));
      })
    );
  }
}
