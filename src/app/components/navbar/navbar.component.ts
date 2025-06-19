import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  private authService = inject(AuthService);
  router: Router = inject(Router);
  isLoggedIn$: Observable<boolean> = this.authService.isLoggedIn$;

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
