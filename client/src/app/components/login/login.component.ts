import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
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
  }

  get f() {
    return this.form.controls;
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    this.loginSubscription = this.userService.getCSRFCookie().subscribe(() => {
      this.userService.logUser(this.form.value).subscribe(() => {
        this.userService.getUser().subscribe(() => {
          this.router.navigate(['/']); 
          // window.location.reload();
        })
        });
      })
  }

  ngOnDestroy(): void {
    this.loginSubscription?.unsubscribe();
  }
  
}
