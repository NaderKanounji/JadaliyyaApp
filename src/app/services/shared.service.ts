import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { SharedModel, SocialMedia,SharedCountryModel, Country, Category, FormsData } from '../includes/Models';

@Injectable()
export class SharedService {

  private messageSource = new BehaviorSubject<SharedModel>(
    {"headerType" : "header",
    'messagePopup': '' , 
    "displayActions": false, 
    "currentRoute": "home", 
    "categoryTitle":"", 
    "categoryId" : null, 
    "isArabicSection" : false, 
    "isGoogleMapApiLoaded" : false, 
    "isGoogleApiLoaded" : false,
    "customUrlTitle":"" ,
    "socialMedia" : [], 
    "country" : null, 
    "searchCount" : null,
    "formData":{
      countries:null,
      userIdentifications:null,
      articleCountries:null,
      categories:null,
      inquiryTypes:null,
      agreement:null
    }}
  );
  sharedModel = this.messageSource.asObservable();

  constructor() { }

  set_shared_model(sharedModel:SharedModel){
    this.messageSource.next(sharedModel);
  }
  //----- Setters
  set_searchCount(searchCount:number){
    let tempModel = this.messageSource.getValue();
    tempModel.searchCount = searchCount;
    this.messageSource.next(tempModel);
  }
  set_currentRoute(myCurrentRoute:string){
    let tempModel = this.messageSource.getValue();
    tempModel.currentRoute = myCurrentRoute;
    this.messageSource.next(tempModel);
  }
  set_headerType(headerType:string){
    let tempModel = this.messageSource.getValue();
    tempModel.headerType = headerType;
    this.messageSource.next(tempModel);
  }
  set_messagePopup(messagePopup:string){
    let tempModel = this.messageSource.getValue();
    tempModel.messagePopup = messagePopup;
    this.messageSource.next(tempModel);
  }
  set_categoryTitle(myCategoryTitle:string){
    let tempModel = this.messageSource.getValue();
    tempModel.categoryTitle = myCategoryTitle;
    this.messageSource.next(tempModel);
  }
  set_categoryId(myCategoryId:number){
    let tempModel = this.messageSource.getValue();
    tempModel.categoryId = myCategoryId;
    this.messageSource.next(tempModel);
  }
  set_customUrlTitle(myCustomUrlTitle:string){
    let tempModel = this.messageSource.getValue();
    tempModel.customUrlTitle = myCustomUrlTitle;
    this.messageSource.next(tempModel);
  }
  set_isGoogleApiLoaded(myIsGoogleApiLoaded:boolean){
    let tempModel = this.messageSource.getValue();
    tempModel.isGoogleApiLoaded = myIsGoogleApiLoaded;
    this.messageSource.next(tempModel);
  }
  set_isGoogleMapApiLoaded(myIsGoogleApiLoaded:boolean){
    let tempModel = this.messageSource.getValue();
    tempModel.isGoogleMapApiLoaded = myIsGoogleApiLoaded;
    this.messageSource.next(tempModel);
  }
  set_socialMedia(mySocialMedia:SocialMedia[]){
    let tempModel = this.messageSource.getValue();
    tempModel.socialMedia = mySocialMedia;
    this.messageSource.next(tempModel);
  }
  set_displayActions(displayActions:boolean){
    let tempModel = this.messageSource.getValue();
    tempModel.displayActions = displayActions;
    this.messageSource.next(tempModel);
  }
  set_isArabicSection(isArabic:boolean){
    let tempModel = this.messageSource.getValue();
    tempModel.isArabicSection = isArabic;
    this.messageSource.next(tempModel);
  }
  set_country(myCountry:SharedCountryModel){
    let tempModel = this.messageSource.getValue();
    tempModel.country = myCountry;
    this.messageSource.next(tempModel);
  }
  set_formData(formData:FormsData){
    let tempModel = this.messageSource.getValue();
    tempModel.formData = formData;
    this.messageSource.next(tempModel);
  }
  //----- \Setters

  alter_wrapper_classes(className:string) {
    let el = document.getElementById('main-wrapper');
    if(el) {
      el.classList.remove('wrapper-secondary');
      if(className != undefined && className != ''){
        el.classList.add(className);
      }
    }
  }


}
