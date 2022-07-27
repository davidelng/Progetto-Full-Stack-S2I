import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form!:FormGroup;
  registerSubscription?: Subscription;

  validation: {error: boolean, message: string} = {error: false, message: ''};

  constructor(
    private formBuilder: FormBuilder, 
    private userService: UserService, 
    private router: Router
    ) { }

  createForm() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      password_confirmation: ['', Validators.required]
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
      this.validation = { error: true, message: 'Invalid data!'};
      return;
    }

    if (this.f['password'].value !== this.f['password_confirmation'].value) {
      this.validation = {error: true, message: 'Passwords do not match!'};
      return;
    }

    this.registerSubscription = this.userService.getCSRFCookie().subscribe(() => {
      this.userService.registerUser(this.form.value).subscribe({
        next: () => {
          this.router.navigate(['']); 
          window.location.reload();
        },
        error: () => {
          this.validation = { error: true, message: 'Email is already taken!'};
        }});
      })
  }

  ngOnDestroy(): void {
    this.registerSubscription?.unsubscribe();
  }

}
