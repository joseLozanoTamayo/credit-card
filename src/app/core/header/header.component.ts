import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/shared/authentication/service/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  user: firebase.User;

  constructor(private router: Router,
              private auth: AuthenticationService) {
                auth.loggedObs.subscribe(res => {
                  if (res) {
                    this.user = auth.userData;
                  }
                });
               }

  ngOnInit() {
  }

  logout() {
    this.auth.SignOut();
    this.router.navigate(['login'], { replaceUrl: true });
    this.user = null;
  }

}
