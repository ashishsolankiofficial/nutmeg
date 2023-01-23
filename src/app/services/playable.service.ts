import { HttpClient } from '@angular/common/http';
import { APP_ID, Injectable } from '@angular/core';
import { shareReplay } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlayableService {

  constructor(private http: HttpClient) { }

  getSports() {
    return this.http.get(environment.apiUrl + environment.upcommingPlayableUrl).pipe(shareReplay())
  }

  getMatches() {
    return this.http.get(environment.apiUrl + environment.matchesUrl).pipe(shareReplay())
  }
}
