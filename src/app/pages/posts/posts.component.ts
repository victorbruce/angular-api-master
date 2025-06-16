import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiClientService } from '../../services/api-client.service';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

@Component({
  selector: 'app-posts',
  imports: [CommonModule],
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

    this.apiClient
      .get<Post[]>('https://jsonplaceholder.typicode.com/posts')
      .subscribe({
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
