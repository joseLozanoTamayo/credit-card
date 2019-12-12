import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { UsersComponent } from './users/users.component';
import { LoginComponent } from './login/login.component';
import { AuthGuardService } from '../core/guardian/AuthGuardService';

const routes: Routes = [
  {
    path: 'home',
    component: HomePageComponent,
    canActivate: [ AuthGuardService ],
  },
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [ AuthGuardService ],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
