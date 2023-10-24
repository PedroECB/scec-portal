import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { RouterModule, provideRouter } from '@angular/router';
import { DashboardModule } from './dashboard/dashboard.module';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GlobalService } from './services/global.service';
import { HttpClientModule } from '@angular/common/http';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { JwtHelperService } from '@auth0/angular-jwt';
import { JwtModule } from "@auth0/angular-jwt";
import { ControllerHelper } from './utils/controller-helper';
import { LoadingComponent } from './shared/loading/loading.component';
import { SharedModule } from './shared/shared.module';

export function tokenGetter() {
  let user = localStorage.getItem("userInfo");

  if (user != null)
    return JSON.parse(user)?.token
  else
    return null
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomePageComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: [],
        disallowedRoutes: [],
      },
    })
  ],
  providers: [
    GlobalService,
    ControllerHelper,
    // provideRouter([])
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
