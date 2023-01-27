import { Component, OnInit } from '@angular/core';
import { resolveNaptr } from 'dns';
import { response } from 'express';
import { AuthService } from 'src/app/services/auth.service';
import { PlayableService } from 'src/app/services/playable.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor(private authservice: AuthService) { }

  ngOnInit(): void {
  }

}
