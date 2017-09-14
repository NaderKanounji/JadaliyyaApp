import { Injectable } from '@angular/core';

import { myFunctions } from './../../assets/js/functions.js';

@Injectable()
export class FunctionsService {
  constructor() { 
    
  }
//Main Block calls
  load_home_page(){ //HOME
    myFunctions.nav_bindings();
    myFunctions.load_home_main_slider();
    myFunctions.sticky_sidebar_binding();
  }
  load_details_page(){ //DETAILS
    myFunctions.nav_bindings();
    myFunctions.sticky_sidebar_binding();
  }
//end Main Block calls


 load_home_main_slider(){
    myFunctions.load_home_main_slider();
  }
  header_bindings(){
    myFunctions.nav_bindings();
  }
  sticky_sidebar_binding(){
    myFunctions.sticky_sidebar_binding();
  }

}
