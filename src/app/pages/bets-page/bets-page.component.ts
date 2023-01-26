import { Component, OnInit } from '@angular/core';
import { BetService } from 'src/app/services/bet.service';

@Component({
  selector: 'app-bets-page',
  templateUrl: './bets-page.component.html',
  styleUrls: ['./bets-page.component.scss']
})
export class BetsPageComponent implements OnInit {

  yourBets: any;

  constructor(private betService: BetService) { }

  ngOnInit(): void {
    this.betService.getBetList().subscribe((resp: any) => {
      this.yourBets = resp['results']
    })
  }



}
