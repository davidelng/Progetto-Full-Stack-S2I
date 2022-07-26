import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Post } from '../models/post';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {

  baseUri: string = environment.apiUrl.concat('api/post/');

  constructor(private http: HttpClient) { }

  showPosts() {
    return this.http.get(this.baseUri, { withCredentials: true });
  }

  showUserPosts(userId: Subscription | number) {
    return this.http.get(this.baseUri.concat(userId.toString()), { withCredentials: true });
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
}
