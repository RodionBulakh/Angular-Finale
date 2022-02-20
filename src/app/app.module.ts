import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './components/general/menu/menu.component';
import { GamesComponent } from './modules/user/components/games/games.component';
import { LibraryComponent } from './modules/user/components/library/library.component';
import { FriendsComponent } from './modules/user/components/friends/friends.component';
import { NotFoundComponent } from './components/pages/not-found/not-found.component';
import { LoginComponent } from './components/pages/login/login.component';
import { RegisterComponent } from './components/pages/register/register.component';
import {ProfileComponent} from "./modules/user/components/profile/profile.component";

import { HttpClientModule } from '@angular/common/http'
import {ReactiveFormsModule} from "@angular/forms";
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import {getStorage, provideStorage} from "@angular/fire/storage";


import { HotToastModule } from '@ngneat/hot-toast';
import { UserviewComponent } from './modules/user/components/userview/userview.component';
import { GameComponent } from './modules/user/components/game/game.component';
import { UsersFilerPipe } from './pipes/users-filer.pipe';
import { GamesFilterPipe } from './pipes/games-filter.pipe';
import { FormsModule } from '@angular/forms';
import { LibraryFilterPipe } from './pipes/library-filter.pipe';

import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    GamesComponent,
    GameComponent,
    LibraryComponent,
    FriendsComponent,
    ProfileComponent,
    NotFoundComponent,
    LoginComponent,
    RegisterComponent,
    UserviewComponent,
    UsersFilerPipe,
    GamesFilterPipe,
    LibraryFilterPipe,
  ],
  imports: [
    NgxPaginationModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    AngularFireModule.initializeApp(environment.firebase),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    HotToastModule.forRoot(),
    FormsModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

}
