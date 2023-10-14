import { Injectable } from '@angular/core';
import { UserInfo } from '../models/user-info.model';

@Injectable({
  providedIn: 'root'
})
export class ControllerHelper {

  constructor() { }


  setUserInfo(userInfo: UserInfo) {
    window.localStorage.setItem('userInfo', JSON.stringify(userInfo))
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
}
