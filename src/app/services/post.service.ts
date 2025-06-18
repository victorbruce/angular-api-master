import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Post } from '../models';

@Injectable({
  providedIn: 'root',
})
export class PostService {
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
}
