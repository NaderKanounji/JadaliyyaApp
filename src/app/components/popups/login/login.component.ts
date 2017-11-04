import { Component, OnInit, NgZone } from '@angular/core';
// import { FormGroup, FormControl } from '@angular/forms'
import { FacebookService, InitParams, LoginResponse } from 'ngx-facebook';

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
  writerLoginForm:LoginForm;
  isSubmitted:boolean = false;
  formErrors:string[] = [];
  socialFormErrors:string[] = [];

  constructor(private _ngZone:NgZone, private fb:FacebookService, private myFunctions:FunctionsService ,private user:UserService, private membership:MembershipService) { 
    this.myFunctions.load_google_api();
    let initParams: InitParams = {
      appId: _globals.FACEBOOK_APP_ID,
      xfbml: true,
      version: 'v2.8'
    };
    fb.init(initParams);

    window['LoginComponent'] = {component: this, zone: _ngZone};
  }

  ngOnInit() {
   //AppGlobals.GOOGLE_CLIENT_ID = _globals.GOOGLE_SECRET_CLIENT_ID;
   // this.myFunctions.load_google_api();
    this.loginForm = {
      username:'',
      password:'',
      grant_type:'password'
    };
    this.writerLoginForm = {
      username:'',
      password:'',
      grant_type:'password'
    };
  }

  login(e:any, loginForm:LoginForm, asWriter:boolean){
    this.isSubmitted = true;
    this.formErrors = [];
    loginForm.grant_type = 'password';
    this.membership.login(e, loginForm).subscribe((data:any) => {
      let myUser:UserModel = {isLogged: false, user:null, token: data, writer:null, follows: null};
      this.user.setToken(data);
      this.membership.GetUserInfo(asWriter).subscribe((res:any) => {
        myUser.user = res.user;
        myUser.follows = res.follows;
        myUser.writer = res.writer;
        this.user.saveUser(myUser);
        this.loginForm = {
          username:'',
          password:'',
          grant_type:'password'
        };
        this.writerLoginForm = {
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
      this.formErrors.push(err.error.error_description);
      //console.error(err);
    });
  }

  loginWithFacebook(): void {
    this.socialFormErrors= [];
       this.fb.login()
         .then((response: LoginResponse) => {
          this.membership.FacebookExternalLogin(response.authResponse.userID, response.authResponse.accessToken).subscribe((data:any) =>{
            let myUser:UserModel = {isLogged: false, user:data.user, token: JSON.parse(data.token), writer:null, follows: null};
            //this.user.setToken(data);
            //console.log(data);
            
            //this.membership.GetUserInfo().subscribe((res:any) => {
              //myUser.user = data.user;
              //myUser.follows = res.follows;
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
            //},(err) => {
            //   this.isSubmitted = false;
            //   if(err.error.message){
            //     this.socialFormErrors.push(err.error.message);
            //   }else{
            //     if(err.error){
            //       this.socialFormErrors.push(err.error);
            //     }
            //   }
            // });
            
          });
         })
         .catch((error: any) => {
          console.error(error);
          this.fb.logout();
         });
    
  }
  GoogleExternalLogin2(googleUser){
    this.socialFormErrors= [];
      var profile = googleUser.getBasicProfile();
    //console.log(profile.getId());
    
      this.membership.GoogleExternalLogin(profile.getId(), profile.getName(), profile.getEmail()).subscribe((data:any) =>{
        let myUser:UserModel = {isLogged: false, user:data.user, token: JSON.parse(data.token), writer:null, follows: null};
        //this.user.setToken(data);
        // this.membership.GetUserInfo().subscribe((res:any) => {
          // myUser.user = res.user;
          // myUser.follows = res.follows;
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
        // },(err) => {
        //   this.isSubmitted = false;
        //   if(err.error.message){
        //     this.socialFormErrors.push(err.error.message);
        //   }else{
        //     if(err.error){
        //       this.socialFormErrors.push(err.error);
        //     }
        //   }
        // });
        
      });
      
    // this._googleAuth.authenticateUser((userDetails)=>{
    //   console.log('trueee');
    //   console.log(userDetails);
      
    //   //YOUR_CODE_HERE 
    //   // console.log(userDetails.getAuthResponse().id_token);
    //  // console.log(profile);
      
    // });
  }
}

