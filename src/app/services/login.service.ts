import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { LoginModel } from '../models/login.model';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { UserInfo } from '../models/user-info.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private currentUserSubject$: BehaviorSubject<any> = new BehaviorSubject(null);
  private isAuthenticatedUserSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private globalService: GlobalService) { }


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

  isAuthenticated(): Observable<boolean> {
    return this.isAuthenticatedUserSubject.asObservable();
  }

  getAuthenticatedUser(): Observable<UserInfo> {
    return this.currentUserSubject$.asObservable();
  }


  testRequest(){
    return this.globalService.apiGet('user/all', undefined, false);
  }

}
