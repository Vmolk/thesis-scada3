import { Injectable } from '@angular/core';
import {environment} from 'src/environments/environment'
import {HttpClient, HttpParams} from '@angular/common/http'
import {BehaviorSubject } from 'rxjs';
import { API_PATH } from 'src/app/_utils/api';
import { tap, mapTo } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  apiUrl = environment
  public currentUserSubject: BehaviorSubject<any>;
  private readonly JWT_TOKEN = 'JWT_TOKEN';

  constructor(
    private http : HttpClient,
  ) { }

  login(user:any)
  {
    const userName = user.username;
    const password = user.password;
    return this.http.post<any>(API_PATH.AUTHEN.LOGIN, {userName,password})
      .pipe(
        tap(tokens => {
          localStorage.setItem(this.JWT_TOKEN,tokens.token);
        }),
        mapTo(true)
      )
  }

isLoggedIn() {
  if (this.getJwtToken()) {
    return true;
  }
  return false;
}

getJwtToken() {
  return localStorage.getItem(this.JWT_TOKEN);
}

doLogoutUser() {
  this.removeTokens();
}

private removeTokens() {
  localStorage.removeItem(this.JWT_TOKEN);
}



}
