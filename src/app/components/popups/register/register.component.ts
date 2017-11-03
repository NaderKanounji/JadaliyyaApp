import { Component,OnInit , NgModule } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
//import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms'

import { SharedService } from '../../../services/shared.service';
import { FunctionsService } from '../../../services/functions.service';
import { UserService } from '../../../services/user.service';

// import { _globals } from '../../../includes/globals';
import { RegisterForm, LoginForm, SharedModel, UserModel } from '../../../includes/Models';

import {MembershipService} from '../../../services/membership.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent  implements OnInit{

  registerForm:RegisterForm;
  sharedModel:SharedModel;
  isSubmitted:boolean = false;
  formErrors:string[] = [];
  constructor(private user:UserService, private myFunctions:FunctionsService, private sharedService:SharedService, private membership: MembershipService) { }

  ngOnInit(){

    this.sharedService.sharedModel.subscribe(sharedModel => this.sharedModel = sharedModel);

  } 

  register(e:any, registerForm:RegisterForm){
    this.isSubmitted = true;
      this.formErrors = [];
      if(registerForm.bio != ''){
        registerForm.isWriter = true;
      }
      this.membership.register(e, registerForm).subscribe((regdata:any) => {
        //this.user.setUser()
        //console.log(regdata);
      let myUser:UserModel = {isLogged: false, user:regdata.user, token: regdata.token, follows: null};

        this.user.saveUser(myUser);
        this.registerForm = {
          fullName:'',
          identifies:null,
          UserName:'',
          year:'',
          countryId:null,
          password:'',
          ConfirmPassword:'',
          bio:'',
          facebook:'',
          twitter:'',
          linkedin:'',
          image:'',
          isWriter:false,
          signedAgreement:'',
          website:''
        };
        setTimeout(() =>{
            this.myFunctions.dropdown_event();
            this.myFunctions.psy_open_popup('thank-you-register');
        },200);
        this.isSubmitted = false;
       // let loginForm:LoginForm = {username : registerForm.UserName,password : registerForm.password, grant_type:"password" } ;
        // this.membership.login(e, loginForm).subscribe((data:any) => {
        //   myUser.token = data.token;
        //   this.user.saveUser(myUser);
        //   this.registerForm = {
        //     fullName:'',
        //     identifies:null,
        //     UserName:'',
        //     year:'',
        //     countryId:null,
        //     password:'',
        //     ConfirmPassword:''
        //   };
        //   setTimeout(() =>{
        //       this.myFunctions.dropdown_event();
        //       this.myFunctions.psy_open_popup('thank-you-register');
        //   },200);
        //   this.isSubmitted = false;
        // });
        
      },(err) => {
        this.isSubmitted = false;
        this.formErrors.push(err.error.message);
        //console.error(err);
      });
  }
}
