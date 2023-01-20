import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginFormComponent } from './pages/login-form/login-form.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';


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
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
