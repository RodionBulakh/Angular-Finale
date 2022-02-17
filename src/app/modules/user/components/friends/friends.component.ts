import { Component, OnInit } from '@angular/core';
// import {Firestore} from "@angular/fire/firestore";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {UserProfile} from "@app/interface/user-profile";
import {UsersService} from "@app/services/users.service";

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})
export class FriendsComponent implements OnInit {

  InputText=''

  usersList: UserProfile[] = [];

  constructor(private data: UsersService, private db: AngularFirestore) {}

  addText(event: Event) {
    this.InputText = (<HTMLInputElement>event.target).value;
  }

  ngOnInit(): void {
  }

  getAllUsers() {
    return this.db.collection('/users').snapshotChanges();
  }


  renderAllUsers() {
    this.getAllUsers().subscribe(res => {
      this.usersList = res.map((user: any) => {
        const data = user.payload.doc.data();
        data.id = user.payload.doc.id;
        return data;
      })
    }, err => {
        console.log('Error while fetching users')
    })
  }

  // deleteFriend(friend: string) {
  //   return
  // }
  // updateUser(user: UserProfile) {
  //   this.
  // }


}
