import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { DisplayErrorComponent } from "../../components/display-error/display-error.component";

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, DisplayErrorComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm: FormGroup;
  error: string | null = null;

  private fb: FormBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  constructor() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  submit(): void {
    const { username, password } = this.loginForm.value;
    if (this.authService.login(username, password)) {
      this.router.navigate(['/']);
    } else {
      this.error = 'Invalid username or password';
    }
  }
}
