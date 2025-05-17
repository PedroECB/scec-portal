import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { ControllerHelper } from 'src/app/utils/controller-helper';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  //#region VARIÁVEIS e CONSTANTES

  loading: boolean = false;
  showError: boolean = false;
  errorMessage: string = '';
  unities: any[] = [{ id: 1, unityName: 'DPT SALVADOR' }, { id: 2, unityName: 'IML FEIRA DE SANTANA' }]

  public formRegister = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.email]),
    email: new FormControl('', [Validators.required, Validators.email]),
    unity: new FormControl('', [Validators.required]),
    workCode: new FormControl(''),
    password: new FormControl('', [Validators.required, Validators.minLength(5)]),
    rePassword: new FormControl('', [Validators.required, Validators.minLength(5)])
  })

  //#endregion

  //#region CONSTRUTOR e LIFECYCLE HOOKS

  constructor(private _titleService: Title, private _loginService: LoginService, private _controllerHelper: ControllerHelper, private _router: Router) { }

  ngOnInit(): void {
    this._titleService.setTitle("Cadastre-se");
  }

  //#endregion

  //#region EVENTS

  onSubmit() {
    console.log(this.formRegister)
    return;
  }

  onClickBackToLogin() {
    this._router.navigateByUrl('/login');
  }

  //#endregion

}
