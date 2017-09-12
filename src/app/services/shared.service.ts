import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class SharedService {

  private messageSource = new BehaviorSubject<string>("");
  serviceHeaderStructure = this.messageSource.asObservable();
  constructor() { }

  changeHeaderStructure(newStructure:string){
    this.messageSource.next(newStructure);
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
