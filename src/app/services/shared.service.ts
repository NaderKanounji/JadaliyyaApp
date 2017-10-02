import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class SharedService {

  private messageSource = new BehaviorSubject<SharedModel>(null);
  sharedModel = this.messageSource.asObservable();

  constructor() { }

  set_shared_model(sharedModel:SharedModel){
    this.messageSource.next(sharedModel);
  }

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
}