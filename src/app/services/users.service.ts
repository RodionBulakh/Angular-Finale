import { Injectable } from '@angular/core';
import {doc, docData, Firestore, setDoc, updateDoc} from "@angular/fire/firestore";
import {UserProfile} from "@app/interface/user-profile";
import {from, Observable, of, switchMap} from "rxjs";
import {AuthService} from "@app/services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  get currentUserProfile$(): Observable<UserProfile | null> {
    return this.auth.currentUser$.pipe(
      switchMap(user => {
        if(!user?.uid) {
          return of(null);
        }

        const ref = doc(this.firestore, 'users', user?.uid);
        return docData(ref) as Observable<UserProfile>;
      })
    )
  }

  constructor(private firestore: Firestore, private auth: AuthService) { }


  addUser(user: UserProfile) : Observable<any> {
    const ref = doc(this.firestore, 'users', user?.uid);
    return from(setDoc(ref, user));
  }

  updateUser(user: UserProfile) : Observable<any> {
    const ref = doc(this.firestore, 'users', user?.uid);
    return from(updateDoc(ref, {...user}));
  }

  // getUser(user: UserProfile) : Observable<any> {
  //   const ref = doc(this.firestore, 'users', user?.uid);
  //   return from(setDoc(ref, {...user}));
  // }

}
