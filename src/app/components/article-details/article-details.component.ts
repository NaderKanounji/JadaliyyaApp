import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

import { SharedService } from '../../services/shared.service';
import { FunctionsService } from '../../services/functions.service';

import { _globals } from '../../includes/globals';
// import * as _globals from '../../includes/globals'; 

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.css']
})
export class ArticleDetailsComponent implements OnInit {
  CONTENT_PATH:string;
  RESIZED_CONTENT_PATH:string;
  BASE_URL:string;

  sharedModel:SharedModel;
  twitterUsername:string;
  articleModel: ArticleModel;
  shareLink:string;
  constructor(private http: HttpClient, private route: ActivatedRoute, private sharedService:SharedService, private myFunctions:FunctionsService) { }

  ngOnInit() {
    this.CONTENT_PATH = _globals.CONTENT_PATH;
    this.RESIZED_CONTENT_PATH = _globals.RESIZED_CONTENT_PATH;
    this.BASE_URL = _globals.BASE_URL;
    this.twitterUsername = _globals.TwitterUsername;
    
    this.sharedService.set_currentRoute("details");

    this.sharedService.alter_wrapper_classes('wrapper-secondary');    
    this.sharedService.sharedModel.subscribe((sharedModel:any) => this.sharedModel = sharedModel);
    
    // if(!this.sharedModel.isGoogleApiLoaded){
    //   this.myFunctions.load_google_api();
    //   this.sharedService.set_isGoogleApiLoaded(true);
    // }

    this.route.params.subscribe(params => {
      //console.log(params['id']);
      
      this.http.get(_globals.API_URL + "Data/GetDetailsById?id=" + params['id']).subscribe((data:any) =>{
        this.articleModel = data;
        this.shareLink = this.BASE_URL + "Details/" + this.articleModel.id + (this.articleModel.customUrlTitle ? '/' + this.articleModel.customUrlTitle : '');
        this.articleModel.fbShareSrc = 'https://www.facebook.com/plugins/share_button.php?href=' + this.shareLink + '&layout=button&size=small&mobile_iframe=true&appId=1742183246107369&width=59&height=20';
        //console.log(this.articleModel);
        this.myFunctions.load_details_page();
        this.myFunctions.back_to_top(0);
      });
   });
  }
  Tweet(linkUrl, title, twitterAccount){
    if (title == '' || title == undefined)
    title = encodeURIComponent(document.title);
    var data = "counturl=" + linkUrl + "&text=" + title + "&original_referer=" + window.location.href
    + "&priority=1" + "&url=" + linkUrl + "&via=" + twitterAccount;
    var path = "http://twitter.com/share?" + data;
    var popUp = window.open(path, 'tweet', 'height=450,width=550,resizable=1');
  }


}
interface SharedModel{
  headerStructure:string;
  categoryTitle:string;
  isGoogleApiLoaded:boolean;
}

interface ArticleModel{
  id:number;
  customUrlTitle:string;
  title:string;
  description:string;
  image:string;
  isArabic:boolean;
  middleQuote:string;
  descriptionArr:string[];
  date:Date;
  fbShareSrc:string;
  writer:{
    id:number;
    name:string;
    image:string;
  },
  alsoByAuthor:{
    id:number;
    title:string;
    smallDescription:string;
    image:string;
    date:Date;
    customUrlTitle:string;
    isArabic:boolean;
  },
  relatedStories:{
    id:number;
    title:string;
    image:string;
    customUrlTitle:string;
    isArabic:boolean;
  },
  recentStories:{
    id:number;
    title:string;
    image:string;
    customUrlTitle:string;
    isArabic:boolean;
  },
  tags:{
    id:number;
    title:string;
  },
  nextArticle:{
    id:number;
    title:string;
  }
}
