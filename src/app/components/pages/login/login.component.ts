import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";
import {HotToastService} from "@ngneat/hot-toast";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });
  constructor(
    private auth: AuthService,
    private router: Router,
    private toast: HotToastService,
    ) { }

  ngOnInit(): void {
    if(this.auth.currentUser$) {
      this.router.navigate(['user']);
    }
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSubmit() {
    if (!this.loginForm.valid) {
      return;
    }

    const { email, password } = this.loginForm.value;
    this.auth.login(email, password).pipe(
      this.toast.observe({
        success: 'Logged in successfully',
        loading: 'Loading...',
        error: 'Oops, there was an error'
      })
    ).subscribe(() => {
      this.router.navigate(['/user']);
    });
  }
}
