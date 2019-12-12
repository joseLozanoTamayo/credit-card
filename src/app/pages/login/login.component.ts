import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../shared/authentication/service/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;
  email: string;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this.authenticationService.logged.subscribe(res => {
      if (res) {
        this.router.navigate(['users']);
      }
    });
  }

  signUp() {
    // console.log('entro a up');
    this.authenticationService.SignUp(this.email, this.password);
    this.email = '';
    this.password = '';
  }

  async signIn() {
    // console.log('entro a In');
    await this.authenticationService.SignIn(this.email, this.password);
    this.email = '';
    this.password = '';
  }

  signOut() {
    this.authenticationService.SignOut();
  }
}
