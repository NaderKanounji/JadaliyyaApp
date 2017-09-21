import { Injectable } from '@angular/core';

import { myFunctions } from './../../assets/js/functions.js';

@Injectable()
export class FunctionsService {
  constructor() { 
    
  }
//Main Block calls
  load_home_page(){ //HOME
    myFunctions.load_home_page();
  }
  load_details_page(){ //DETAILS
    myFunctions.load_details_page();
  }
//end Main Block calls

load_fb_comments(){
  myFunctions.load_fb_comments();
}
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
