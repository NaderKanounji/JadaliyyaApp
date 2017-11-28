import { Injectable } from '@angular/core';

//import { myFunctions } from './../../assets/js/functions.js';

import { myFunctions } from './../../assets/js/functions.js';
//import { isBrowser } from 'angular2-universal';

import {SharedService} from './shared.service';

@Injectable()
export class FunctionsService {
  isGoogleMapLoaded:boolean = false;
  isGoogleApiLoaded:boolean = false;
  //myFunction:any;
  constructor(private sharedService:SharedService) { 
    //  try{
    //   // myFunctions = module.require('./../../assets/js/functions.js');
    //   myFunctions = myFunctions;
    //  }catch(e){
       
    //  }
    //myFunctions = myFunctions;
  }
//Main Block calls
reset_page_state(){
  if(myFunctions){
    myFunctions.reset_page_state();
  }
}
  load_all_pages(){ //All
    if(myFunctions){
    myFunctions.load_all_pages();
    }
  }
  load_home_page(){ //HOME
    if(myFunctions){
    myFunctions.load_home_page();
    }
  }
  load_details_page(){ //DETAILS
    if(myFunctions){
    //console.log("load_details_page");
    myFunctions.load_details_page();
    myFunctions.load_fb_comments();
    }
  }
  load_init_category_page(){ //Category
    if(myFunctions){
    myFunctions.load_init_category_page();
    }
  }
  load_init_jadNavigation_page(){ //Category
    if(myFunctions){
    myFunctions.load_init_jadNavigation_page();
    }
  }
  //-----------
  
  load_home_roundups_section(){ //Category
    if(myFunctions){
    myFunctions.load_home_roundups_section();
    }
  }
  homeSidebar(){
    if(myFunctions){
    myFunctions.homeSidebar();
    }
  }
  load_category_hot_section(){ //Category
    if(myFunctions){
    myFunctions.load_category_hot_section();
    }
  }
  new_content_formatting(){
    if(myFunctions){
    myFunctions.new_content_formatting();
    }
  }
//end Main Block calls
search_open_close(){
  if(myFunctions){
  myFunctions.search_open_close();
  }
}
open_search(){
  if(myFunctions){
  myFunctions.open_search();
  }
}
close_popup(){
  if(myFunctions){
  myFunctions.close_popup();
  }
}
psy_popup(){
  if(myFunctions){
  myFunctions.psy_popup();
  }
}
append_form_message(id:string){
  if(myFunctions){
  myFunctions.append_form_message(id);
  }
}
display_form_message(id:string){
  if(myFunctions){
  myFunctions.display_form_message(id);
  }
}
psy_open_popup(id:string){
  if(myFunctions){
  myFunctions.psy_open_popup(id);
  }
}
dropdown_event(){
  if(myFunctions){
  myFunctions.dropdown_event();
  }
}
country_sidebar(){
  if(myFunctions){
  myFunctions.country_sidebar();
  }
  }
  is_dom_in_view(el:string, offset:number): boolean{
    if(myFunctions){
    return myFunctions.is_dom_in_view(el, offset);
    }
  }
  openSubMenu(){
    if(myFunctions){
    myFunctions.openSubMenu();
    }
  }
  closeInterested(){
    if(myFunctions){
    myFunctions.closeInterested();
    }
  }
  load_fb_comments(){
    if(myFunctions){
    myFunctions.load_fb_comments();
    }
  }
  load_slideshow(){
    if(myFunctions){
    myFunctions.load_slideshow();
    }
  }
  DestroyAndClearCarousel(){
    if(myFunctions){
    myFunctions.DestroyAndClearCarousel();
    }
  }
  googleTagsAnalyticsCall(){
    if(myFunctions){
    myFunctions.googleTagsAnalyticsCall();
    }
  }
  details_slider(){
    if(myFunctions){
    myFunctions.details_slider();
    }
  }
  load_jadNavigation_map(){
    if(myFunctions){
    myFunctions.load_jadNavigation_map();
    }
  }
  psy_toggle_class(id:string, className:string, add:boolean){
    if(myFunctions){
    myFunctions.psy_toggle_class(id, className, add);
    }
  }
  header_bindings(){
    if(myFunctions){
    myFunctions.nav_bindings();
    }
  }
  verticalScroll(){
    if(myFunctions){
    myFunctions.verticalScroll();
    }
  }
  contact_us_map_init(){
    if(myFunctions){
    myFunctions.contact_us_map_init();
    }
  }
  sticky_sidebar_binding(){
    if(myFunctions){
    myFunctions.sticky_sidebar_binding();
    }
  }
  slider_player(){
    if(myFunctions){
    myFunctions.slider_player();
    }
  }
  svg_map_init(){
    if(myFunctions){
    myFunctions.svg_map_init();
    }
  }
  more_stories_widget(){
    if(myFunctions){
    myFunctions.more_stories_widget();
    }
  }
  load_status_widget(){
    if(myFunctions){
    myFunctions.load_status_widget();
    }
  }
  fullsize_bg(){
    if(myFunctions){
    myFunctions.fullsize_bg();
    }
  }
  closeSearch(){
    if(myFunctions){
    myFunctions.closeSearch();
    }
  }
  tags_widget_init(){
    if(myFunctions){
    myFunctions.tags_widget_init();
    }
  }
  open_popupDropdown(){
    if(myFunctions){
    myFunctions.open_popupDropdown();
    }
  }
  close_popupDropdown(){
    if(myFunctions){
    myFunctions.close_popupDropdown();
    }
  }
  get_popup_dropdown_selected(){
    if(myFunctions){
    return myFunctions.get_popup_dropdown_selected();
  }
  }
  get_selected_folders(){
    if(myFunctions){
    return myFunctions.get_selected_folders();
    }
  }
  get_selected_articles(){
    if(myFunctions){
    return myFunctions.get_selected_articles();
    }
  }
  get_selected_articles_in_folders(){
    if(myFunctions){
    return myFunctions.get_selected_articles_in_folders();
    }
  }
  get_shared_folders_by_ids(){
    if(myFunctions){
    return myFunctions.get_shared_folders_by_ids();
    }
  }
  get_shared_articles_by_ids(){
    if(myFunctions){
    return myFunctions.get_shared_articles_by_ids();
  }
  }
  get_shared_selected_articles(){
    if(myFunctions){
    return myFunctions.get_shared_selected_articles();
  }
  }
  accordion_init(){
    if(myFunctions){
    myFunctions.accordion_init();
    }
  }
  load_google_api(){
    if(myFunctions){
    if(!this.isGoogleApiLoaded){
      (function() {
        var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
        po.src = 'https://apis.google.com/js/platform.js?onload=resetGoogleCounter';
        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
      })();
    }
  }
  }
  load_google_tags_analytics(){
    if(myFunctions){
      (function() {
        var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
        po.src = 'https://www.googletagmanager.com/gtag/js?id=UA-1090937-59';
        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
      })();
      myFunctions.googleTagsAnalyticsCall();
    }
  }
  load_google_map_api(){
    if(myFunctions){
    if(!this.isGoogleMapLoaded){
      this.isGoogleMapLoaded =true;
      this.sharedService.set_isGoogleMapApiLoaded(true);
      (function() {
        var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
        po.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAo7B-E-aB25x-JQtlh9YGNjsdcyspK7hE';
        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
      })();
    }
  }
  }
  back_to_top(speed:number){
    if(myFunctions){
    myFunctions.back_to_top(speed);
    }
  }
  animate_to_element(id:string, offset:number, speed:number){
    if(myFunctions){
    myFunctions.animate_to_element(id, offset, speed);
    }
  }
  get_interest(id:string){
    if(myFunctions){
    return myFunctions.get_interest(id);
    }
  }
  clear_interest(id:string){
    if(myFunctions){
    myFunctions.clear_interest(id);
    }
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
