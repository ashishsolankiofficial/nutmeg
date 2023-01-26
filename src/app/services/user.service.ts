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

  getCoins() {
    let user_ext_id = this.getUser()
    return this.http.get(environment.apiUrl + environment.coinsUrl + user_ext_id).pipe(shareReplay())
  }

}
