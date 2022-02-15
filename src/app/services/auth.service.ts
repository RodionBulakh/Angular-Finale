import {from} from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {Auth, authState, signInWithEmailAndPassword} from "@angular/fire/auth";
// import firebase from "firebase/compat/app";
// import firebase from "firebase/compat/app";
// import 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  currentUser$ = authState(this.auth);

  constructor(private auth: Auth, private router: Router) {}

  // setToken(token: string): void {
  //   localStorage.setItem('token', token);
  // }
  //
  // getToken(): string | null {
  //   return localStorage.getItem('token');
  // }

  login(username: string, password: string) {
    return from(signInWithEmailAndPassword(this.auth, username, password));
  }

  // isLoggedIn() {
  //   return !!firebase.auth().currentUser;
  // }

  logout() {
    this.router.navigate(['login']);
    return from(this.auth.signOut());
  }

  // logout() {
  //   localStorage.removeItem('token');
  //   this.router.navigate(['login']);
  // }

  // login({ email, password }: any): Observable<any> {
  //   if (email === 'test@gmail.com' && password === 'test123') {
  //     this.setToken('abcdefghijklmnopqrstuvwxyz');
  //     return of({ name: 'Rodion Test', email: 'test@gmail.com' });
  //   }
  //   return throwError(new Error('Failed to login'));
  // }
}
