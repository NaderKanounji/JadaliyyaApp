import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { FunctionsService } from '../services/functions.service';
// import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { _globals } from '../includes/globals';
import { RegisterForm, LoginForm, UserModel, ProfileModel, PasswordModel } from '../includes/Models';

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
    return this.http.post(_globals.BASE_API_URL + 'token', 'username=' + form.username + '&password=' + form.password + '&grant_type=password', {headers}).map(response => response);
  }

  logout(e){
    e.stopPropagation();

    this.user.clearStoredUser();
    this.user.clearUser();
    setTimeout(() => {
      this.myFunctions.psy_popup();
      this.myFunctions.close_popup();
    }, 200);
    //console.log(this.router.parseUrl);
    
    this.router.navigate([this.router.parseUrl]);

  }

  GetUserInfo(asWriter:boolean){
    return this.http.get(_globals.API_URL + 'Administrators/GetUserInfo?asWriter=' +  asWriter).map(response => response);
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
  CreateFolder(title:string){
    return this.http.post(_globals.API_URL + 'Data/CreateFolder?title=' + title, '').map(response => response)
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
  RenameFolder(id:number, title:string){
    return this.http.post(_globals.API_URL + 'Data/RenameFolder?id=' + id + '&title=' + title, '').map(response => response)
  }
  // FacebookExternalLogin(userId:string, accessToken:string){
  //   return this.http.post(_globals.API_URL + 'Administrators/FacebookExternalLogin?accessToken=' + accessToken, '').map(response => response)
  // }
  FacebookExternalLogin(userId:string, accessToken:string){
    //const headers = new HttpHeaders().set('accessToken', accessToken);
    return this.http.post(_globals.API_URL + 'Administrators/FacebookExternalLogin?accessToken=' + accessToken, '').map(response => response)
  }
  GoogleExternalLogin(googleId:string, name:string, email:string){
    //const headers = new HttpHeaders().set('accessToken', accessToken);
    return this.http.post(_globals.API_URL + 'Administrators/GoogleExternalLogin?email=' + email + '&googleId=' + googleId + '&name=' + name, '').map(response => response)
  }
  GetDetailedProfile(){
    return this.http.get(_globals.API_URL + 'Administrators/GetDetailedUserInfo').map(response => response);
  }
  UpdateProfile(profileModel:ProfileModel){
    const headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.post(_globals.API_URL + 'Administrators/UpdateBasicInfo', JSON.stringify(profileModel), {headers}).map(response => response)
  }
  UpdatePassword(passwordModel:PasswordModel){
    const headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.post(_globals.API_URL + 'Administrators/UpdateAccountInfo', JSON.stringify(passwordModel), {headers}).map(response => response)
  }
  ShareFoldersWithFriend(folders:string, email:string){
    return this.http.post(_globals.API_URL + 'Data/ShareFolders?folderIds=' + folders + '&email=' + email, '').map(response => response)
  }
  ShareArticlesWithFriend(articles:string, email:string){
    return this.http.post(_globals.API_URL + 'Data/ShareArticles?articleIds=' + articles + '&email=' + email, '').map(response => response)
  }
  DeleteSharedFoldersAndArticles(folders:string, articles:string){
    return this.http.post(_globals.API_URL + 'Data/DeleteSharedFoldersAndArticles?folderIds=' + folders + '&articleIds=' + articles, '').map(response => response)
  }
  FavoriteSharedArticlesAndFolders(folders:string, articles:string, toFolderId:number){
    return this.http.post(_globals.API_URL + 'Data/FavoriteSharedArticlesAndFolders?folderIds=' + folders + '&articleIds=' + articles + '&toFolderId=' + toFolderId, '').map(response => response)
  }
}