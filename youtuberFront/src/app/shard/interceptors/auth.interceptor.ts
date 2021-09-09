import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Auth } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
// tslint:disable-next-line:class-name
export class authInterceptor implements HttpInterceptor {
  constructor(private auth: Auth) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.auth.getToken();
    if (token) {
      const cloned = req.clone({
        headers: req.headers.set('Authentication', `${token}`),
      });
      return next.handle(cloned);
    }
    return next.handle(req);
  }
}
