import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiClientService } from '../../services/api-client.service';
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

  constructor(private apiClient: ApiClientService) {}

  ngOnInit(): void {
    this.fetchPosts(this.currentPage, this.pageSize);
  }

  fetchPosts(page: number = 1, limit: number = 10): void {
    this.loading = true;
    this.error = null;

    this.apiClient
      .getWithResponse<Post[]>(
        `${API_BASE_URL}/posts?_page=${page}&_limit=${limit}`,
        {
          observe: 'response',
        }
      )
      .subscribe({
        next: (response) => {
          if ('body' in response && response.body) {
            this.posts = response.body;
            const totalCount = Number(response.headers.get('x-total-count'));
            this.totalPages = Math.ceil(totalCount / this.pageSize);
          } else {
            this.posts = [];
            this.totalPages = 0;
          }
          this.loading = false;
        },
        error: (err) => {
          this.error = err.message;
          this.loading = false;
        },
      });
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.fetchPosts(this.currentPage, this.pageSize);
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.fetchPosts(this.currentPage, this.pageSize);
    }
  }
}
