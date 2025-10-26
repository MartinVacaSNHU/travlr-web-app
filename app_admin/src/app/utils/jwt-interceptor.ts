// utils/jwt-interceptor.ts
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Authentication } from '../services/authentication';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authentication: Authentication) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const isAuthAPI = req.url.includes('/login') || req.url.includes('/register');

    if (this.authentication.isLoggedIn() && !isAuthAPI) {
      const authReq = req.clone({
        setHeaders: { Authorization: `Bearer ${this.authentication.getToken()}` }
      });
      return next.handle(authReq);
    }
    return next.handle(req);
  }
}
