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

  currentPage = 1;
  pageSize = 10;
  totalPages = 0;
  pagedPosts: Post[] = [];

  constructor(
    private apiClient: ApiClientService,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    this.postService.posts$.subscribe((posts) => {
      this.posts = posts;
      this.currentPage = 1;
      this.updatePagedPosts();
    });
    this.fetchPosts();
  }

  fetchPosts(): void {
    if (this.postService.getPosts()?.length === 0) {
      this.loading = true;
      this.error = null;

      // clear the cache for posts before fetching
      this.apiClient.clearCache(`${API_BASE_URL}/posts`);

      this.apiClient.get<Post[]>(`${API_BASE_URL}/posts`).subscribe({
        next: (data) => {
          this.postService.setPosts(data);
          this.loading = false;
        },
        error: (err) => {
          this.error = err.message;
          this.loading = false;
        },
      });
    }
  }

  updatePagedPosts() {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.pagedPosts = this.posts.slice(start, end);
    this.totalPages = Math.ceil(this.posts.length / this.pageSize);
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagedPosts();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagedPosts();
    }
  }
}