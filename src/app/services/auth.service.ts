import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TOKEN_KEY } from '../shared/constants';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.isLoggedIn());
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor() {}

  login(username: string, password: string): boolean {
    if (username && password) {
      localStorage.setItem(TOKEN_KEY, 'mock-token-12345');
      this.isLoggedInSubject.next(true);
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    this.isLoggedInSubject.next(false);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(TOKEN_KEY);
  }

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }
}
