import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { ResourceService } from 'src/app/services/resource.service';
import { User } from 'src/app/models/user';
import { Post } from 'src/app/models/post';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user?: User|null;
  posts: Post[] = [];

  postsCount?: number;

  createPost: boolean = false;

  profileSubscription?: Subscription;

  constructor(private userService: UserService, private resourceService: ResourceService) { }

  ngOnInit(): void {
    this.profileSubscription = this.userService.user
    .subscribe((user) => {
      this.user = user;
      this.resourceService.showUserPosts(this.user!.id).subscribe(() => {
        this.resourceService.posts.subscribe((posts) => {
          this.posts = posts;
          this.postsCount = this.posts.length;
        })
      });
    })
  }

  submitted(event: boolean) {
    this.ngOnInit();
  }

  ngOnDestroy(): void {
    this.profileSubscription?.unsubscribe();
  }

}
