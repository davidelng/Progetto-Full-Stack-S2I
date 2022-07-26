import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUri: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getCSRFCookie() {
    return this.http.get(this.baseUri.concat('sanctum/csrf-cookie'), { withCredentials: true });
  }

  logUser(credentials: {name: string, email: string}) {
    return this.http.post(this.baseUri.concat('login'), credentials, { withCredentials: true });
  }

  getUser(): Observable<User> {
    return this.http.get<User>(this.baseUri.concat('api/user'), { withCredentials: true }).pipe(
        map((user: User) => { return user })
      );
  }

  registerUser(credentials: {name: string, email: string, password: string, password_confirmation: string}) {
    return this.http.post(this.baseUri.concat('register'), credentials, { withCredentials: true });
  }

  logout() {
    return this.http.post(this.baseUri.concat('logout'), null, { withCredentials: true });
  }
}
