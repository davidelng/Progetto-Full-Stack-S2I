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

  private token: string|null = localStorage.getItem('token');

  private userSource: BehaviorSubject<User|null> = new BehaviorSubject<User|null>(null);
  
  user: Observable<User|null> = this.userSource.asObservable();

  private userLogStatusSource: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  userLogStatus: Observable<boolean> = this.userLogStatusSource.asObservable();

  baseUri: string = environment.apiUrl;

  constructor(private http: HttpClient, private resourceService: ResourceService) { }

  // getCSRFCookie() {
  //   return this.http.get(this.baseUri.concat('sanctum/csrf-cookie'), { withCredentials: true });
  // }

  registerUser(credentials: {name: string, email: string, password: string, password_confirmation: string}) {
    return this.http.post<{user: User, token: string}>(this.baseUri.concat('api/register'), credentials).pipe(
      map((res) => { 
        this.token = res.token; 
        localStorage.setItem('token', res.token) 
      })
    );
  }

  logUser(credentials: {email: string, password: string}) {
    return this.http.post<{user: User, token: string}>(this.baseUri.concat('api/login'), credentials).pipe(
      map((res) => { 
        this.token = res.token; 
        localStorage.setItem('token', res.token) 
      })
    );
  }

  getUser(): Observable<User|void> {
    return this.http.get<User>(this.baseUri.concat('api/user'), {headers: {'Authorization': 'Bearer ' + this.token}} ).pipe(
        map((user: User) => { this.userSource.next(user); })
      );
  }

  logout() {
    return this.http.post(this.baseUri.concat('api/logout'), null, {headers: {'Authorization': 'Bearer ' + this.token}} ).pipe(
      map(() => { 
        this.userSource.next(null); 
        this.resourceService.clearPosts(); 
        this.token = null; 
        localStorage.removeItem('token');
        this.userLogStatusSource.next(false);
      })
    );
  }

}
