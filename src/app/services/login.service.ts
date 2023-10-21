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
    return this.globalService.apiPost('login/auth', loginModel)
      .pipe(
        tap((userInfo: UserInfo) => {
          console.log(userInfo)
          this.currentUserSubject$.next(userInfo);
          this.isAuthenticatedUserSubject.next(true);
        })
      );
  }

  // isAuthenticated(): Observable<boolean> {
  //   return this.isAuthenticatedUserSubject.asObservable();
  // }

  // getAuthenticatedUser(): Observable<UserInfo> {
  //   return this.currentUserSubject$.asObservable();
  // }

  // checkTokenValidation(): Observable<boolean> {
  //   return this.globalService.apiGet('login/checktoken')
  //     .pipe(
  //       tap((user: any) => {
  //         if (user) {
  //           this.currentUserSubject$.next(user);
  //           this.isAuthenticatedUserSubject.next(true);
  //         }
  //       }),
  //       map((u: any) => (u) ? true : false),
  //       catchError((error) => {
  //         this.controllerHelper.logout();
  //         return of(false)
  //       })
  //     )
  // }

  testRequest() {
    return this.globalService.apiGet('user/all', undefined, false);
  }

}
