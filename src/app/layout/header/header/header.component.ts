import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  user_id: string | undefined;
  coins: any
  isCollapsed = false;
  coinImg = "../../../assets/images/coin.png"
  constructor(private userService: UserService, private authService: AuthService) { }

  ngOnInit(): void {
    this.user_id = this.userService.getUser()
    this.userService.coinUpdater.subscribe((resp: any) => this.coins = resp)
    this.userService.updateCoins()
  }

  logout() {
    this.authService.logout()
  }

}
