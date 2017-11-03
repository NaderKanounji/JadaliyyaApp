import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import { Router, NavigationStart }   from '@angular/router';

import { SharedService } from './services/shared.service';
import { UserService } from './services/user.service';
import { FunctionsService } from './services/functions.service';


import {_globals} from './includes/globals';
import {GlobalModel, Category, Country} from './includes/Models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  // styleUrls: ['./app.component.css', './../assets/style.css']
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  headerStructure:string;
  globalModel:GlobalModel = {
    headerCategories:null,
    arabicSubCategories:null,
    submenuCategories:null,
    headerCountries:null,
    submenuCountries:null,
    footerCountries:null,
    footerCategories:null,
    mobileLinks:null
  };

  constructor(private user:UserService, private router:Router, private myFunctions:FunctionsService, private sharedService:SharedService, private http:HttpClient){
    router.events.subscribe((val) => {
      if(localStorage.getItem('_jad_user') && localStorage.getItem('_jad_user') != ''){
        this.user.setUser(JSON.parse(localStorage.getItem('_jad_user')));
      }
      if (val instanceof NavigationStart) {
        //console.log('NavigationStart');    
        this.sharedService.set_categoryTitle("");
        this.sharedService.set_isArabicSection(false);
        this.sharedService.alter_wrapper_classes('');
        this.sharedService.set_country(null);
        this.sharedService.set_categoryId(null);
        this.sharedService.set_customUrlTitle('');
        this.sharedService.set_displayActions(false);

        this.myFunctions.reset_page_state();
        this.myFunctions.load_all_pages();
      }
      
      
    });
  }
  

  ngOnInit(){
      //this.sharedService.set_shared_model.subscribe(sharedHeaderStructure => this.headerStructure = sharedHeaderStructure);
      //console.log(this.headerStructure);
      this.http.get(_globals.API_URL + 'Data/GetGlobalData').subscribe((data:any) => {
        this.sharedService.set_socialMedia(data['socialMedia']);
        this.sharedService.set_formData(data.formData);
        this.globalModel.headerCategories = data.categories.filter(d => d.isOnMenu == true && d.id != _globals.ARABIC_SECTION_ID && d.id != _globals.ARABIAN_PENINSULA).slice(0, 10);
        this.globalModel.submenuCategories = data.categories.filter(d => d.isOnMenu == true && d.id != _globals.ARABIC_SECTION_ID).slice(10);
      
        this.globalModel.submenuCategories = this.globalModel.submenuCategories.concat(data.categories.filter(d => !d.isOnMenu == true && d.id != _globals.ARABIC_SECTION_ID));
        this.globalModel.arabicSubCategories = data.subcategories;

        this.globalModel.headerCountries = data.countries.slice(0, 2).concat(data.categories.filter(d => d.id == _globals.ARABIAN_PENINSULA)).concat(data.countries.slice(2, 5));
        this.globalModel.submenuCountries = data.countries.slice(5);

        this.globalModel.footerCountries = data.countries.slice(0, 8);
        this.globalModel.footerCategories = data.categories.slice(0, 17);
        this.globalModel.mobileLinks = data.socialMedia.filter(d => d.id == 8 || d.id == 9);
        
      });
      
      this.myFunctions.load_all_pages();

  }

  
}

