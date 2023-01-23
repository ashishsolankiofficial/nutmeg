import { Component, OnInit } from '@angular/core';
import { PlayableService } from 'src/app/services/playable.service';

@Component({
  selector: 'app-sports-page',
  templateUrl: './sports-page.component.html',
  styleUrls: ['./sports-page.component.scss']
})
export class SportsPageComponent implements OnInit {

  sports: any;
  matches: any;
  now = new Date().getTime()

  constructor(private playableService: PlayableService) { }

  ngOnInit(): void {
    this.playableService.getSports().subscribe(response => {
      this.sports = response
    })
  }

}
