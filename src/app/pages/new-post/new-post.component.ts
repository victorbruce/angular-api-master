import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiClientService } from '../../services/api-client.service';
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

  postForm: FormGroup;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  loading: boolean = false;

  constructor() {
    this.postForm = this.fb.group({
      userId: [1, Validators.required],
      title: ['', Validators.required],
      body: ['', Validators.required],
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
        this.successMessage = 'Post created successfully!';
        this.postForm.reset({ userId: 1, title: '', body: '' });
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to create post. Please try again.';
        this.loading = false;
        console.error('Error creating post:', err);
      },
    });
  }
}
