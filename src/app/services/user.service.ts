import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { UserModel, SharedModel } from '../includes/Models';

@Injectable()
export class UserService {

  private userSource = new BehaviorSubject<UserModel>(
    {'isLogged': false, 'fullname': null, 'id':null,'UserName':null, 'token':null }
  );
  
  user = this.userSource.asObservable();

  constructor() { 
  }
  saveUser(data:any){
    //Set User
    this.clearUser();
    let tempSource = this.userSource.getValue();
    tempSource = data.user;
    tempSource.isLogged = true;
    tempSource.token = JSON.parse(data.token).access_token;
    this.userSource.next(tempSource);

    //Register User to local storage
    localStorage.setItem('_jad_user',JSON.stringify(this.userSource.getValue()));
  }
  loadUser(data:any){
    if(localStorage.getItem('_jad_user')){
      this.userSource.next(JSON.parse(localStorage.getItem('_jad_user')));
    }
  }
  clearUser(){    
    this.userSource.next({'isLogged': false, 'fullname': null, 'id':null,'UserName':null, 'token':null });
  }
  clearStoredUser(){
    localStorage.removeItem('_jad_user');
  }
  /* Getters */
  getUser(): UserModel{
    return this.userSource.getValue();
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
  setLogged(isLogged:boolean){
    let tempSrc = this.userSource.getValue();
    tempSrc.isLogged = isLogged;
    this.userSource.next(tempSrc);
  }
  setFullname(fullname:string){
    let tempSrc = this.userSource.getValue();
    tempSrc.fullname = fullname;
    this.userSource.next(tempSrc);
  }
  setToken(token:string){
    let tempSrc = this.userSource.getValue();
    tempSrc.token = token;
    this.userSource.next(tempSrc);
  }
  setUsername(username:string){
    let tempSrc = this.userSource.getValue();
    tempSrc.UserName = username;
    this.userSource.next(tempSrc);
  }
  setId(id:string){
    let tempSrc = this.userSource.getValue();
    tempSrc.id = id;
    this.userSource.next(tempSrc);
  }
  /* end Setters */

}
