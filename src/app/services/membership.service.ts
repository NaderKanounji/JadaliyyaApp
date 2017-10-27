import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
// import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { _globals } from '../includes/globals';
import { RegisterForm, LoginForm } from '../includes/Models';

@Injectable()
export class MembershipService {

  constructor(private user:UserService, private http:HttpClient, private router: Router) { }

  register(e, form:RegisterForm){
    e.stopPropagation();
    const headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.post(_globals.API_URL + 'Administrators/Registerv1', JSON.stringify(form), {headers}).map(response => response);
  }

  login(e, form:LoginForm){
    e.stopPropagation();
    const headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.post(_globals.API_URL + '/token', JSON.stringify(form), {headers}).map(response => response);
  }

  logout(e){
    e.stopPropagation();

    this.user.clearStoredUser();
    this.user.clearUser();

    this.router.navigate([this.router.parseUrl]);

  }
}