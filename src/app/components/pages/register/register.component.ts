import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {AuthService} from "../../../services/auth.service";
import {HotToastService} from "@ngneat/hot-toast";
import {Router} from "@angular/router";
import {switchMap} from "rxjs";
import {UsersService} from "@app/services/users.service";

export function passwordsMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if( password && confirmPassword && password !== confirmPassword) {
      return {
        passwordsDontMatch: true
      }
    }

    return null;
  };
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  signUpForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required])
  }, {validators: passwordsMatchValidator()})

  constructor(private auth: AuthService, private toast: HotToastService, private router: Router, private userService: UsersService) { }

  ngOnInit(): void {
  }

  get name() {
    return this.signUpForm.get('name');
  }

  get email() {
    return this.signUpForm.get('email');
  }

  get password() {
    return this.signUpForm.get('password');
  }

  get confirmPassword() {
    return this.signUpForm.get('confirmPassword');
  }

  onSubmit() {
    if(!this.signUpForm.valid) {
      return;
    }

    const {name, email, password} = this.signUpForm.value;
    this.auth.signUp(email, password).pipe(
      switchMap(({user: {uid}}) => this.userService.addUser({ uid, email, displayName: name})),
      this.toast.observe({
        success: 'Congratulations! You are Signed Up!',
        loading: 'Loading...',
        error: ({message}) => `${message}`
      })
    ).subscribe(() => {
      this.router.navigate(['/user/profile'])
    })
  }

}
