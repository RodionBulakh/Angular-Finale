import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UserProfile } from '@app/interface/user-profile';
import { UsersService } from '@app/services/users.service';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss'],
})
export class FriendsComponent {
  filterQuery: string = '';
  isCollapsed: boolean = true;
  user$ = this.data.currentUserProfile$;
  usersList: UserProfile[] = [];

  totalLength: any;
  page: number = 1;

  constructor(
    private data: UsersService,
    private db: AngularFirestore,
    private toast: HotToastService
  ) { }



  getAllUsers() {
    return this.db.collection('/users').snapshotChanges();
  }

  renderAllUsers(searchQuery: string) {
    this.filterQuery = searchQuery;
    this.getAllUsers().subscribe(
      (res) => {
        this.usersList = res.map((user: any) => {
          return user.payload.doc.data();
        });
        this.totalLength = res.length;
      },
      (err) => {
        console.log('Error');
      }
    );
    this.isCollapsed = false;
  }

  addToFriend(uid: string, newFriend: string, myFriends: any = []) {
    const friendsData = {
      uid: uid,
      friends: [newFriend, ...myFriends],
    };

    this.data
      .updateUser(friendsData)
      .pipe(
        this.toast.observe({
          success: 'Friend added successfully!',
          loading: 'Loading...',
          error: 'Error',
        })
      )
      .subscribe();

  }

  removeFromFriends(uid: string, newFriend: string, myFriends: any = []) {
    const alreadyFriends = [...myFriends].filter((friend) => friend !== newFriend);

    const friendsData = {
      uid: uid,
      friends: [...alreadyFriends],
    };
    this.data
      .updateUser(friendsData)
      .pipe(
        this.toast.observe({
          success: 'Friend removed successfully!',
          loading: 'Loading...',
          error: 'Error',
        })
      )
      .subscribe();
  }
}
