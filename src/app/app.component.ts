import { Component } from '@angular/core';
import { GlobalService } from './services/global.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'scec-spa';
  public toggledSideBar:boolean = false;

  constructor(private globalService:GlobalService) {
    // this.globalService.getToggleSideBar().subscribe(($event:any)=>{
    //   setTimeout(() => {
    //     this.toggledSideBar = !this.toggledSideBar
    //   }, 1000);
    // })
  }
}
