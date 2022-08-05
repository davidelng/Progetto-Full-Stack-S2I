import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { ResourceService } from 'src/app/services/resource.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form!:FormGroup;
  loginSubscription?: Subscription;
  isUserLoggedIn: boolean = true;

  validation: {error: boolean, message: string} = {error: false, message: ''};

  constructor(
    private formBuilder: FormBuilder, 
    private router: Router, 
    private userService: UserService
    ) { }

  createForm() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      })
  }

  ngOnInit(): void {
    this.createForm();
    this.userService.userLogStatus.subscribe((res) => this.isUserLoggedIn = res);
  }

  get f() {
    return this.form.controls;
  }

  submit() {
    if (this.form.invalid) {
      this.validation = { error: true, message: 'Credentials invalid!'};
      return;
    }

      // this.loginSubscription = this.userService.getCSRFCookie().subscribe(() => {
      //   this.userService.logUser(this.form.value).subscribe({
      //     next: () => {
      //     this.userService.getUser().subscribe(() => {
      //       this.validation = { error: false, message: 'Login succesful!'};
      //       this.router.navigate(['/']); 
      //     })
      //     },
      //     error: () => { 
      //       this.validation = { error: true, message: 'Wrong email or password!'};
      //       return;
      //   }});
      //   })

      this.loginSubscription = this.userService.logUser(this.form.value).subscribe({
          next: () => {
          this.userService.getUser().subscribe(() => {
            this.validation = { error: false, message: 'Login succesful!'};
            this.router.navigate(['/']); 
          })
          },
          error: () => { 
            this.validation = { error: true, message: 'Wrong email or password!'};
            return;
        }});
        
  }

  ngOnDestroy(): void {
    this.loginSubscription?.unsubscribe();
  }
  
}
