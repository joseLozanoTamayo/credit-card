import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  userData: firebase.User;
  logged = new Subject<boolean>();
  loggedObs = this.logged.asObservable();

  constructor(private angularFireAuth: AngularFireAuth) {
  }


  /* Sign up */
  SignUp(email: string, password: string) {


    this.angularFireAuth
      .auth
      .createUserWithEmailAndPassword(email, password)
      .then(res => {
        // console.log('Successfully signed up!', res);
      })
      .catch(error => {
        // console.log('Something is wrong:', error.message);
      });
  }

  /* Sign in */
  SignIn(email: string, password: string) {

    // console.log(email, password);

    return this.angularFireAuth
      .auth
      .signInWithEmailAndPassword(email, password).then(async (res: firebase.auth.UserCredential) => {
        this.userData = res.user;
        this.logged.next( this.userData.uid ? true : false);
        // console.log('Successfully signed in!', res);
      })
      .catch(err => {
        // console.log('Something is wrong:', err.message);
        alert('Invalid credentials');
      });
  }

  /* Sign out */
  SignOut() {
    this.angularFireAuth
      .auth
      .signOut();
  }

}
