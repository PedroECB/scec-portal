import { Injectable } from '@angular/core';
import { UserInfo } from '../models/user-info.model';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class ControllerHelper {

  constructor(private router: Router) { }

  /* AUTH METHODS */

  setUserInfo(userInfo: UserInfo) {
    let userTokenString = userInfo.token != null ? userInfo.token : '';
    localStorage.setItem('userInfo', JSON.stringify(userInfo))
    localStorage.setItem('user_token', userTokenString);
  }

  getUserInfo(): UserInfo | null {
    let userInfo = localStorage.getItem('userInfo');
    let user: UserInfo;

    if (userInfo != null)
      user = JSON.parse(userInfo);
    else
      return null

    return user;
  }

  logout() {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('user_token');
    this.router.navigate(['/login']);
  }

  /* END AUTH METHODS */

}
