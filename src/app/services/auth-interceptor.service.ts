import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {  HttpRequest,  HttpHandler,  HttpEvent,  HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';

import { UserModel } from '../includes/Models';
import { UserService } from '../services/user.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private router:Router, private user: UserService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    let token = this.user.getToken();
    //console.log(token);
    
    if(token){
      request = request.clone({
        setHeaders:{
          Authorization: token.token_type + ' ' + token.access_token,
         // withCredentials:'true'
        },
        
      });
    }
    return next.handle(request).do((event:HttpEvent<any>) => {

    }, (err: any) => {
      if(err.status === 401){
        this.user.clearStoredUser();
        this.user.clearUser();
        this.router.navigate(['/']);
      }
    });
  }
}