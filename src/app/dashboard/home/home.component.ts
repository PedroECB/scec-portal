import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private titleService: Title, private loginService: LoginService) {

  }

  ngOnInit(): void {
    this.titleService.setTitle('Página inicial');
    // setTimeout(() => {

    //   this.loginService.testRequest()
    //     .subscribe({
    //       next: (value: any) => {
    //         console.log(value)
    //       },
    //       error: (error) => {
    //         console.log(error)
    //       }
    //     })

    // }, 3000);
  }

}
