import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {
  constructor() {}
  getErrorMessage(error: any): string {
    if (error instanceof HttpErrorResponse) {
      if (!navigator.onLine) {
        return 'No internet connection. Please check your network settings.';
      }
      if (error.status >= 500) {
        return 'A server error occurred. Please try again later.';
      }
      if (error.status === 404) {
        return 'The requested resource was not found.';
      }
      if (error.status === 400) {
        return 'Bad request. Please check your input and try again.';
      }
      return error.error?.message || 'An unexpected error occured';
    }
    return 'An unexpected error occured';
  }
}
