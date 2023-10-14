import { Component, OnInit } from '@angular/core';
import { ControllerHelper } from 'src/app/utils/controller-helper';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  /*DECLARATIONS AND CONSTRUCTOR*/
  toggledSideBar: boolean = false;
  userName: string = '';
  modules: any[] = new Array<any>();

  constructor(private controllerHelper: ControllerHelper) { }

  /*LIFECYCLE HOOKS*/
  ngOnInit(): void {
    let userInfo: any;

    userInfo = this.controllerHelper.getUserInfo();

    //Setting user name
    if (userInfo != null) {
      this.userName = userInfo.name;
      this.modules = userInfo.modules;
    }

    //Setting acess modules
    if (this.modules.length > 0) {
      this.modules.forEach((module: any) => {
        module.icon = module.icon != null ? 'fa ' + module.icon : '';
      })
    }
  }



  onToggleSideBar($event: Event) {
    this.toggledSideBar = !this.toggledSideBar
  }

  /*EVENTS*/

  onClickLogout() {
    this.controllerHelper.logout();
  }

  /* METHODS */
}
