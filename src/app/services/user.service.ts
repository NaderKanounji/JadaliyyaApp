import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { UserModel, SharedModel } from '../includes/Models';

@Injectable()
export class UserService {

  private userSource = new BehaviorSubject<UserModel>(
    {'isLogged': false, 'user': {'fullname': null, 'id':null,'UserName':null}, 'token':{access_token:null, expires_in:null, refresh_token:null, token_type: null}, follows: null }
  );
  
  user = this.userSource.asObservable();

  constructor() { 
  }
  saveUser(data:any){
    this.clearStoredUser();
    if(data){
      
      this.clearUser();
      //Set User
      let tempSource = this.userSource.getValue();
      tempSource = data;
      tempSource.isLogged = true;
      this.userSource.next(tempSource);
    }
    //Register User to local storage
    localStorage.setItem('_jad_user',JSON.stringify(this.userSource.getValue()));
  }
  loadUser(data:any){
    if(localStorage.getItem('_jad_user')){
      this.userSource.next(JSON.parse(localStorage.getItem('_jad_user')));
    }
  }
  clearUser(){    
    this.userSource.next({'isLogged': false, 'user': {'fullname': null, 'id':null,'UserName':null}, 'token':{access_token:null, expires_in:null, refresh_token:null, token_type: null}, follows:null });
  }
  clearStoredUser(){
    localStorage.removeItem('_jad_user');
  }

  /* Getters */
  getUser(): UserModel{
    return this.userSource.getValue();
  } 
  getToken(): any{
    return this.userSource.getValue().token;
  }


  isLogged():boolean{
    if(this.user){
      return this.userSource.getValue().isLogged;
    }
    return false;
  }
  /* end Getters */

  /* Setters */
  setUser(user:UserModel){
    this.userSource.next(user);
  }
  setUserInfo(user:any){
    let tempSrc = this.userSource.getValue();
    tempSrc.user = user;
    this.userSource.next(tempSrc);
  }
  setLogged(isLogged:boolean){
    let tempSrc = this.userSource.getValue();
    tempSrc.isLogged = isLogged;
    this.userSource.next(tempSrc);
  }
  setToken(token:any){
    let tempSrc = this.userSource.getValue();
    tempSrc.token = token;
    this.userSource.next(tempSrc);
  }
  setAccessToken(token:string){
    let tempSrc = this.userSource.getValue();
    tempSrc.token.access_token = token;
    this.userSource.next(tempSrc);
  }
  setFullname(fullname:string){
    let tempSrc = this.userSource.getValue();
    tempSrc.user.fullname = fullname;
    this.userSource.next(tempSrc);
  }
  setUsername(username:string){
    let tempSrc = this.userSource.getValue();
    tempSrc.user.UserName = username;
    this.userSource.next(tempSrc);
  }
  setId(id:string){
    let tempSrc = this.userSource.getValue();
    tempSrc.user.id = id;
    this.userSource.next(tempSrc);
  }
  addFollow(id:number){
    let tempSrc = this.userSource.getValue();
    if(!tempSrc.follows){
      tempSrc.follows = [];
    }
    tempSrc.follows.push(id);
    this.userSource.next(tempSrc);
  }
  removeFollow(id:number){
    let tempSrc = this.userSource.getValue();
    tempSrc.follows = tempSrc.follows.filter(d => d != id);
    this.userSource.next(tempSrc);
  }
  /* end Setters */

}
