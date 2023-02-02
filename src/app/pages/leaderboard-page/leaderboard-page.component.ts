import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-leaderboard-page',
  templateUrl: './leaderboard-page.component.html',
  styleUrls: ['./leaderboard-page.component.scss']
})
export class LeaderboardPageComponent implements OnInit {

  leaderBoard: any;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getLeaderBoard().subscribe(resp => this.leaderBoard = resp)
  }

}
