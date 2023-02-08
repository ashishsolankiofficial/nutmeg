import { Component, OnInit } from '@angular/core';
import { PlayableService } from 'src/app/services/playable.service';

@Component({
  selector: 'app-upcomming-page',
  templateUrl: './upcomming-page.component.html',
  styleUrls: ['./upcomming-page.component.scss']
})
export class UpcommingPageComponent implements OnInit {

  upcomming: any;
  loading: boolean = true;
  defaultTeamImg: string = "https://www.freeiconspng.com/uploads/no-image-icon-6.png"

  constructor(private playableService: PlayableService) { }

  ngOnInit(): void {
    this.playableService.getUpcomming().subscribe(response => {
      this.upcomming = response
      this.loading = false;
    })
  }

}
