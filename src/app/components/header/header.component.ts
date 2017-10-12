import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

import { SharedService } from '../../services/shared.service';
import { FunctionsService } from '../../services/functions.service';


import { _globals } from '../../includes/globals';

@Component({
  selector: 'header-component',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  CONTENT_PATH:string;
  RESIZED_CONTENT_PATH:string;
  ARABIC_SECTION_ID:number;
  ROUNDUPS_CATEGORY_ID:number;
  ROUNDUPS_MEDIA_URL_TITLE:string;
  ROUNDUPS_MONTHLY_URL_TITLE:string;


  routeId:number;
  customUrlTitle:string;


  sharedModel:SharedModel;

  headerCategories:HeaderCategoriesModel[];
  submenuCategories:HeaderCategoriesModel[];
  headerCountries:HeaderCategoriesModel[];
  submenuCountries:HeaderCategoriesModel[];
  
  headerCategoryArticles:[HeaderCategoriesArticles[]] = [[]];
  constructor(private route: ActivatedRoute, private sharedService:SharedService, private http:HttpClient, private myFunction:FunctionsService) { }

  ngOnInit() {
    
    this.CONTENT_PATH = _globals.CONTENT_PATH;
    this.RESIZED_CONTENT_PATH = _globals.RESIZED_CONTENT_PATH;
    this.ARABIC_SECTION_ID = _globals.ARABIC_SECTION_ID;
    this.ROUNDUPS_CATEGORY_ID = _globals.ROUNDUPS_CATEGORY_ID;
    this.ROUNDUPS_MEDIA_URL_TITLE = _globals.ROUNDUPS_MEDIA_URL_TITLE;
    this.ROUNDUPS_MONTHLY_URL_TITLE = _globals.ROUNDUPS_MONTHLY_URL_TITLE;
    
    this.sharedService.sharedModel.subscribe((sharedModel:any) => this.sharedModel = sharedModel);
    // this.route.params.subscribe(params => {
    //   if(params['customUrlTitle']){
    //     this.customUrlTitle = params['customUrlTitle'];
    //   }
    // });
    // setTimeout(function(){
    //   console.log(this.sharedModel);
    // },5000);
    //this.sharedService.categoryTitle.subscribe(categoryTitle => this.categoryTitle = categoryTitle);
    //console.log(this.currentRoute);
    this.http.get(_globals.API_URL + "Data/GetHeader").subscribe((data:any) =>{
      this.headerCategories = data.categories.filter(d => d.isOnMenu == true && d.id != _globals.ARABIC_SECTION_ID).slice(0, 10);
      this.submenuCategories = data.categories.filter(d => d.isOnMenu == true && d.id != _globals.ARABIC_SECTION_ID).slice(10);
    
      this.submenuCategories = this.submenuCategories.concat(data.categories.filter(d => !d.isOnMenu == true && d.id != _globals.ARABIC_SECTION_ID));
      //console.log(this.submenuCategories);
      this.headerCountries = data.countries.slice(0, 6);
      this.submenuCountries = data.countries.slice(6);
      this.myFunction.header_bindings();
    });
  }

  load_cat_articles(catId:number, catNumber:number){
    if(!(this.headerCategoryArticles != undefined && this.headerCategoryArticles[catNumber] != undefined && this.headerCategoryArticles[catNumber].length)){
      this.http.get(_globals.API_URL + "Data/GetHeaderCategoryArticles?catId=" + catId).subscribe((data:any) =>{
          this.headerCategoryArticles[catNumber] = data;
          //console.log(this.headerCategoryArticles);
          //console.log(this.headerCategoryArticles[catId]);
        
      });
    }
  }
  openSubMenu(){
    this.myFunction.openSubMenu();
  }

}
interface SharedModel{
  headerStructure:string;
  categoryTitle:string;
  categoryId:number;
  isGoogleApiLoaded:boolean;
  customUrlTitle:string;
  socialMedia:SocialMedia[];
}

interface HeaderCategoriesModel{
  id:number,
  title:string
}
interface HeaderCountryModel{
  id:number;
  title:string;
  customUrlTitle:string;
}

interface HeaderCategoriesArticles{
  id:number;
  title:string;
  image:string;
  customUrlTitle:string;
  isArabic:boolean;
  date:Date;
  writer:{
    id:number;
    name:string;
  };
}

interface HeaderCategoryArr{
  articles: HeaderCategoriesArticles[];
}
interface SocialMedia{
  title:string;
  link:string;
}