import { Injectable } from '@angular/core';

import { myFunctions } from './../../assets/js/functions.js';

@Injectable()
export class FunctionsService {
  constructor() { 
    
  }
//Main Block calls
  load_all_pages(){ //All
    myFunctions.load_all_pages();
  }
  load_home_page(){ //HOME
    myFunctions.load_home_page();
  }
  load_details_page(){ //DETAILS
    //console.log("load_details_page");
    myFunctions.load_details_page();
    myFunctions.load_fb_comments();
  }
  load_init_category_page(){ //Category
    myFunctions.load_init_category_page();
  }
  //-----------
  
  load_home_roundups_section(){ //Category
    myFunctions.load_home_roundups_section();
  }
  homeSidebar(){
    myFunctions.homeSidebar();
  }
  load_category_hot_section(){ //Category
    myFunctions.load_category_hot_section();
  }
  new_content_formatting(){
    myFunctions.new_content_formatting();
  }
//end Main Block calls

  is_dom_in_view(el:string, offset:number): boolean{
    return myFunctions.is_dom_in_view(el, offset);
  }
  openSubMenu(){
    myFunctions.openSubMenu();
  }
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

    load_google_api(){
      (function() {
        var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
        po.src = 'https://apis.google.com/js/platform.js';
        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
      })();
    }
    back_to_top(speed:number){
        myFunctions.back_to_top(speed);
    }
    animate_to_element(id:string, offset:number, speed:number){
        myFunctions.animate_to_element(id, offset, speed);
    }
}
