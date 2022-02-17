import { from } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  Auth,
  authState,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "@angular/fire/auth";

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  currentUser$ = authState(this.auth);

  constructor(private auth: Auth, private router: Router) {}


  login(username: string, password: string) {
    return from(signInWithEmailAndPassword(this.auth, username, password));
  }

  signUp(email: string, password: string,) {
    return from(createUserWithEmailAndPassword(this.auth, email, password));
  }

  logout() {
    this.router.navigate(['login']);
    return from(this.auth.signOut());
  }

}
