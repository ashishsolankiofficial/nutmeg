import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { shareReplay } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUser() {
    return JSON.parse(localStorage.getItem('currentUser') || '{}')['ext_id']
  }

  getUserProfile() {
    let user_ext_id = this.getUser()
    return this.http.get(environment.apiUrl + environment.userProfileUrl + user_ext_id).pipe(shareReplay())
  }

  saveUserProfile(data: any) {
    let user_ext_id = this.getUser()
    return this.http.put<any>(environment.apiUrl + environment.userProfileUrl + user_ext_id + '/', data).pipe(shareReplay())
  }

  getCoins() {
    let user_ext_id = this.getUser()
    return this.http.get(environment.apiUrl + environment.coinsUrl + user_ext_id).pipe(shareReplay())
  }

  getLeaderBoard() {
    return this.http.get(environment.apiUrl + environment.leaderBoardUrl).pipe(shareReplay())
  }

}
