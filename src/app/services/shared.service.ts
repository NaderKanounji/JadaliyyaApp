import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class SharedService {

  private messageSource = new BehaviorSubject<SharedModel>(
    {"currentRoute": "home", "categoryTitle":"", "isGoogleApiLoaded" : false, "socialMedia" : []}
  );
  sharedModel = this.messageSource.asObservable();

  constructor() { }

  set_shared_model(sharedModel:SharedModel){
    this.messageSource.next(sharedModel);
  }
  //----- Setters
  set_currentRoute(myCurrentRoute:string){
    let tempModel = this.messageSource.getValue();
    tempModel.currentRoute = myCurrentRoute;
    this.messageSource.next(tempModel);
  }
  set_categoryTitle(myCategoryTitle:string){
    let tempModel = this.messageSource.getValue();
    tempModel.categoryTitle = myCategoryTitle;
    this.messageSource.next(tempModel);
  }
  set_isGoogleApiLoaded(myIsGoogleApiLoaded:boolean){
    let tempModel = this.messageSource.getValue();
    tempModel.isGoogleApiLoaded = myIsGoogleApiLoaded;
    this.messageSource.next(tempModel);
  }
  set_socialMedia(mySocialMedia:SocialMedia[]){
    let tempModel = this.messageSource.getValue();
    tempModel.socialMedia = mySocialMedia;
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

interface SharedModel{
  currentRoute:string;
  categoryTitle:string;
  isGoogleApiLoaded:boolean;
  socialMedia:SocialMedia[];
}
interface SocialMedia{
  title:string;
  link:string;
}