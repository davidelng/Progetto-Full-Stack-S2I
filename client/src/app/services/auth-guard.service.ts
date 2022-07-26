import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Observable, map, catchError, throwError, of } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router, private userService: UserService) { }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {

    return this.userService.getUser().pipe(
      map(() => { 
          return true;
       }),
      catchError((err) => { 
        this.router.navigate(['/register']);
        return of(err);
      })
    )
  }

}
