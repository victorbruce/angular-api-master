import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiClientService } from '../../services/api-client.service';
import { PostService } from '../../services/post.service';
import { API_BASE_URL } from '../../shared/constants';
import { RouterModule } from '@angular/router';
import { Post } from '../../models';
import { PostComponent } from '../../components/post/post.component';
import { DisplayErrorComponent } from '../../components/display-error/display-error.component';
import { LoaderComponent } from '../../components/loader/loader.component';

@Component({
  selector: 'app-posts',
  imports: [
    CommonModule,
    RouterModule,
    PostComponent,
    DisplayErrorComponent,
    LoaderComponent,
  ],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss',
})
export class PostsComponent implements OnInit {
  posts: Post[] = [];
  loading = false;
  error: string | null = null;

  constructor(
    private apiClient: ApiClientService,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    this.postService.posts$.subscribe((posts) => {
      this.posts = posts;
    });
    this.fetchPosts();
  }

  fetchPosts(): void {
    if (this.postService.getPosts().length === 0) {
      this.loading = true;
      this.error = null;
      this.apiClient.get<Post[]>(`${API_BASE_URL}/posts`).subscribe({
        next: (data) => {
          this.postService.setPosts(data);
          this.postService.posts$.subscribe((posts) => {
            this.posts = posts;
            this.loading = false;
          });
        },
        error: (err) => {
          this.error = 'Failed to load posts';
          console.error(err);
          this.loading = false;
        },
      });
    }
  }
}
