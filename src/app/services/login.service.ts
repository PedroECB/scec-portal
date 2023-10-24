import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { LoginModel } from '../models/login.model';
import { BehaviorSubject, Observable, catchError, map, of, tap } from 'rxjs';
import { UserInfo } from '../models/user-info.model';
import { ControllerHelper } from '../utils/controller-helper';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private currentUserSubject$: BehaviorSubject<any> = new BehaviorSubject(null);
  private isAuthenticatedUserSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private globalService: GlobalService, private controllerHelper: ControllerHelper) { }

  auth(loginModel: LoginModel) {
    return this.globalService.apiPost('login/auth', loginModel, false, false)
      .pipe(
        tap((userInfo: UserInfo) => {
          console.log(userInfo)
          this.currentUserSubject$.next(userInfo);
          this.isAuthenticatedUserSubject.next(true);
        })
      );
  }

  testRequest() {
    return this.globalService.apiGet('user/all', undefined, false);
  }

}
