import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProfileComponent} from "./components/profile/profile.component";
import {FriendsComponent} from "./components/friends/friends.component";
import {LibraryComponent} from "./components/library/library.component";
import {GamesComponent} from "./components/games/games.component";
import {UserviewComponent} from "./components/userview/userview.component";

const routes: Routes = [
  {
    path: '',
    component: UserviewComponent,
    children: [
      {path: 'profile', component: ProfileComponent},
      {path: 'friends', component: FriendsComponent},
      {path: 'games', component: GamesComponent},
      {path: 'library', component: LibraryComponent},
      {path: '', redirectTo: '/user/profile', pathMatch: 'full'},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
