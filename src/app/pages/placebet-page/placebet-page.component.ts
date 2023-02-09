import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { of, switchMap } from 'rxjs';
import { BetService } from 'src/app/services/bet.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-placebet-page',
  templateUrl: './placebet-page.component.html',
  styleUrls: ['./placebet-page.component.scss']
})
export class PlacebetPageComponent implements OnInit {

  loading: boolean = true;
  match: any;
  betId: string | undefined;
  betList: any;
  teamABets: any;
  teamBBets: any;
  userBet: any;
  prevBetExist: boolean = false;
  matchId: string | undefined;
  selectedBet: number = 100;
  defaultTeamImg: string = "https://www.freeiconspng.com/uploads/no-image-icon-6.png"
  estWinTeamA: number = 0
  estWinTeamB: number = 0
  coinBalance: number = 0
  lowBalance: boolean = false;

  constructor(private betService: BetService, private userService: UserService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.matchId = this.route.snapshot.paramMap.get('ext_id') || '';
    this.userService.coinUpdater.subscribe((resp: any) => this.coinBalance = resp)
    this.betService.getMatch(this.matchId).pipe(switchMap((resp: any) => {
      this.match = resp
      this.betId = this.match.bet_ext_id
      if (this.betId) {
        return this.betService.getBet(this.betId)
      } else {
        return of(null)
      }
    }
    )).subscribe((betResp: any) => {
      if (betResp) {
        this.betList = betResp['placed_bets']
        this.teamABets = this.betList.filter((u: any) => u.team_ext_id == this.match.teamA.ext_id)
        this.teamBBets = this.betList.filter((u: any) => u.team_ext_id == this.match.teamB.ext_id)
        this.userBet = this.betList.filter((u: any) => u.user_id == this.userService.getUser())[0]
        this.prevBetExist = true;
        this.calcEstimatedWinnings()
        this.calcAllWinnings()
        this.checkCoinBalance()
      }
      this.loading = false
    })
  }

  placeBet(team: any) {
    let bet_details = {
      'match': this.matchId,
      'placed_bets': [{
        'team': team.ext_id,
        'amount': this.selectedBet,
      }]
    }
    if (this.prevBetExist) {
      this.betService.placeBet(bet_details, this.betId).subscribe(resp => {
        this.userService.updateCoins()
        this.router.navigate(['bets'])
      })
    } else {
      this.betService.placeBet(bet_details).subscribe(resp => {
        this.userService.updateCoins()
        this.router.navigate(['bets'])
      })
    }
  }

  calcEstimatedWinnings() {
    let userbetAmountA = 0
    let userbetAmountB = 0
    if (this.userBet) {
      if (this.userBet.team_ext_id == this.match.teamA.ext_id) {
        userbetAmountA = this.userBet.amount
      } else {
        userbetAmountB = this.userBet.amount
      }
    }
    let teamATotal = this.teamABets.reduce((a: number, b: any) => { return a + b.amount }, 0) - userbetAmountA
    let teamBTotal = this.teamBBets.reduce((a: number, b: any) => { return a + b.amount }, 0) - userbetAmountB
    this.estWinTeamA = this.selectedBet + (teamBTotal * this.selectedBet / (teamATotal + this.selectedBet))
    this.estWinTeamB = this.selectedBet + (teamATotal * this.selectedBet / (teamBTotal + this.selectedBet))
  }

  calcAllWinnings() {
    let teamATotal = this.teamABets.reduce((a: number, b: any) => { return a + b.amount }, 0)
    let teamBTotal = this.teamBBets.reduce((a: number, b: any) => { return a + b.amount }, 0)
    this.teamABets = this.teamABets.map((i: any) => {
      i.est_win = i.amount + (teamBTotal * i.amount / teamATotal)
      return i
    })
    this.teamBBets = this.teamBBets.map((i: any) => {
      i.est_win = i.amount + (teamATotal * i.amount / teamBTotal)
      return i
    })
  }

  checkCoinBalance() {
    let checkAmount = 0
    if (this.userBet) {
      checkAmount = this.selectedBet - this.userBet.amount
    } else {
      checkAmount = this.selectedBet
    }
    if (checkAmount > this.coinBalance) {
      this.lowBalance = true
    } else {
      this.lowBalance = false
    }
  }

  updateBet() {
    this.calcEstimatedWinnings()
    this.checkCoinBalance()
  }
}
