import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, map, BehaviorSubject, Subscription } from 'rxjs';
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {

  private resourceSource: BehaviorSubject<any> = new BehaviorSubject(null);
  posts: Observable<any> = this.resourceSource.asObservable();

  baseUri: string = environment.apiUrl.concat('api/post/');

  constructor(private http: HttpClient) { }

  showPosts() {
    return this.http.get<Post[]>(this.baseUri, { withCredentials: true }).pipe(
      map((res) => { this.resourceSource.next(res); })
    );
  }

  showUserPosts(userId: Subscription | number) {
    return this.http.get<Post[]>(this.baseUri.concat(userId.toString()), { withCredentials: true }).pipe(
      map((posts) => { 
        posts.filter((post) => { return userId === post.author_id }); 
        this.resourceSource.next(posts); 
      })
    );
  }

  createPost(data: { title: string, content: string }) {
    return this.http.post(this.baseUri, data, { withCredentials: true });
  }

  updatePost(postId: number, data: { title: string, content: string }) {
    return this.http.put(this.baseUri.concat(postId.toString()), data, { withCredentials: true });
  }

  deletePost(postId: number) {
    return this.http.delete(this.baseUri.concat(postId.toString()), { withCredentials: true });
  }

  clearPosts() {
    this.resourceSource.next(null);
  }
}
