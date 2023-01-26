import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BetService } from 'src/app/services/bet.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-placebet-page',
  templateUrl: './placebet-page.component.html',
  styleUrls: ['./placebet-page.component.scss']
})
export class PlacebetPageComponent implements OnInit {

  match: any;
  bet_id: string | undefined;
  bet_list: any;
  user_bet: any;
  prev_bet_exist: boolean = false;
  match_id: string | undefined;
  selectedBet: number = 100;
  defaultTeamImg: string = "https://www.freeiconspng.com/uploads/no-image-icon-6.png"

  constructor(private betService: BetService, private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.match_id = this.route.snapshot.paramMap.get('ext_id') || '';
    this.betService.getMatch(this.match_id).subscribe(resp => {
      this.match = resp
    })
    this.betService.getBet(this.match_id).subscribe((resp: any) => {
      this.bet_id = resp['ext_id']
      this.bet_list = resp['placed_bets']
      this.prev_bet_exist = true;
      this.user_bet = this.bet_list.filter((u: any) => u.user_id == this.userService.getUser())[0]
    })
  }

  placeBet(team: any) {
    let bet_details = {
      'match': this.match_id,
      'placed_bets': [{
        'team': team.ext_id,
        'amount': this.selectedBet,
      }]
    }
    if (this.prev_bet_exist) {
      this.betService.placeBet(bet_details, this.bet_id).subscribe()
    } else {
      this.betService.placeBet(bet_details).subscribe()
    }
  }



}
