import { Component, Input, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ResourceService } from 'src/app/services/resource.service';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user';
import { Post } from 'src/app/models/post';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  // user$: Observable<User>;
  user?: User|null;
  // posts$: Observable<any>;
  posts: Post[] = [];

  userSubscription?: Subscription;
  postsSubscription?: Subscription;
  resourceSubscription?: Subscription;

  constructor(private userService: UserService, private resourceService: ResourceService) {
    // this.user$ = this.userService.getUser();
    // this.posts$ = this.resourceService.showPosts();
   }

  ngOnInit(): void {
    this.userSubscription = this.userService.user.subscribe((user) => {
      this.user = user;
    })
    this.resourceSubscription = this.resourceService.showPosts().subscribe(() => {
      this.postsSubscription = this.resourceService.posts.subscribe((posts) => {
        this.posts = posts;
      })
    });
  }

  submitted(event: boolean) {
    this.ngOnInit();
  }

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
    this.resourceSubscription?.unsubscribe();
    this.postsSubscription?.unsubscribe();
  }
}
