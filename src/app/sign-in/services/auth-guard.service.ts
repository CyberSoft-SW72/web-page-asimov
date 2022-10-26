import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';
import { SignInService } from './sign-in.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanActivateChild {
  constructor(private auth: SignInService, private router: Router) {}
  canActivate() {
    // console.log(this.auth.isLoggedIn());
    // if (this.auth.isLoggedIn()) {
    //   return true;
    // }
    // console.log('You are not logged in');
    return this.auth.isLoggedIn();
  }

  canActivateChild() {
    console.log(this.auth.isLoggedIn());
      // if (this.auth.isLoggedIn()) {
      //   return true;
      // }
      // console.log('You are not logged in');
      // return false;
      return this.auth.isLoggedIn();
  }
}
