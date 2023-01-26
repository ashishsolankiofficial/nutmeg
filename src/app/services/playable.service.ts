import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { shareReplay } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlayableService {

  constructor(private http: HttpClient) { }

  getUpcomming() {
    return this.http.get(environment.apiUrl + environment.upcommingPlayableUrl).pipe(shareReplay())
  }

}
