import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthenticationService } from '../_service/admin/authentication.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    public authService: AuthenticationService,
    private router: Router,
  ) { }

intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('JWT_TOKEN');
    if(token)
    {
      request = request.clone({
        withCredentials: false,
        setHeaders: {
          Authorization: `bearer ${token}`,
          Accept: '*/*',
          'Content-Type': 'application/json'
        },
        });
    }
    else
    {
      request = request.clone({
        withCredentials: false,
      });
    }
    return next.handle(request).pipe(
      // this.authService.login(user).subscribe(
      //   data => {
      //     if (data) {
      //       this.router.navigate([this.returnUrl]);
      //       this.spinner.hide();
      //     }
      //   },
      //   err => {
      //     this.error = `message.${err.error.errorKey}`;
      //     this.spinner.hide();
      //   }
      // );
    );
  }
}

    // const token = localStorage.getItem('JWT_TOKEN');
    // if(token)
    // {
    //   request = request.clone({ headers: request.headers.set( 'Authorization', 'Bearer '+token)});
    // }
    // else
    // {
    //   this.router.navigate(['/login']);
    // }
    // return next.handle(request);
