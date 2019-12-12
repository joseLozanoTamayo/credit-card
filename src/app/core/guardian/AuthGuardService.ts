import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/authentication/service/authentication.service';

@Injectable({
    providedIn: 'root',
  })
export class AuthGuardService implements CanActivate {

  access: boolean;

    constructor( private auth: AuthenticationService ) {
    }

    public canActivate(): boolean {
        return this.checkStatementAvailability();
      }

      public canLoad(): boolean {
        return this.checkStatementAvailability();
      }

      public canActivateChild(): boolean {
        return this.canActivate();
      }

      public checkStatementAvailability(): boolean {
        if (this.auth.userData && this.auth.userData.uid) {
          return true;
        }
        return false;
      }

}
