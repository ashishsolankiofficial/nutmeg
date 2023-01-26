import { Component, OnInit } from '@angular/core';
import { PlayableService } from 'src/app/services/playable.service';

@Component({
  selector: 'app-sports-page',
  templateUrl: './sports-page.component.html',
  styleUrls: ['./sports-page.component.scss']
})
export class SportsPageComponent implements OnInit {

  upcomming: any;
  defaultTeamImg: string = "https://www.freeiconspng.com/uploads/no-image-icon-6.png"

  constructor(private playableService: PlayableService) { }

  ngOnInit(): void {
    this.playableService.getUpcomming().subscribe(response => {
      this.upcomming = response
    })
  }

}
