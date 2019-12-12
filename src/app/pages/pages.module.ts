import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { HomePageModule } from './home-page/home-page.module';
import { UsersModule } from './users/users.module';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    HomePageModule,
    UsersModule,
    FormsModule,
    MatProgressSpinnerModule
  ]
})
export class PagesModule { }
