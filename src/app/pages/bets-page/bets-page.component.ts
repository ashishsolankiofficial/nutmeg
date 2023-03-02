import { Component, OnInit } from '@angular/core';
import { BetService } from 'src/app/services/bet.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-bets-page',
  templateUrl: './bets-page.component.html',
  styleUrls: ['./bets-page.component.scss']
})
export class BetsPageComponent implements OnInit {

  loading: boolean = true;
  yourBets: any;
  nextUrl: any;
  previousUrl: any;
  initUrl: string = environment.apiUrl + environment.yourBetsUrl

  defaultTeamImg: string = "https://www.freeiconspng.com/uploads/no-image-icon-6.png"

  constructor(private betService: BetService) { }

  getYourBets(url: string) {
    this.loading = true;
    this.betService.getYourBetList(url).subscribe((resp: any) => {
      this.yourBets = resp['results']
      if (resp.next) {
        this.nextUrl = resp.next;
      } else {
        this.nextUrl = undefined
      }
      if (resp.previous) {
        this.previousUrl = resp.previous;
      } else {
        this.previousUrl = undefined
      }
      this.loading = false;
    })
  }

  fetchPrevious() {
    this.getYourBets(this.previousUrl);
  }
  fetchNext() {
    this.getYourBets(this.nextUrl);
  }

  ngOnInit(): void {
    this.getYourBets(this.initUrl)
  }

}
