import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { SharedService } from '../../../services/shared.service';
import { FunctionsService } from '../../../services/functions.service';

import { _globals } from '../../../includes/globals';
import { ContactInfoModel, SharedModel, NewsletterFormModel, IntStringModel } from '../../../includes/Models';
@Component({
  selector: 'app-detailed-newsletter',
  templateUrl: './detailed-newsletter.component.html',
  styleUrls: ['./detailed-newsletter.component.css']
})
export class DetailedNewsletterComponent implements OnInit {

  sharedModel:SharedModel;
  newsletterForm:NewsletterFormModel;
  interestList:IntStringModel[];
  
    isSubmitted:boolean = false;
    formErrors:string[] = [];
  
    constructor(private http:HttpClient, private sharedService:SharedService, private myFunctions:FunctionsService) { 
      this.newsletterForm = {
        email:null,
        countryId:null,
        name:null,
        profession:null,
        phone:null
      }
  
    }
  ngOnInit() {
    this.sharedService.sharedModel.subscribe(sharedModel => this.sharedModel = sharedModel);
    this.http.get(_globals.API_URL + 'Data/GetTags').subscribe((data:any) => {
      this.interestList = data;
    });
  }
  submit_form(e, form:NewsletterFormModel){
    e.preventDefault();
    this.isSubmitted = true;
    this.formErrors = [];
    let interests = this.myFunctions.get_interest('#popup-detailed-newsletter');
    const headers = new HttpHeaders().set("Content-Type", "application/json");
    this.http.post(_globals.API_URL + 'Data/JoinDetailedNewsletter?updateIt=true&interest=' + interests, JSON.stringify(form), {headers}).subscribe((data) => {
      this.sharedService.set_messagePopup("Thank you!<br/>You have joined our newsletter.");
      this.myFunctions.psy_open_popup('popup-message');
      let interests = this.myFunctions.clear_interest('#popup-detailed-newsletter');
      this.isSubmitted = false;
    }, (err:any) => {
      this.isSubmitted = false;
      this.formErrors.push(err.error.message);
    });
  }
}
