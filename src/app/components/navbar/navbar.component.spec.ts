import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { of, BehaviorSubject } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonModule } from '@angular/common';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let isLoggedInSubject: BehaviorSubject<boolean>;

  beforeEach(async () => {
    isLoggedInSubject = new BehaviorSubject<boolean>(false);
    authServiceSpy = jasmine.createSpyObj(
      'AuthService',
      ['logout', 'isLoggedIn'],
      {
        isLoggedIn$: isLoggedInSubject.asObservable(),
      }
    );
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [
        NavbarComponent,
        CommonModule,
        RouterTestingModule.withRoutes([]), // <-- Fix: provide empty routes
      ],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
