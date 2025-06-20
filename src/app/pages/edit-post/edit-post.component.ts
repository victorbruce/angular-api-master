import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { PostService } from '../../services/post.service';
import { ApiClientService } from '../../services/api-client.service';
import { Post } from '../../models/';
import { API_BASE_URL } from '../../shared/constants';
import { CommonModule } from '@angular/common';
import { DisplayErrorComponent } from '../../components/display-error/display-error.component';
import { LoaderComponent } from '../../components/loader/loader.component';

@Component({
  selector: 'app-edit-post',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DisplayErrorComponent,
    LoaderComponent,
  ],
  templateUrl: './edit-post.component.html',
  styleUrl: './edit-post.component.scss',
})
export class EditPostComponent implements OnInit {
  private fb: FormBuilder = inject(FormBuilder);
  private postService: PostService = inject(PostService);
  private apiClient: ApiClientService = inject(ApiClientService);
  private route: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);

  postForm!: FormGroup;
  postId!: number;
  loading = false;
  errorMessage: string | null = null;

  ngOnInit(): void {
    this.postId = +this.route.snapshot.paramMap.get('id')!;
    const post = this.postService.getByPostId(this.postId);
    if (post) {
      this.postForm = this.fb.group({
        title: [post.title, [Validators.required, Validators.minLength(5)]],
        body: [post.body, [Validators.required, Validators.minLength(10)]],
        userId: [post?.userId || 1, Validators.required],
      });
    }
  }

  submit(): void {
    if (this.postForm.invalid) {
      this.errorMessage = 'Please fill in all required fields.';
      return;
    }

    this.loading = true;
    const updatedPost = {
      id: this.postId,
      ...this.postForm.value,
    };

    if (this.postId <= 100) {
      this.apiClient
        .put<Post>(`${API_BASE_URL}/posts/${this.postId}`, updatedPost)
        .subscribe({
          next: (post) => {
            this.postService.setPosts(
              this.postService
                .getPosts()
                .map((p) => (p.id === this.postId ? post : p))
            );
            this.loading = false;
            this.router.navigate(['/']);
          },
          error: (err) => {
            this.errorMessage = err.message;
            this.loading = false;
          },
        });
    } else {
      this.postService.setPosts(
        this.postService
          .getPosts()
          .map((p) => (p.id === this.postId ? updatedPost : p))
      );
      this.loading = false;
      this.router.navigate(['/']);
    }
  }
}
