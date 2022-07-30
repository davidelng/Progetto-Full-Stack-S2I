import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, map, BehaviorSubject, Subscription } from 'rxjs';
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {

  private token: string|null = null;

  private resourceSource: BehaviorSubject<any> = new BehaviorSubject(null);
  posts: Observable<any> = this.resourceSource.asObservable();

  baseUri: string = environment.apiUrl.concat('api/post/');

  constructor(private http: HttpClient) { }

  showPosts() {
    this.token = localStorage.getItem('token');
    return this.http.get<Post[]>(this.baseUri, {headers: {'Authorization': 'Bearer ' + this.token}}).pipe(
      map((res) => { this.resourceSource.next(res); })
    );
  }

  showUserPosts(userId: Subscription | number) {
    this.token = localStorage.getItem('token');
    return this.http.get<Post[]>(this.baseUri.concat(userId.toString()), {headers: {'Authorization': 'Bearer ' + this.token}}).pipe(
      map((posts) => { 
        posts.filter((post) => { return userId === post.author_id }); 
        this.resourceSource.next(posts); 
      })
    );
  }

  createPost(data: { title: string, content: string }) {
    return this.http.post(this.baseUri, data, {headers: {'Authorization': 'Bearer ' + this.token}});
  }

  updatePost(postId: number, data: { title: string, content: string }) {
    return this.http.put(this.baseUri.concat(postId.toString()), data, {headers: {'Authorization': 'Bearer ' + this.token}});
  }

  deletePost(postId: number) {
    return this.http.delete(this.baseUri.concat(postId.toString()), {headers: {'Authorization': 'Bearer ' + this.token}});
  }

  clearPosts() {
    this.resourceSource.next(null);
  }
}
