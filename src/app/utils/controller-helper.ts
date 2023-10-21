import { Injectable } from '@angular/core';
import { UserInfo } from '../models/user-info.model';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class ControllerHelper {

  constructor(private router: Router, private jwtHelperService: JwtHelperService) { }

  /* AUTH METHODS */

  setUserInfo(userInfo: UserInfo) {
    localStorage.setItem('userInfo', JSON.stringify(userInfo))
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

  getCurrentUserToken(): string {
    return this.jwtHelperService.tokenGetter().toString();
  }

  logout() {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('user_token');
    this.router.navigate(['/login']);
  }

  /* END AUTH METHODS */

}
