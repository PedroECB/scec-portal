import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from "@angular/platform-browser";
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { LoginModel } from 'src/app/models/login.model';
import { UserInfo } from 'src/app/models/user-info.model';
import { LoginService } from 'src/app/services/login.service';
import { ControllerHelper } from 'src/app/utils/controller-helper';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  /* DECLARATIONS */
  loading: boolean = false;
  showError: boolean = false;
  errorMessage: string = '';

  public formLogin = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  })

  /* CONSTRUCTOR */
  constructor(private titleService: Title, private loginService: LoginService, private controllerHelper: ControllerHelper, private router: Router) { }

  ngOnInit(): void {
    this.titleService.setTitle('SCEC | Login')
  }

  /* EVENTS */
  onSubmit() {

    if (this.formLogin.invalid)
      return

    this.loading = true;

    const userLogin: LoginModel =
    {
      email: this.formLogin.get('email')?.value,
      password: this.formLogin.get('password')?.value
    }

    this.loginService.auth(userLogin)
      .pipe(finalize(() => {
        this.loading = false
      })).subscribe({
        next: (user: UserInfo) => {
          console.log('Retorno')
          console.log(user)

          if (user != null && user.token) {
            this.controllerHelper.setUserInfo(user);
            this.router.navigateByUrl('/dashboard/home');
          }
        },
        error: (errorReturned: any) => {
          console.log(errorReturned)
          this.showError = true;
          this.errorMessage = errorReturned?.error?.message ? errorReturned.error.message : errorReturned.message;

          setTimeout(() => {
            this.showError = false;
          }, 5000);
        }
      })
  }

  /* METHODS */

}
