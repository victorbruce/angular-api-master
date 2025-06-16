import { Routes } from '@angular/router';
import { PostsComponent } from './pages/posts/posts.component';
import { PostDetailsComponent } from './pages/post-details/post-details.component';

export const routes: Routes = [
  {
    path: '',
    component: PostsComponent,
    title: 'Posts',
    pathMatch: 'full',
  },
  {
    path: 'posts/:id',
    component: PostDetailsComponent,
    title: 'Post Details',
  },
];
