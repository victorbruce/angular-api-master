import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiClientService } from '../../services/api-client.service';
import { CommonModule } from '@angular/common';
import { Post, Comment } from '../../models/';
import { API_BASE_URL } from '../../shared/constants';
import { LoaderComponent } from '../../components/loader/loader.component';
import { DisplayErrorComponent } from '../../components/display-error/display-error.component';

@Component({
  selector: 'app-post-details',
  imports: [CommonModule, LoaderComponent, DisplayErrorComponent],
  templateUrl: './post-details.component.html',
  styleUrl: './post-details.component.scss',
})
export class PostDetailsComponent implements OnInit {
  private route: ActivatedRoute = inject(ActivatedRoute);
  post: Post | null = null;
  comments: Comment[] = [];
  loading = false;
  error: string | null = null;

  constructor(private apiClient: ApiClientService) {}

  postId: string | null = null;

  ngOnInit(): void {
    this.postId = this.route.snapshot.paramMap.get('id');

    if (this.postId) {
      this.fetchPostAndComments();
    }
  }

  fetchPostAndComments(): void {
    this.loading = true;
    this.error = null;

    this.apiClient.get<Post>(`${API_BASE_URL}/posts/${this.postId}`).subscribe({
      next: (data) => {
        this.post = data;
        this.fetchComments();
      },
      error: (err) => {
        this.error = 'Failed to load post';
        this.loading = false;
      },
    });
  }

  fetchComments(): void {
    this.apiClient
      .get<Comment[]>(`${API_BASE_URL}/posts/${this.postId}/comments`)
      .subscribe({
        next: (data) => {
          this.comments = data;
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Failed to load comments';
          this.loading = false;
        },
      });
  }
}
