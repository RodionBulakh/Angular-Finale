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
  isClickedForSearch: boolean = true;
  user$ = this.data.currentUserProfile$;
  usersList: UserProfile[] = [];

  constructor(
    private data: UsersService,
    private db: AngularFirestore,
    private toast: HotToastService
  ) {}

  getAllUsers() {
    return this.db.collection('/users').snapshotChanges();
  }

  renderAllUsers(searchQuery: string) {
    this.isClickedForSearch = true;
    this.filterQuery = searchQuery;
    this.getAllUsers().subscribe(
      (res) => {
        this.usersList = res.map((user: any) => {
          return user.payload.doc.data();
        });
      },
      (err) => {
        console.log('Error while fetching users');
      }
    );
  }

  addToFriend(uid: string, myFriends: any = []) {
    this.isClickedForSearch = false;
    const friendsData = {
      uid: uid,
      isFriend: [uid, ...myFriends],
    };

    this.data
      .updateUser(friendsData)
      .pipe(
        this.toast.observe({
          success: 'Friend added successfully',
          loading: 'Loading...',
          error: 'There was an error in updating your friends',
        })
      )
      .subscribe();
  }

  removeFromFriends(uid: string, myFriends: any = []) {
    const alreadyFriends = [...myFriends].filter((friend) => friend !== uid);

    const friendsData = {
      uid: uid,
      isFriend: [...alreadyFriends],
    };
    this.data
      .updateUser(friendsData)
      .pipe(
        this.toast.observe({
          success: 'Game removed successfully',
          loading: 'Loading...',
          error: 'There was an error in updating your library',
        })
      )
      .subscribe();
  }
}
