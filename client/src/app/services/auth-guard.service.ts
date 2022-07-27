import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterState, RouterStateSnapshot } from '@angular/router';
import { Observable, map, catchError, throwError, of } from 'rxjs';
import { UserService } from './user.service';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  user?: User|null;

  constructor(private router: Router, private userService: UserService) {
    this.userService.user.subscribe((user) => this.user= user);
   }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {

        // return this.userService.user.pipe(
        //   map((user) => {
        //     if (user) {
        //       return true;
        //     }
        //     return false;
        //   }))

        return this.userService.getUser().pipe(
          map(() => {
            if (state.url === '/login' || state.url === '/register') {
              this.router.navigate(['/']);
              return false;
            }
            return true;
          }),
          catchError(() => {
            if (state.url === '/login' || state.url === '/register') {
              return of(true);
            }
            this.router.navigate(['/register']);
            return of(false);
          }))
  }


}
