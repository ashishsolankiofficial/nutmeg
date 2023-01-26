import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { shareReplay } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BetService {

  constructor(private http: HttpClient) { }

  getMatch(match_id: string) {
    return this.http.get(environment.apiUrl + environment.matchUrl + match_id).pipe(shareReplay())
  }

  getBetList() {
    return this.http.get(environment.apiUrl + environment.betUrl).pipe(shareReplay())
  }


  getBet(match_id: string) {
    return this.http.get(environment.apiUrl + environment.betUrl + match_id).pipe(shareReplay())
  }

  placeBet(betDetails: any, betId?: string) {
    if (betId) {
      return this.http.put(environment.apiUrl + environment.betUrl + betId, betDetails).pipe(shareReplay())
    } else {
      return this.http.post(environment.apiUrl + environment.betUrl, betDetails).pipe(shareReplay())
    }
  }

}
