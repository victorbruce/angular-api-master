import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ApiClientService } from '../../services/api-client.service';
import { PostService } from '../../services/post.service';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Post, Comment } from '../../models/';
import { API_BASE_URL } from '../../shared/constants';
import { LoaderComponent } from '../../components/loader/loader.component';
import { DisplayErrorComponent } from '../../components/display-error/display-error.component';

@Component({
  selector: 'app-post-details',
  imports: [CommonModule, RouterModule, LoaderComponent, DisplayErrorComponent],
  templateUrl: './post-details.component.html',
  styleUrl: './post-details.component.scss',
})
export class PostDetailsComponent implements OnInit {
  private route: ActivatedRoute = inject(ActivatedRoute);
  private postService = inject(PostService);
  private authService = inject(AuthService);
  isLoggedIn$ = this.authService.isLoggedIn$;
  
  post: Post | null = null;
  comments: Comment[] = [];
  loading = false;
  error: string | null = null;

  constructor(private apiClient: ApiClientService) {}

  postId: string | null = null;

  ngOnInit(): void {
    this.postId = this.route.snapshot.paramMap.get('id');

    if (this.postId) {
      this.subscribeToPost();
      this.fetchComments();
    }
  }

  subscribeToPost(): void {
    this.postService.posts$.subscribe((posts) => {
      this.post = this.postService.getByPostId(+this.postId!) ?? null;
    });
  }

  fetchComments(): void {
    this.loading = true;
    this.error = null;
    this.apiClient
      .get<Comment[]>(`${API_BASE_URL}/posts/${this.postId}/comments`)
      .subscribe({
        next: (data) => {
          this.comments = data;
          this.loading = false;
        },
        error: (err) => {
          this.error = err.message || 'Failed to load comments';
          this.loading = false;
        },
      });
  }
}
