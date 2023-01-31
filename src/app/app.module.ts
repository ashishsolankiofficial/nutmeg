import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { LoginFormComponent } from './pages/login-form/login-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { HeaderComponent } from './layout/header/header/header.component';
import { FooterComponent } from './layout/footer/footer/footer.component';
import { UpcommingPageComponent } from './pages/upcomming-page/upcomming-page.component';
import { BetsPageComponent } from './pages/bets-page/bets-page.component';
import { LeaderboardPageComponent } from './pages/leaderboard-page/leaderboard-page.component';
import { PlacebetPageComponent } from './pages/placebet-page/placebet-page.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    LoginFormComponent,
    HomePageComponent,
    HeaderComponent,
    FooterComponent,
    UpcommingPageComponent,
    BetsPageComponent,
    LeaderboardPageComponent,
    PlacebetPageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
