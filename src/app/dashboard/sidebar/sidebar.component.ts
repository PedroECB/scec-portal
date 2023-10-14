import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  toggledSideBar:boolean = false;

  toggleSideBar($event: Event){
      this.toggledSideBar = !this.toggledSideBar
  }
}
