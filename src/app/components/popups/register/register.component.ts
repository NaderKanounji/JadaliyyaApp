import { Component,OnInit , NgModule } from '@angular/core';
 import { HttpClient, HttpHeaders, HttpRequest, HttpEventType, HttpResponse } from '@angular/common/http';
//import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms'

import { SharedService } from '../../../services/shared.service';
import { FunctionsService } from '../../../services/functions.service';
import { UserService } from '../../../services/user.service';

import { _globals } from '../../../includes/globals';
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
  agreementUpload:{
    progress:number;
    name:string;
    delete_url:string;
    status:string;
  }
  constructor(private http:HttpClient, private user:UserService, private myFunctions:FunctionsService, private sharedService:SharedService, private membership: MembershipService) { 

    this.agreementUpload = {
      progress: 0,
      name:'',
      delete_url:'',
      status:'empty'
    }
  }

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
      let myUser:UserModel = {isLogged: false, user:regdata.user, token: regdata.token, writer:regdata.writer, follows: null};

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

  agreement_upload(event){
    let fileList: FileList = event.target.files;
    if(fileList.length > 0) {
        let file: File = fileList[0];
        let formData:FormData = new FormData();
        formData.append("uploadFile", file, file.name);
        
        let headers = new HttpHeaders().set('Accept', 'application/json');
     
            const req = new HttpRequest('POST', _globals.BASE_API_URL + 'Upload/UploadHandler.ashx?fieldName=images&imagesPathController=ArticleWriter&hasCaption=False&hasDescription=False&hasCheckbox=False', formData, {
              reportProgress: true,
              headers:headers
            });
            this.http.request(req).subscribe(event => {
              this.agreementUpload.name = file.name;
              this.agreementUpload.status = 'uploading';
              if (event.type === HttpEventType.UploadProgress) {
                const percentDone = Math.round(100 * event.loaded / event.total);
                this.agreementUpload.progress = percentDone;
              } else if (event instanceof HttpResponse) {
                this.agreementUpload.status = 'done';
                this.agreementUpload.delete_url = event.body["delete_url"];
               
                console.log(event);
              }
            }, (err:any) => {
              console.log('upload error : ');
              console.log(err);
              console.log(err.error);

            });
    }
  }
}
