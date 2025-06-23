import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError, retry, of, tap } from 'rxjs';
import { ErrorHandlerService } from './error-handler.service';
import { CacheEntry } from '../models/cache-entry.mdoel';

@Injectable({
  providedIn: 'root',
})
export class ApiClientService {
  private cache = new Map<string, CacheEntry<any>>();
  private defaultCacheDuration = 5 * 60 * 1000; // 5 minutes

  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandlerService
  ) {}

  get<T>(
    url: string,
    cacheDuration: number = this.defaultCacheDuration
  ): Observable<T> {
    const now = Date.now();
    const cached = this.cache.get(url);

    if (cached && cached.expiry > now) {
      return of(cached.value as T);
    }

    return this.http.get<T>(url).pipe(
      retry(2),
      tap((data) => {
        this.cache.set(url, { value: data, expiry: now + cacheDuration });
      }),
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

  clearCache(url?: string): void {
    if (url) {
      this.cache.delete(url);
    } else {
      this.cache.clear();
    }
  }
}
