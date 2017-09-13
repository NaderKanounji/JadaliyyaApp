import { Injectable } from '@angular/core';

import { myFunctions } from './../../assets/js/functions.js';

@Injectable()
export class FunctionsService {
  constructor() { 
    
  }

  sticky_sidebar_binding(){
    myFunctions.sticky_sidebar_binding();
  }
}
