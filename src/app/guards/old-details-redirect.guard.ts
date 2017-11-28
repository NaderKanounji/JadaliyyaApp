import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

import { _globals } from '../includes/globals';

@Injectable()
export class OldDetailsRedirectGuard implements CanActivate {
  constructor(private router:Router, private http:HttpClient){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
     console.log(next.params.id);
     
      let oldId = next.params.id;
        if(oldId){

          this.http.get(_globals.API_URL + 'Data/GetNewArticleId?oldId=' + oldId).subscribe((data:any) =>{
            this.router.navigate(['/Details/' + data.id + (data.customUrlTitle ? '/' + data.customUrlTitle : '')]);
          }, (err: any)=> {
            return false;
          });
        }else{
          return false;
        }
  }
}
