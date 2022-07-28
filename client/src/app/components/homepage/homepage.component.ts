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

  filteredPosts: Post[] = [];

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
        this.filteredPosts = posts;
      })
    });
  }

  submitted(event: boolean) {
    this.ngOnInit();
  }

  filterPosts(value: string) {
    if (value === '') {
      this.filteredPosts = this.posts;
    } else {
      let regex = new RegExp(value, 'gi');
      console.log(regex);
      this.filteredPosts = this.posts.filter((post) => { return post.title.match(regex)} );
    }
  }

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
    this.resourceSubscription?.unsubscribe();
    this.postsSubscription?.unsubscribe();
  }
}
