import { Injectable } from '@angular/core';

@Injectable()
export class SharedService {

  constructor() { }

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
