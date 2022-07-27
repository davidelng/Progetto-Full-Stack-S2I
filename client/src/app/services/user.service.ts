import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';
import { Observable, map, BehaviorSubject } from 'rxjs';
import { ResourceService } from './resource.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userSource: BehaviorSubject<User|null> = new BehaviorSubject<User|null>(null);
  user: Observable<User|null> = this.userSource.asObservable();

  baseUri: string = environment.apiUrl;

  constructor(private http: HttpClient, private resourceService: ResourceService) { }

  getCSRFCookie() {
    return this.http.get(this.baseUri.concat('sanctum/csrf-cookie'), { withCredentials: true });
  }

  registerUser(credentials: {name: string, email: string, password: string, password_confirmation: string}) {
    return this.http.post(this.baseUri.concat('register'), credentials, { withCredentials: true });
  }

  logUser(credentials: {name: string, email: string}) {
    return this.http.post(this.baseUri.concat('login'), credentials, { withCredentials: true });
  }

  // getUser(): Observable<User> {
  //   return this.http.get<User>(this.baseUri.concat('api/user'), { withCredentials: true }).pipe(
  //       map((user: User) => { return user; })
  //     );
  // }

  getUser(): Observable<User|void> {
    return this.http.get<User>(this.baseUri.concat('api/user'), { withCredentials: true }).pipe(
        map((user: User) => { this.userSource.next(user); })
      );
  }

  logout() {
    return this.http.post(this.baseUri.concat('logout'), null, { withCredentials: true }).pipe(
      map(() => { this.userSource.next(null); this.resourceService.clearPosts(); })
    );
  }

}
