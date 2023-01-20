import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators'
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const currentUser = this.authService.currentUserValue;
    const isLoggedIn = currentUser && currentUser.token;
    const isApiUrl = request.url.startsWith(environment.apiUrl);
    const isRefreshUrl = (request.url == (environment.apiUrl + environment.refreshUrl))
    const isLoginUrl = (request.url == (environment.apiUrl + environment.loginUrl))

    if (isLoggedIn && isApiUrl && !isRefreshUrl && !isLoginUrl) {
      request = this.addToken(request, currentUser.token)
    }

    return next.handle(request).pipe(catchError((err) => {
      if (err instanceof HttpErrorResponse && [401, 403].includes(err.status) && isRefreshUrl) {
        this.authService.logout();
        return throwError(err)
      }
      else if (err instanceof HttpErrorResponse && [401, 403].includes(err.status)) {
        return this.handleTokenRefresh(request, next);
      }
      else {
        return throwError(err);
      }
    })
    );
  }

  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  handleTokenRefresh(request: HttpRequest<any>, next: HttpHandler) {
    this.refreshTokenSubject.next(null);
    return this.authService.refreshToken().pipe(
      switchMap((response: any) => {
        this.refreshTokenSubject.next(response.access);
        return next.handle(this.addToken(request, response.access));
      }));
  }


  private addToken(request: HttpRequest<any>, token: string | undefined) {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer  ${token}`
      }
    });
  }

}
