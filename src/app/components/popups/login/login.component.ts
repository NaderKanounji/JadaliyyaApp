import { Component, OnInit } from '@angular/core';
// import { FormGroup, FormControl } from '@angular/forms'
import { FacebookService, InitParams, LoginResponse } from 'ngx-facebook';
import { AuthService, AppGlobals } from 'angular2-google-login';

// import { SharedService } from '../../../services/shared.service';
import { FunctionsService } from '../../../services/functions.service';
import { UserService } from '../../../services/user.service';

import { LoginForm, UserModel } from '../../../includes/Models';
import { _globals } from '../../../includes/globals';
import {MembershipService} from '../../../services/membership.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:LoginForm;
  isSubmitted:boolean = false;
  formErrors:string[] = [];

  constructor(private _googleAuth:AuthService, private fb:FacebookService, private myFunctions:FunctionsService ,private user:UserService, private membership:MembershipService) { 
    let initParams: InitParams = {
      appId: _globals.FACEBOOK_APP_ID,
      xfbml: true,
      version: 'v2.8'
    };
    fb.init(initParams);
    AppGlobals.GOOGLE_CLIENT_ID = _globals.GOOGLE_SECRET_CLIENT_ID;
  }

  ngOnInit() {
    this.loginForm = {
      username:'',
      password:'',
      grant_type:'password'
    };
  }

  login(e:any, loginForm:LoginForm){
    this.isSubmitted = true;
    this.formErrors = [];
    loginForm.grant_type = 'password';
    this.membership.login(e, loginForm).subscribe((data:any) => {
      let myUser:UserModel = {isLogged: false, user:null, token: data, follows: null};
      this.user.setToken(data);
      this.membership.GetUserInfo(myUser.token).subscribe((res:any) => {
        myUser.user = res.user;
        myUser.follows = res.follows;
        this.user.saveUser(myUser);
        this.loginForm = {
          username:'',
          password:'',
          grant_type:'password'
        };
        setTimeout(() =>{
            this.myFunctions.dropdown_event();
            this.myFunctions.psy_popup();
            this.myFunctions.reset_page_state();
        },200);
        this.isSubmitted = false;
      },(err) => {
        this.isSubmitted = false;
        this.formErrors.push(err.error.message);
      });
      
    },(err) => {
      this.isSubmitted = false;
      this.formErrors.push(err.error.message);
      //console.error(err);
    });
  }

  loginWithFacebook(): void {
    
       this.fb.login()
         .then((response: LoginResponse) => {
          this.membership.FacebookExternalLogin(response.authResponse.userID, response.authResponse.accessToken).subscribe((data:any) =>{
           let loginUser:UserModel = {
             follows:data.user.follows,
             isLogged:true,
             token:{
               access_token:data.user.accessToken,
               token_type:'bearer',
               expires_in:null,
               refresh_token:null
             },
             user:{
               fullname: data.user.fullname ? data.user.fullname : data.user.firstName + ' ' + data.user.lastName,
               id:null,
               UserName:data.user.UserName
             }
           }
           this.user.saveUser(loginUser);
           setTimeout(() =>{
              this.myFunctions.dropdown_event();
              this.myFunctions.psy_popup();
              this.myFunctions.reset_page_state();
          },200);
          });
         })
         .catch((error: any) => {
          console.error(error);
          this.fb.logout();
         });
    
     }
     GoogleExternalLogin():void{

     }
}

