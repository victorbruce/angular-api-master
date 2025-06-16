import { Routes } from '@angular/router';
import { PostsComponent } from './pages/posts/posts.component';

export const routes: Routes = [
	{
		path: '',
		component: PostsComponent,
		title: 'Posts',
	}
];
