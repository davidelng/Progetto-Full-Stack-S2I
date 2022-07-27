import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  @Input() user!: User;

  @Input() postsCount?: number;

  @Output() showCreatePost: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  createPost() {
    this.showCreatePost.emit(true);
  }

}
