import { Routes } from '@angular/router';
import { PostsComponent } from './pages/posts/posts.component';
import { PostDetailsComponent } from './pages/post-details/post-details.component';
import { NewPostComponent } from './pages/new-post/new-post.component';

export const routes: Routes = [
  {
    path: '',
    component: PostsComponent,
    title: 'Posts',
    pathMatch: 'full',
  },
  {
    path: 'posts/new',
    component: NewPostComponent,
    title: 'New Post',
  },
  {
    path: 'posts/:id',
    component: PostDetailsComponent,
    title: 'Post Details',
  },
];
