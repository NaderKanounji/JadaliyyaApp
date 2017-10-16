import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { SharedService } from '../../services/shared.service';
import { FunctionsService } from '../../services/functions.service';

import { SortPipe } from '../../pipes/sort.pipe';

import { _globals } from '../../includes/globals';

// import * as _globals from '../../includes/globals'; 

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  CONTENT_PATH:string;
  RESIZED_CONTENT_PATH:string;

  //headerStructure:string;

  homeModel: HomeModel;
  socialMedia:SocialMedia[];
  constructor(private http: HttpClient, private sharedService:SharedService, private myFunctions:FunctionsService, private sort:SortPipe) { }

  ngOnInit() {
    //this.sharedService.serviceHeaderStructure.subscribe(sharedHeaderStructure => this.headerStructure = sharedHeaderStructure);
    
    this.sharedService.sharedModel.subscribe(sharedModel => this.socialMedia = sharedModel.socialMedia);
    this.sharedService.set_currentRoute("home");
    //console.log(this.headerStructure);

    this.sharedService.alter_wrapper_classes('');
    
    this.homeModel = {
      slideshow:null,
      rightBox:null,
      latestAnnouncements:null,
      tags:null,
      listing:null,
      articleIds:null,
      roundups:{
        media:null,
        monthly:null
      },
      photography:null,
      video:null
    };
    this.CONTENT_PATH = _globals.CONTENT_PATH;
    this.RESIZED_CONTENT_PATH = _globals.RESIZED_CONTENT_PATH;
    this.http.get(_globals.API_URL + "Data/GetHomeInit").subscribe((data:any) =>{
      this.homeModel = data;
      this.fetch_listing_data(data['recentStories']['articles'], 0);
      
      this.myFunctions.load_home_page();
      //console.log(this.slideshow);
      //console.log(this.slideshow);
    });
  }
  fetch_listing_data(all:ArticleModel[], page:number){
    all = all.sort((a:ArticleModel, b:ArticleModel) => { // sorts by isArabic (false then true)
      return a.isArabic != b.isArabic ?(a.isArabic? 1 : -1) : 0; //sumamry : 1 = flip cells -1 = do not flip & 0 = same values
    })
    this.homeModel.listing = all.slice(0,1).concat(this.sort.transform(all.slice(1), 2, 1, true));
    //this.listingModel.primaryList = this.sort.transform(all.slice(1), 2, 1, true);
  }
}

interface HomeModel{
  slideshow:ArticleModel[];
  rightBox:ArticleModel;
  latestAnnouncements:ArticleModel[];
  tags:TagModel[];
  listing:ArticleModel[];
  articleIds:string;
  roundups:{
    media:ArticleModel[];
    monthly:ArticleModel[];
  };
  photography:ArticleModel;
  video:ArticleModel;
}

interface ArticleModel{
  id:number;
  customUrlTitle:string;
  title:string;
  image:string;
  smallDescription:string;
  date:Date;
  isArabic:boolean;
  writer:{
    id:number;
    name:string;
  }
}
interface TagModel{
  id:number;
  title:string; 
}

interface SocialMedia{
  title:string;
  link:string;
}
