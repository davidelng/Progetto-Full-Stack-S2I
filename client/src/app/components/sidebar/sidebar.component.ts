import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  @Input() user!: User;

  @Input() postsCount?: number;

  createPost: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
