import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import jwt_decode from 'jwt-decode';

import { User } from '../models/user';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { response } from 'express';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserObservable: BehaviorSubject<User> = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser') || '{}'))

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserObservable.subscribe((user: User) => {
      if (user.token) {
        localStorage.setItem('currentUser', JSON.stringify(user));
      } else {
        localStorage.removeItem('currentUser')
      }
    })
  }

  public get currentUserValue(): User {
    return this.currentUserObservable.value;
  }

  login(email: any, password: any) {
    return this.http.post<any>(environment.apiUrl + environment.loginUrl, { email: email, password: password })
      .pipe(
        map((response) => {
          let currentUser: User;
          if (response.access) {
            currentUser = jwt_decode(response.access);
            currentUser.token = response.access;
            currentUser.refreshToken = response.refresh;
            this.currentUserObservable.next(currentUser);
          }
        })
      );
  }

  logout() {
    this.currentUserObservable.next(new User);
    this.router.navigate(['login-page']);
  }

  refreshToken() {
    const refreshToken = this.currentUserValue.refreshToken;
    return this.http
      .post<any>(environment.apiUrl + environment.refreshUrl, {
        refresh: refreshToken,
      })
      .pipe(
        map((response) => {
          let currentUser = new User;
          if (response.access) {
            currentUser = jwt_decode(response.access);
            currentUser.token = response.access;
            currentUser.refreshToken = this.currentUserValue.refreshToken;
            this.currentUserObservable.next(currentUser);
          }
          return currentUser
        }
        )
      );
  }
}
