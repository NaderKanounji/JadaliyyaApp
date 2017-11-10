import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { SharedService } from '../../services/shared.service';
import { FunctionsService } from '../../services/functions.service';

import { _globals } from '../../includes/globals';
import { ContactInfoModel, SharedModel, ContactFormModel } from '../../includes/Models';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  contactInfo:ContactInfoModel;
  sharedModel:SharedModel;
  contactForm:ContactFormModel;

  isSubmitted:boolean = false;
  formErrors:string[] = [];

  constructor(private http:HttpClient, private sharedService:SharedService, private myFunctions:FunctionsService) { 
    this.contactForm = {
      email:null,
      countryId:null,
      fullName:null,
      inquiryType:null,
      identifies:null,
      message:null,
      phone:null,
      profession:null
    }

  }


  
  ngOnInit() {
    this.sharedService.set_currentRoute("contact-us");
    this.sharedService.set_headerType("header-secondary");
    this.sharedService.set_categoryTitle("Contact Us");

    this.sharedService.sharedModel.subscribe(sharedModel => this.sharedModel = sharedModel);
    //this.myFunctions.load_google_map_api();
    this.http.get(_globals.API_URL + 'Data/GetContactUs').subscribe((data:any) => {
      this.contactInfo = data;
      setTimeout(() => {
        this.myFunctions.contact_us_map_init();
      }, 300);
    });
  }

  submit_contact(e, form:ContactFormModel){
    this.isSubmitted = true;
    this.formErrors = [];
    const headers = new HttpHeaders().set("Content-Type", "application/json");
    this.http.post(_globals.API_URL + 'Data/SubmitContact', JSON.stringify(form), {headers}).subscribe((data) => {
      this.sharedService.set_messagePopup("Thank you!<br/>Your inquiry has been submitted.");
      this.myFunctions.psy_open_popup('popup-message');
      this.isSubmitted = false;
    }, (err:any) => {
      this.isSubmitted = false;
      this.formErrors.push(err.error.message);
    });
  }
}
