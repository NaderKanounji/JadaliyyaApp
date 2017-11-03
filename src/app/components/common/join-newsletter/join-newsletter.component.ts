import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import { FunctionsService } from '../../../services/functions.service'; 
import { SharedService } from '../../../services/shared.service'; 
import { NewsletterModel } from '../../../includes/Models'; 
import { _globals } from '../../../includes/globals'; 

@Component({
  selector: 'app-join-newsletter',
  templateUrl: './join-newsletter.component.html',
  styleUrls: ['./join-newsletter.component.css']
})
export class JoinNewsletterComponent {

  submitted:boolean = false;
  newsletterForm:NewsletterModel;
HttpHeaders
  
  constructor(private http:HttpClient, private myFunctions:FunctionsService, private sharedService:SharedService) {
    this.newsletterForm = {
      email:''
    }
   }


  join(e, newsletterForm: NewsletterModel){
    e.stopPropagation();
    e.preventDefault();
    //console.log(newsletterForm);
    
    this.submitted = true;
  const headers = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.post(_globals.API_URL + 'Data/JoinNewsletter' , JSON.stringify(newsletterForm), {headers}).subscribe((data:any) => {
      
      if(data.status != 200){
        this.sharedService.set_messagePopup(data.message);
        this.myFunctions.psy_open_popup('popup-message');
      }else{
        this.sharedService.set_messagePopup('You have successfully joined Jadaliyya newsletter');
        this.myFunctions.psy_open_popup('popup-message');
        this.newsletterForm.email = '';
      }
      this.submitted = false;
    }, (err) => {
      //console.log(err);
      
      if(err.error.message){
        this.sharedService.set_messagePopup(err.error.message);
      }else{
        this.sharedService.set_messagePopup(err.error);
      }
      this.myFunctions.psy_open_popup('popup-message');
      this.submitted = false;
    });
  }
  
  //get diagnostic() { return JSON.stringify(this.model); }
}


// export class newsletter{
//   constructor(
//     public email:string
//   ){}
// }