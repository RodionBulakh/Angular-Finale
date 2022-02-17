import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {UsersService} from "@app/services/users.service";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {HotToastService} from "@ngneat/hot-toast";
import {UserProfile} from "@app/interface/user-profile";
import {AvatarUploadService} from "@app/services/avatar-upload.service";
import {concatMap, switchMap} from "rxjs";

@UntilDestroy()
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user$ = this.userService.currentUserProfile$;

  constructor(private toast: HotToastService, private userService: UsersService, private avatarUpload: AvatarUploadService) {
  }

  ngOnInit(): void {
    this.userService.currentUserProfile$.pipe(
      untilDestroyed(this)
    ).subscribe((user) => {
      this.profileForm.patchValue({...user});
    })
  }

  profileForm = new FormGroup({
    uid: new FormControl(''),
    displayName: new FormControl(''),
    email: new FormControl(''),
    age: new FormControl(''),
  });

  uploadFile(event: any, { uid }: UserProfile) {
    this.avatarUpload
      .uploudAvatar(event.target.files[0], `images/profile/${uid}`)
      .pipe(
        this.toast.observe({
          loading: 'Uploading profile image...',
          success: 'Image uploaded successfully',
          error: 'There was an error in uploading the image',
        }),
        concatMap((photoURL) =>
          this.userService.updateUser({
            uid,
            photoURL,
          })
        )
      )
      .subscribe();
  }

  saveProfile() {
    const profileData = this.profileForm.value;
    this.userService
      .updateUser(profileData)
      .pipe(
        this.toast.observe({
          success: 'Profile updated successfully',
          loading: 'Saving profile data...',
          error: 'There was an error in updating the profile',
        })
      )
      .subscribe();
  }
}
