import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Post } from '../../models';

@Component({
  selector: 'app-post',
  imports: [RouterModule, CommonModule],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
})
export class PostComponent {
  @Input() post!: Post;
}
