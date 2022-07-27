import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  // user$: Observable<User>;
  loginSubScription?: Subscription;
  logoutSubscription?: Subscription;

  user?: User|null;

  darkMode: boolean = false;

  @ViewChild('mobileMenu') mobileMenu!: ElementRef;

  constructor( private userService: UserService, private router: Router) { 
    // this.user$ = this.userService.getUser();
  }

  ngOnInit(): void {
    this.checkDarkMode();
    this.loginSubScription = this.userService.user.subscribe((user) => {
      this.user = user;
    });
  }

  logout(): void {
    this.loginSubScription = this.userService.logout().subscribe(() => {
      this.router.navigate(['/login']);
    });
  }

  // filterSearch(value: string) {
  //   console.log(value);
  // }

  toggleMobileMenu(): void {
    this.mobileMenu.nativeElement.classList.toggle('custom-hidden');
  }

  checkDarkMode(): void {
    if (localStorage['darkmode'] === 'enabled' || (!('darkmode' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
      this.darkMode = !this.darkMode;
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  toggleDarkMode(): void {
    document.documentElement.classList.toggle('dark');
    this.darkMode = !this.darkMode;
    if (localStorage['darkmode'] === 'enabled') {
      localStorage.removeItem('darkmode');
    } else {
      localStorage.setItem('darkmode', 'enabled');
    }
  }

  ngOnDestroy(): void {
    this.loginSubScription?.unsubscribe();
    this.logoutSubscription?.unsubscribe();
  }
}
