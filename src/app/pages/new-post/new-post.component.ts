import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ApiClientService } from '../../services/api-client.service';
import { PostService } from '../../services/post.service';
import { AuthService } from '../../services/auth.service';
import { Post } from '../../models';
import { API_BASE_URL } from '../../shared/constants';
import { DisplayErrorComponent } from '../../components/display-error/display-error.component';

@Component({
  selector: 'app-new-post',
  imports: [CommonModule, DisplayErrorComponent, ReactiveFormsModule],
  templateUrl: './new-post.component.html',
  styleUrl: './new-post.component.scss',
})
export class NewPostComponent {
  private apiClient: ApiClientService = inject(ApiClientService);
  private fb: FormBuilder = inject(FormBuilder);
  private router: Router = inject(Router);
  private postService: PostService = inject(PostService);
  private authService: AuthService = inject(AuthService);

  postForm: FormGroup;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  loading: boolean = false;

  constructor() {
    const userId = this.authService.getCurrentUserId?.() || 1;
    console.log(userId);
    this.postForm = this.fb.group({
      userId: [userId, Validators.required],
      title: ['', [Validators.required, Validators.minLength(5)]],
      body: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  submit(): void {
    if (this.postForm.invalid) {
      this.errorMessage = 'Please fill in all required fields.';
      return;
    }

    this.loading = true;
    this.successMessage = null;
    this.errorMessage = null;

    const newPost: Post = this.postForm.value;

    this.apiClient.post<Post>(API_BASE_URL + '/posts', newPost).subscribe({
      next: (post) => {
        this.postService.addPost(post);

        this.successMessage = 'Post created successfully!';
        this.postForm.reset({ userId: 1, title: '', body: '' });
        this.loading = false;

        // redirect to home (posts list)
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.errorMessage = err.message;
        this.loading = false;
      },
    });
  }
}
