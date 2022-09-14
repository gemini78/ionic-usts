import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthService } from '../services/auth.service';

@Injectable()
export class LoginInterceptor implements HttpInterceptor
 {
    constructor(
        private authService: AuthService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token =  this.authService.getCurrentAccessToken();
        //console.log('Intercept: ', token);
        if (token) {
            const headers = {
                'Authorization': `Bearer ${token}`
            };
            if (req.responseType === 'json') {
                headers['Content-Type'] = 'application/json';
            }
            req = req.clone({
                setHeaders: headers
            });
        }  
        return next.handle(req);
    }
}