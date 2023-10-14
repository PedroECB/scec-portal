import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from "@angular/platform-browser";
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { UserInfo } from 'src/app/models/user-info.model';
import { LoginService } from 'src/app/services/login.service';
import { ControllerHelper } from 'src/app/utils/controller-helper';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  /* DECLARATIONS */
  public loading: boolean = false;
  showError: boolean = false;
  public errorMessage: string = '';

  public formLogin = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  })

  /* CONSTRUCTOR */
  constructor(private titleService: Title, private loginService: LoginService, private controllerHelper:ControllerHelper, private router:Router) {

  }

  ngOnInit(): void {
    this.titleService.setTitle('SCEC | Login')
  }

  /* EVENTS */
  onSubmit() {
    console.log('Submit')
    console.log(this.formLogin)

    if (this.formLogin.invalid)
      return

    this.loading = true;
    const userLogin = {
      email: this.formLogin.get('email')?.value,
      password: this.formLogin.get('password')?.value
    }

    this.loginService.auth(userLogin)
      .pipe(finalize(() => {
        this.loading = false
      })).subscribe({
        next: (value: UserInfo) => {
          console.log('Retorno')
          console.log(value)

          if(value != null && value.token){
            this.controllerHelper.setUserInfo(value);
            this.router.navigateByUrl('/dashboard');
          }
        },
        error: (value: any) => {
          console.log(value)
          this.showError = true;
          this.errorMessage = value?.error?.message ? value.error.message: value.message;

          setTimeout(() => {
            this.showError = false;
          }, 5000);
        }
      })
  }

  /* METHODS */

}
