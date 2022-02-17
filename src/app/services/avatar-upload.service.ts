import { Injectable } from '@angular/core';
import {getDownloadURL, ref, Storage, uploadBytes} from "@angular/fire/storage";
import {from, Observable, switchMap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AvatarUploadService {

  constructor(private storage: Storage) { }

  uploudAvatar(avatar: File, path: string): Observable<string> {
    const storageRef = ref(this.storage, path);
    const uploud = from(uploadBytes(storageRef, avatar));
    return uploud.pipe(
      switchMap((result) => getDownloadURL(result.ref))
    );
  }
}
