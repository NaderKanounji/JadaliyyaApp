import { Injectable } from '@angular/core';

import { myFunctions } from './../../assets/js/functions.js';

@Injectable()
export class FunctionsService {
  isGoogleMapLoaded:boolean = false;
  constructor() { 
    
  }
//Main Block calls
reset_page_state(){
  myFunctions.reset_page_state();
}
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
  load_init_jadNavigation_page(){ //Category
    myFunctions.load_init_jadNavigation_page();
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
close_popup(){
  myFunctions.close_popup();
}
psy_popup(){
  myFunctions.psy_popup();
}
append_form_message(id:string){
  myFunctions.append_form_message(id);
}
display_form_message(id:string){
  myFunctions.display_form_message(id);
}
psy_open_popup(id:string){
  myFunctions.psy_open_popup(id);
}
dropdown_event(){
  myFunctions.dropdown_event();
}
country_sidebar(){
    myFunctions.country_sidebar();
  }
  is_dom_in_view(el:string, offset:number): boolean{
    return myFunctions.is_dom_in_view(el, offset);
  }
  openSubMenu(){
    myFunctions.openSubMenu();
  }
  closeInterested(){
    myFunctions.closeInterested();
  }
  load_fb_comments(){
    myFunctions.load_fb_comments();
  }
  load_slideshow(){
    myFunctions.load_slideshow();
  }
  load_jadNavigation_map(){
    myFunctions.load_jadNavigation_map();
  }
  header_bindings(){
    myFunctions.nav_bindings();
  }
  sticky_sidebar_binding(){
    myFunctions.sticky_sidebar_binding();
  }
  svg_map_init(){
    myFunctions.svg_map_init();
  }
  more_stories_widget(){
    myFunctions.more_stories_widget();
  }
  tags_widget_init(){
    myFunctions.tags_widget_init();
  }
  open_popupDropdown(){
    myFunctions.open_popupDropdown();
  }
  close_popupDropdown(){
    myFunctions.close_popupDropdown();
  }
  load_google_api(){
    (function() {
      var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
      po.src = 'https://apis.google.com/js/platform.js';
      var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
    })();
  }
  load_google_map_api(){
    if(!this.isGoogleMapLoaded){
      this.isGoogleMapLoaded =true;
      (function() {
        var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
        po.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAAzN3gVnJqU5kpoYxmI8ER1s-MBn1D3kM';
        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
      })();
    }
  }
  back_to_top(speed:number){
      myFunctions.back_to_top(speed);
  }
  animate_to_element(id:string, offset:number, speed:number){
      myFunctions.animate_to_element(id, offset, speed);
  }
  // history_back(lastUrl:string){
  //  // let lastUrl = document.referrer;
  //   //Checks if last visited url belongs to this domain
  //   // if(lastUrl != "" && lastUrl.indexOf(document.getElementsByTagName('base')[0].href)){
  //   //     window.history.back();
  //   // }
  //   // return false;
  //   window.history.back();
  // }
}
