import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { BetsPageComponent } from './pages/bets-page/bets-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LeaderboardPageComponent } from './pages/leaderboard-page/leaderboard-page.component';
import { LoginFormComponent } from './pages/login-form/login-form.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { PasswordresetFormComponent } from './pages/passwordreset-form/passwordreset-form.component';
import { PlacebetPageComponent } from './pages/placebet-page/placebet-page.component';
import { ProfileFormComponent } from './pages/profile-form/profile-form.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { UpcommingPageComponent } from './pages/upcomming-page/upcomming-page.component';


const routes: Routes = [
  {
    path: 'login-page',
    component: LoginPageComponent,
    children: [{
      path: '',
      component: LoginFormComponent
    }]
  },
  {
    path: '',
    component: HomePageComponent,
    canActivate: [AuthGuard],
    children: [{
      path: '',
      component: UpcommingPageComponent
    },
    {
      path: 'bets',
      component: BetsPageComponent
    },
    {
      path: 'leaderboard',
      component: LeaderboardPageComponent
    },
    {
      path: 'palcebet/:ext_id',
      component: PlacebetPageComponent
    },
    {
      path: 'profile/:ext_id',
      component: ProfilePageComponent
    },
    {
      path: 'profile/:ext_id/edit',
      component: ProfileFormComponent
    },
    {
      path: 'profile/:ext_id/password-reset-page',
      component: PasswordresetFormComponent
    }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
