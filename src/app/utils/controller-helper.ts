import { Injectable } from '@angular/core';
import { UserInfo } from '../models/user-info.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ControllerHelper {

  constructor(private router:Router) { }


  setUserInfo(userInfo: UserInfo) {
    window.localStorage.setItem('userInfo', JSON.stringify(userInfo))
  }

  getUserInfo(): UserInfo | null {
    let userInfo = localStorage.getItem('userInfo');
    let user: UserInfo;

    if (userInfo != null)
      user = JSON.parse(userInfo);
    else
      return null as any

    return user;
  }

  logout(){
    localStorage.removeItem('userInfo');
    this.router.navigate(['/login']);
  }
}
