import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { _globals } from '../includes/globals';
import { RegisterForm } from '../includes/Models';

@Injectable()
export class MembershipService {

  constructor(private http:HttpClient) { }

  register(e, form:RegisterForm){
    e.stopPropagation();
    let body = JSON.stringify(form);
    console.log(form);
    
    let headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    this.http.post(_globals.API_URL + 'Administrators/Registerv1', body, {headers: headers}).subscribe((data:any) =>{
        console.log(data);
        
    });
    return false;
  }
}