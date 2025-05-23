import { Injectable } from '@angular/core';
import { Observable, Subject, catchError, finalize, lastValueFrom, map, takeUntil, tap, throwError } from 'rxjs';
import { HttpHeaders, HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http'
import { environment } from '../../environments/environment';
import { ControllerHelper } from 'src/app/utils/controller-helper';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  private headersAuth = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + 'token' });
  private headersNoAuth = new HttpHeaders({ 'Content-Type': 'application/json' });
  private toggleSideBarSubject: Subject<any> = new Subject<any>();
  private loadingSubject: Subject<any> = new Subject<any>();

  constructor(private httpClient: HttpClient, private controllerHelper: ControllerHelper) { }

  /* SETTERS ANG GETTER SUBJECTS */

  setLoading(loading: boolean = false) {
    this.loadingSubject.next(loading);
  }

  getLoading() {
    return this.loadingSubject.asObservable();
  }


  setToggleSideBar($event: any) {
    this.toggleSideBarSubject.next($event);
  }

  getToggleSideBar() {
    return this.toggleSideBarSubject.asObservable();
  }

  /* REQUESTS */

  apiGet(url: string, params?: HttpParams, isLogged: boolean = false, loading: boolean = false): Observable<any> {
    let headers: HttpHeaders = isLogged ? this.headersAuth : this.headersNoAuth;
    let apiUrl: string = environment.apiUrl + url;

    if (loading)
      this.setLoading(true);

    return this.httpClient.get(apiUrl, { headers: headers, params: params })
      .pipe(
        finalize(() => this.setLoading(false)),
        catchError(this.handleError)
      );
  }

  apiPost(url: string, data?: any, isLogged: boolean = false, loading: boolean = false): Observable<any> {
    let headers: HttpHeaders = isLogged ? this.headersAuth : this.headersNoAuth;
    let apiUrl: string = environment.apiUrl + url;

    if (loading)
      this.setLoading(true);

    return this.httpClient.post(apiUrl, data, { headers: headers })
      .pipe(
        finalize(() => this.setLoading(false)),
        catchError(this.handleError)
      );
  }

  handleError = (error: HttpErrorResponse) => {

    if (error.status == 401) {
      console.error(`Usuário não autorizado, autentique-se novamente ${error.status} `);
      this.controllerHelper.logout();
    }

    if (error.status == 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    const messageError = error?.error?.message ? error.error.message : error.message;
    return throwError(() => new Error(messageError));
  }

}
