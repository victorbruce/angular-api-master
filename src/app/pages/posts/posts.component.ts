import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiClientService } from '../../services/api-client.service';
import { API_BASE_URL } from '../../shared/constants';
import { RouterModule } from '@angular/router';
import { Post } from '../../models';

@Component({
  selector: 'app-posts',
  imports: [CommonModule, RouterModule],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss',
})
export class PostsComponent implements OnInit {
  posts: Post[] = [];
  loading = false;
  error: string | null = null;

  constructor(private apiClient: ApiClientService) {}

  ngOnInit(): void {
    this.fetchPosts();
  }

  fetchPosts(): void {
    this.loading = true;
    this.error = null;

    this.apiClient.get<Post[]>(`${API_BASE_URL}/posts`).subscribe({
      next: (data) => {
        this.posts = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load posts';
        console.error(err);
        this.loading = false;
      },
    });
  }
}
