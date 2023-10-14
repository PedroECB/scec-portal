import { Injectable } from '@angular/core';
import { Observable, Subject, lastValueFrom, takeUntil } from 'rxjs';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http'
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  private headersAuth = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + 'token' });
  private headersNoAuth = new HttpHeaders({ 'Content-Type': 'application/json' });
  private toggleSideBarSubject: Subject<any> = new Subject<any>();

  constructor(private httpClient: HttpClient) { }


  setToggleSideBar($event: any) {
    this.toggleSideBarSubject.next($event);
  }

  getToggleSideBar() {
    return this.toggleSideBarSubject.asObservable();
  }

  /* REQUESTS */

  apiGet(url: string, params?: HttpParams, isLogged: boolean = false): Observable<any> {
    let headers = isLogged ? this.headersAuth : this.headersNoAuth;
    let apiUrl = environment.apiUrl + url;
    return this.httpClient.get(apiUrl, { headers: headers, params: params });
  }

  apiPost(url: string, data?: any, isLogged: boolean = false): Observable<any> {
    let headers = isLogged ? this.headersAuth : this.headersNoAuth;
    let apiUrl = environment.apiUrl + url;
    return this.httpClient.post(apiUrl, data);
  }

}
