import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginFormComponent } from './pages/login-form/login-form.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';

const routes: Routes = [{
  path: 'login-page',
  component: LoginPageComponent,
  children: [{
    path: '',
    component: LoginFormComponent
  }]
}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
