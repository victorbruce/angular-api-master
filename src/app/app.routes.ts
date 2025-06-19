import { Routes } from '@angular/router';
import { PostsComponent } from './pages/posts/posts.component';
import { PostDetailsComponent } from './pages/post-details/post-details.component';
import { NewPostComponent } from './pages/new-post/new-post.component';
import { EditPostComponent } from './pages/edit-post/edit-post.component';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
  {
    path: '',
    component: PostsComponent,
    title: 'Posts',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Login',
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
  {
    path: 'posts/:id/edit',
    component: EditPostComponent,
    title: 'Edit Post',
  },
];
