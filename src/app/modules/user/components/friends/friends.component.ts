import {Component, OnInit} from '@angular/core';
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

  filterQuery: string = '';

  usersList: UserProfile[] = [];

  constructor(private data: UsersService, private db: AngularFirestore) {}

  // getSearchValue(event: Event) {
  //   this.InputText = (<HTMLInputElement>event.target).value;
  // }

  ngOnInit(): void {
  }

  getAllUsers() {
    return this.db.collection('/users').snapshotChanges();
  }


  renderAllUsers(searchQuery: string) {
    this.filterQuery = searchQuery;
    this.getAllUsers().subscribe(res => {
      this.usersList = res.map((user: any) => {
          return user.payload.doc.data();
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
