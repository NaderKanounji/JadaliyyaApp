import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { FunctionsService } from '../services/functions.service';
// import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { _globals } from '../includes/globals';
import { RegisterForm, LoginForm, UserModel } from '../includes/Models';

@Injectable()
export class MembershipService {

  constructor(private myFunctions:FunctionsService, private user:UserService, private http:HttpClient, private router: Router) { }

  register(e, form:RegisterForm){
    e.stopPropagation();
    const headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.post(_globals.API_URL + 'Administrators/Registerv1', JSON.stringify(form), {headers}).map(response => response);
  }

  login(e, form:LoginForm){
    e.stopPropagation();    
    const headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.post(_globals.BASE_URL + 'token', 'username=' + form.username + '&password=' + form.password + '&grant_type=password', {headers}).map(response => response);
  }

  logout(e){
    e.stopPropagation();

    this.user.clearStoredUser();
    this.user.clearUser();
    setTimeout(() => {
      this.myFunctions.psy_popup();
      this.myFunctions.close_popup();
    }, 200);
    console.log(this.router.parseUrl);
    
    this.router.navigate([this.router.parseUrl]);

  }

  GetUserInfo(userToken:any){
    return this.http.get(_globals.API_URL + 'Administrators/GetUserInfo').map(response => response);
  }

  FollowWriter(writerId:number){
    return this.http.post(_globals.API_URL + 'Data/FollowWriter?writerId=' + writerId, '').map(response => response);
  }
  UnfollowWriter(writerId:number){
    //const headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.post(_globals.API_URL + 'Data/UnfollowWriter?writerId=' + writerId, '').map(response => response);
  }

  GetAllFolders(){
    return this.http.get(_globals.API_URL + 'Data/GetAllFolders').map(response => response);
  }

  CreateFolderWithArticle(title:string, id:number){
    return this.http.post(_globals.API_URL + 'Data/CreateFolderWithArticle?title=' + title + '&articles=' + id, '').map(response => response)
  }
  AddToFolder(folderId:number, articleId:number){
    return this.http.post(_globals.API_URL + 'Data/AddToFolder?folderId=' + folderId + '&articleId=' + articleId, '').map(response => response)
  }
  DeleteFolders(folders:string){
    return this.http.post(_globals.API_URL + 'Data/DeleteFolders?folders=' + folders, '').map(response => response)
  }
  RemoveArticlesFromFolders(articlesInFolders:string){
    return this.http.post(_globals.API_URL + 'Data/RemoveArticlesFromFolders?articlesInFolders=' + articlesInFolders, '').map(response => response)
  }
}