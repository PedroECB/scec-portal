import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private globalService: GlobalService) { }


  auth(loginModel: any) {
    return this.globalService.apiPost('login/auth', loginModel);
  }
}
