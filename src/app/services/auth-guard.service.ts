import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { ControllerHelper } from '../utils/controller-helper';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard {

  constructor(private controllerHelper: ControllerHelper, private jwtHelperService: JwtHelperService) { }

  canActivate(): boolean {
    if (this.jwtHelperService.tokenGetter() && !this.jwtHelperService.isTokenExpired() && this.controllerHelper.getUserInfo() != null)
      return true;
    else
      this.controllerHelper.logout();

    return false;
  }

  canMatch(currentUser: any): boolean {
    return false;
  }
}

export const canActivateUsers: CanActivateFn =
  (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    return inject(AuthGuard).canActivate();
  };
