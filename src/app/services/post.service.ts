import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Post } from '../models';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private authService: AuthService = inject(AuthService);
  private postsSubject = new BehaviorSubject<Post[]>([]);
  posts$ = this.postsSubject.asObservable();

  // call this when fetching from API
  setPosts(posts: Post[]): void {
    this.postsSubject.next(posts);
  }

  addPost(post: Post): void {
    const currentPosts = this.postsSubject.value;
    this.postsSubject.next([post, ...currentPosts]);
  }

  getPosts(): Post[] {
    return this.postsSubject.value;
  }

  getByPostId(postId: number): Post | undefined {
    return this.postsSubject.value.find((post) => post.id === postId);
  }

  deletePost(postId: number): boolean {
    const currentUserId = this.authService.getCurrentUserId?.();
    const post = this.getByPostId(postId);

    if (post && post.userId === currentUserId) {
      const updatedPosts = this.postsSubject.value.filter(p => p.id !== postId);
      this.postsSubject.next(updatedPosts)
      return true;
    }
    return false;
  }
}
