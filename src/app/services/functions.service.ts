import { Injectable } from '@angular/core';

import { myFunctions } from './../../assets/js/functions.js';

import {SharedService} from './shared.service';

@Injectable()
export class FunctionsService {
  isGoogleMapLoaded:boolean = false;
  isGoogleApiLoaded:boolean = false;
  constructor(private sharedService:SharedService) { 
    
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
search_open_close(){
  myFunctions.search_open_close();
}
open_search(){
  myFunctions.open_search();
}
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
  DestroyAndClearCarousel(){
    myFunctions.DestroyAndClearCarousel();
  }
  googleTagsAnalyticsCall(){
    myFunctions.googleTagsAnalyticsCall();
  }
  details_slider(){
    myFunctions.details_slider();
  }
  load_jadNavigation_map(){
    myFunctions.load_jadNavigation_map();
  }
  psy_toggle_class(id:string, className:string, add:boolean){
    myFunctions.psy_toggle_class(id, className, add);
  }
  header_bindings(){
    myFunctions.nav_bindings();
  }
  verticalScroll(){
    myFunctions.verticalScroll();
  }
  contact_us_map_init(){
    myFunctions.contact_us_map_init();
  }
  sticky_sidebar_binding(){
    myFunctions.sticky_sidebar_binding();
  }
  slider_player(){
    myFunctions.slider_player();
  }
  svg_map_init(){
    myFunctions.svg_map_init();
  }
  more_stories_widget(){
    myFunctions.more_stories_widget();
  }
  load_status_widget(){
    myFunctions.load_status_widget();
  }
  fullsize_bg(){
    myFunctions.fullsize_bg();
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
  get_popup_dropdown_selected(){
    return myFunctions.get_popup_dropdown_selected();
  }
  get_selected_folders(){
    return myFunctions.get_selected_folders();
  }
  get_selected_articles(){
    return myFunctions.get_selected_articles();
  }
  get_selected_articles_in_folders(){
    return myFunctions.get_selected_articles_in_folders();
  }
  get_shared_folders_by_ids(){
    return myFunctions.get_shared_folders_by_ids();
  }
  get_shared_articles_by_ids(){
    return myFunctions.get_shared_articles_by_ids();
  }
  get_shared_selected_articles(){
    return myFunctions.get_shared_selected_articles();
  }
  accordion_init(){
    myFunctions.accordion_init();
  }
  load_google_api(){
    if(!this.isGoogleApiLoaded){
      (function() {
        var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
        po.src = 'https://apis.google.com/js/platform.js?onload=resetGoogleCounter';
        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
      })();
    }
  }
  load_google_tags_analytics(){
      (function() {
        var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
        po.src = 'https://www.googletagmanager.com/gtag/js?id=UA-1090937-59';
        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
      })();
      myFunctions.googleTagsAnalyticsCall();
  }
  load_google_map_api(){
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
  back_to_top(speed:number){
      myFunctions.back_to_top(speed);
  }
  animate_to_element(id:string, offset:number, speed:number){
      myFunctions.animate_to_element(id, offset, speed);
  }
  get_interest(id:string){
    return myFunctions.get_interest(id);
  }
  clear_interest(id:string){
    myFunctions.clear_interest(id);
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
