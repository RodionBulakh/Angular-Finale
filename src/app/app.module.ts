import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './components/general/menu/menu.component';
import { LoginFormComponent } from './components/general/login-form/login-form.component';
import { GamesComponent } from './components/pages/games/games.component';
import { ProfileComponent } from './components/pages/profile/profile.component';
import { LibraryComponent } from './components/pages/library/library.component';
import { FriendsComponent } from './components/pages/friends/friends.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    LoginFormComponent,
    GamesComponent,
    ProfileComponent,
    LibraryComponent,
    FriendsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
