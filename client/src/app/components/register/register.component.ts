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

  constructor(
    private formBuilder: FormBuilder, 
    private userService: UserService, 
    private router: Router
    ) { }

  createForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
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
      return;
    }

    this.registerSubscription = this.userService.getCSRFCookie().subscribe(() => {
      this.userService.registerUser(this.form.value).subscribe(() => {
          this.router.navigate(['']); 
          window.location.reload();
        });
      })
  }

  ngOnDestroy(): void {
    this.registerSubscription?.unsubscribe();
  }

}
