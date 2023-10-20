import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';


@NgModule({
  declarations: [
    SidebarComponent,
    HomeComponent,
    NotFoundComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    RouterModule
  ],
  exports:[
    SidebarComponent
  ]
})
export class DashboardModule { }
