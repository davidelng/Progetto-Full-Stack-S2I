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

  user?: User|null;
  posts: Post[] = [];
  currentPosts: Post[] = [];
  filteredPosts: Post[] = [];

  userSubscription?: Subscription;
  postsSubscription?: Subscription;
  resourceSubscription?: Subscription;

  currentPostCount: number = 0;

  constructor(private userService: UserService, private resourceService: ResourceService) {}

  ngOnInit(): void {
    this.userSubscription = this.userService.user.subscribe((user) => {
      this.user = user;
    })
    this.resourceSubscription = this.resourceService.showPosts().subscribe(() => {
      this.postsSubscription = this.resourceService.posts.subscribe((posts) => {
        this.currentPostCount = 0;
        this.currentPosts = [];
        this.posts = posts;
        this.groupPosts();
        this.filteredPosts = this.currentPosts;
      })
    });
    this.resourceService.queryString.subscribe((query: string) => this.filterPosts(query));
  }

  submitted(event: boolean) {
    this.ngOnInit();
  }

  groupPosts() {
    for (let i = this.currentPostCount; i < (this.currentPostCount + 10); i++) {
      if (this.posts[i]) {
        this.currentPosts.push(this.posts[i]);
      } else {
        break;
      }
    }
    this.currentPostCount = this.currentPostCount + 10;
  }

  filterPosts(value: string) {
    if (value === '') {
      this.currentPosts = this.filteredPosts;
    } else {
      let regex = new RegExp(value, 'gi');
      this.currentPosts = this.posts.filter((post) => { return post.title.match(regex)} );
    }
  }

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
    this.resourceSubscription?.unsubscribe();
    this.postsSubscription?.unsubscribe();
  }
}
