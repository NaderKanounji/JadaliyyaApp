import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpEventType, HttpResponse } from '@angular/common/http';

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
  tempUser:UserModel;

  imageUpload:{
    progress:number;
    thumbnail:string;
    delete_url:string;
    status:string;
    name:string;
  }
  constructor(private userService:UserService,private membership: MembershipService, private myFunctions:FunctionsService, private http:HttpClient, private sharedService: SharedService) {
    this.tempUser = this.userService.getUser();
    
    
    this.profileModel = {
      id:null,
      fullname:this.tempUser.user.fullname,
      countryId:null,
      identifies:null,
      UserName:this.tempUser.user.UserName,
      password:null,
      year:null,
      ConfirmPassword:null,
      bio:null,
      facebook:null,
      image:null,
      isWriter:false,
      linkedin:null,
      twitter:null,
      website:null
    };
    this.passwordModel={
      NewPassword:null,
      OldPassword:null,
      ConfirmNewPassword:null
    };
    this.imageUpload = {
      progress: 0,
      thumbnail:'',
      delete_url:'',
      status:'empty',
      name:null
    }
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
    if(!profileModel.isWriter && profileModel.password && profileModel.password != '' && profileModel.password && profileModel.password != ''){
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

  image_upload(event){
    if(this.imageUpload.delete_url && this.imageUpload.delete_url != ''){
      this.http.delete(this.imageUpload.delete_url);
    }
    let fileList: FileList = event.target.files;
    if(fileList.length > 0) {
        let file: File = fileList[0];
        let formData:FormData = new FormData();
        formData.append("uploadFile", file, file.name);
        
        let headers = new HttpHeaders().set('Accept', 'application/json');
     
            const req = new HttpRequest('POST', _globals.API_URL + 'Upload/UploadFiles?inputName=writerImage&directory=ArticleWriter&hasCaption=False&hasDescription=False&hasCheckbox=False&maxNumberOfFiles=1', formData, {
              reportProgress: true,
              headers:headers
            });
            this.http.request(req).subscribe(event => {
              //this.agreementUpload.name = file.name;
              this.imageUpload.status = 'uploading';
              if (event.type === HttpEventType.UploadProgress) {
                const percentDone = Math.round(100 * event.loaded / event.total);
                this.imageUpload.progress = percentDone;
              } else if (event instanceof HttpResponse) {
                // console.log(event.body[0]);
                this.imageUpload.status = 'done';
                this.imageUpload.delete_url = event.body[0]["delete_url"];
                // this.imageUpload.thumbnail = _globals.CONTENT_PATH + 'ArticleWriter/' +  event.body[0]["name"];
                this.imageUpload.thumbnail = _globals.RESIZED_CONTENT_PATH + '142x142xo/' +  event.body[0]["name"];
                this.imageUpload.name = event.body[0]["name"];
               
                console.log(event);
              }
            }, (err:any) => {
              // console.log('upload error : ');
              // console.log(err);
              // console.log(err.error);

            });
    }
  }

}
