import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { SharedService } from '../../services/shared.service';
import { FunctionsService } from '../../services/functions.service';
import { MembershipService } from '../../services/membership.service';
import { UserService } from '../../services/user.service';

import { _globals } from '../../includes/globals';
import { SharedModel,  ProfileModel, UserModel, PasswordModel } from '../../includes/Models';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  sharedModel:SharedModel;
  formErrors:string[];
  passwordFormErrors:string[];
  profileModel:ProfileModel;
  passwordModel:PasswordModel;

  formSubmitted:boolean = false;
  passwordSubmitted:boolean = false;

  constructor(private userService:UserService,private membership: MembershipService, private myFunctions:FunctionsService, private http:HttpClient, private sharedService: SharedService) {
    let tempUser:UserModel = this.userService.getUser();
    
    this.profileModel = {
      id:null,
      fullname:tempUser.user.fullname,
      countryId:null,
      identifies:null,
      UserName:tempUser.user.UserName,
      password:null,
      year:null,
      ConfirmPassword:null
    };
    this.passwordModel={
      NewPassword:null,
      OldPassword:null,
      ConfirmNewPassword:null
    };
  }

  ngOnInit() {
    
    this.sharedService.sharedModel.subscribe((sharedModel:any) => this.sharedModel = sharedModel);

    this.sharedService.set_currentRoute("edit-account");
    this.sharedService.set_headerType("header-secondary");
    this.sharedService.set_categoryTitle("My Account");

    this.membership.GetDetailedProfile().subscribe((data:any) => {
      this.profileModel = data.user;
      
    });

  }

  edit_profile(e, profileModel:ProfileModel){
    e.preventDefault();
    this.formErrors = [];
    this.passwordFormErrors = [];
    this.formSubmitted = true;
    if(profileModel.password && profileModel.password != '' && profileModel.password && profileModel.password != ''){
      let isValid = true;
      if(profileModel.password !== profileModel.ConfirmPassword){
        isValid = false;
        this.formErrors.push('Password and confirm password do not match');
      }
      if(profileModel.password.length < 6){
        isValid = false;
        this.formErrors.push('Password must contain at least 6 characters');
      }
      if(isValid){
        this.passwordModel.NewPassword = profileModel.password;
        this.passwordModel.ConfirmNewPassword = profileModel.ConfirmPassword;
        this.myFunctions.psy_open_popup('popup-old-password');
      }else{
        this.formSubmitted = false;
      }
      
    }else{
      this.submit_profile(profileModel, false);
    }
    
  }

  submit_profile(profileModel:ProfileModel, passUpdated:boolean){
    this.membership.UpdateProfile(profileModel).subscribe((data:any) => {
      console.log(data);
      
      this.formSubmitted = false;
      if(passUpdated){
        this.sharedService.set_messagePopup('Your profile & password have been successfully updated');
      }else{
        this.sharedService.set_messagePopup('Your profile has been successfully updated');
      }
      this.myFunctions.psy_open_popup('popup-message');
    }, (err:any) => {
      //console.log(err.error);
      if(err.error.message){
        this.formErrors.push(err.error.message);
      }else{
        if(err.error){
          this.formErrors.push(err.error);
        }
      }
      this.formSubmitted = false;
    });
  }
  submit_password(e, passwordModel:PasswordModel){
    e.preventDefault();
    this.passwordSubmitted = true;
    this.passwordFormErrors = [];
    this.passwordModel.OldPassword = passwordModel.OldPassword;
    this.membership.UpdatePassword(this.passwordModel).subscribe((passData:any) => {
      this.passwordSubmitted = false;
      this.myFunctions.close_popup();
      this.submit_profile(this.profileModel, true);

    }, (err:any) => {
      if(err.error.message){
        this.passwordFormErrors.push(err.error.message);
      }else{
        if(err.error){
          this.passwordFormErrors.push(err.error);
        }
      }
      this.formSubmitted = false;
      this.passwordSubmitted = false;
    });
  }

}
