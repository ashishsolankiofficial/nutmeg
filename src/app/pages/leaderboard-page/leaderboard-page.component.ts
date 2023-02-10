import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-leaderboard-page',
  templateUrl: './leaderboard-page.component.html',
  styleUrls: ['./leaderboard-page.component.scss']
})
export class LeaderboardPageComponent implements OnInit {

  leaderBoard: any;
  inverseLeaderBoard: any
  taskLeaderBoard: any = []
  tasks: any;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getLeaderBoard().subscribe((resp: any) => {
      this.leaderBoard = resp.sort(function (a: any, b: any) { return b.coins - a.coins })
      for (let i = 0; i < this.leaderBoard.length / 2; i++) {
        this.taskLeaderBoard.push({
          display_name: this.leaderBoard[i].display_name,
          coins: this.leaderBoard[i].coins,
          vs_display_name: this.leaderBoard[this.leaderBoard.length - 1 - i].display_name,
          vs_coins: this.leaderBoard[this.leaderBoard.length - 1 - i].coins
        })
      }
      this.userService.getTasks().subscribe(resp => {
        this.tasks = resp
        this.taskLeaderBoard.map((v: any, i: any) => {
          v['task'] = this.tasks[i]['task']
          return v
        })
      })
    })

  }

}
