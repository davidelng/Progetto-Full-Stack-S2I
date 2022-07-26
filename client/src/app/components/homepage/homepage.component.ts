import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ResourceService } from 'src/app/services/resource.service';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { Post } from 'src/app/models/post';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  user$: Observable<User>;
  posts$: Observable<any>;

  constructor(private userService: UserService, private resourceService: ResourceService) {
    this.user$ = this.userService.getUser();
    this.posts$ = this.resourceService.showPosts();
   }

  ngOnInit(): void {
  }

}
