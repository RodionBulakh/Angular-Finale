import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {NotFoundComponent} from "./components/pages/not-found/not-found.component";
import {LoginComponent} from "./components/pages/login/login.component";
import {RegisterComponent} from "./components/pages/register/register.component";
import  { canActivate, redirectUnauthorizedTo, redirectLoggedInTo } from "@angular/fire/auth-guard"

const redirectToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedIn = () => redirectLoggedInTo(['user/profile']);

const routes: Routes = [
  {
    path: 'login',
    ...canActivate(redirectLoggedIn),
    component: LoginComponent
  },
  {
    path: 'register',
    ...canActivate(redirectLoggedIn),
    component: RegisterComponent,
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'user',
    ...canActivate(redirectToLogin),
    loadChildren: () => import('./modules/user/user.module').then((m) => m.UserModule),
  },
  {path: '**', component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
