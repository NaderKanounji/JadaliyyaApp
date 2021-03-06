import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';

import { SharedService } from '../../services/shared.service';
import { FunctionsService } from '../../services/functions.service';
import { UserService } from '../../services/user.service';

import { _globals } from '../../includes/globals';
import { UserModel, SharedModel } from '../../includes/Models';
// import * as _globals from '../../includes/globals'; 

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.css']
})
export class ArticleDetailsComponent implements OnInit {
  RESIZED_CONTENT_PATH:string;
  BASE_URL:string;

  sharedModel:SharedModel;
  twitterUsername:string;
  articleModel: ArticleModel;
  user:UserModel;
  articleLink:string;
  constructor(private router: Router, private metaService:Meta, private userService:UserService, private http: HttpClient, private route: ActivatedRoute, private sharedService:SharedService, private myFunctions:FunctionsService) { }

  ngOnInit() {
    this.RESIZED_CONTENT_PATH = _globals.RESIZED_CONTENT_PATH;
    this.BASE_URL = _globals.BASE_URL;
    this.twitterUsername = _globals.TwitterUsername;
    
    this.sharedService.set_currentRoute("details");
    this.sharedService.set_headerType("header-secondary");

    this.sharedService.alter_wrapper_classes('wrapper-secondary');    
    this.sharedService.sharedModel.subscribe((sharedModel:any) => this.sharedModel = sharedModel);
    this.userService.user.subscribe(user => this.user = user);
    
    // if(!this.sharedModel.isGoogleApiLoaded){
    //   this.myFunctions.load_google_api();
    //   this.sharedService.set_isGoogleApiLoaded(true);
    // }

    this.route.params.subscribe(params => {
      //console.log(params['id']);
      
      this.http.get(_globals.API_URL + "Data/GetDetailsById?id=" + params['id']).subscribe((data:any) =>{
        this.articleModel = data;
        this.articleLink = this.BASE_URL + "Details/" + this.articleModel.id + (this.articleModel.customUrlTitle ? '/' + this.articleModel.customUrlTitle : '');
        this.articleModel.fbShareSrc = 'https://www.facebook.com/plugins/share_button.php?href=' + this.articleLink + '&layout=button&size=small&mobile_iframe=true&appId=' + _globals.FACEBOOK_APP_ID + '&width=59&height=20';
        this.articleModel.fbLikeLink = 'https://www.facebook.com/plugins/like.php?href=' + this.articleLink + '&width=61&layout=button_count&action=like&size=small&share=false&height=21&appId=' + _globals.FACEBOOK_APP_ID;
        //console.log(this.articleModel);
        this.myFunctions.details_slider();
        this.myFunctions.load_details_page();
        const header = new HttpHeaders().set('Content-Type', "application/json");
        this.http.post(_globals.API_URL + 'Data/AddViewCounter?articleId=' + this.articleModel.id, {header}).subscribe((counterDate:any)=>{
          //nothing to show
        });
        if(data.metas){
          this.metaService.addTags([
            {name : 'description', content :data.metas.metaDescription},
            {name : 'keywords', content :data.metas.metaKeywords},
            {name : 'author', content : 'Jadaliyya'},
            {name : 'og:type', content :'Website'},
            {name : 'og:url', content :this.router.url},
            {name : 'og:image', content :_globals.RESIZED_CONTENT_PATH + '500x500xo/' + data.metas.metaImage},
            {name : 'og:title', content :data.metas.h1Content},
            {name : 'og:description', content :data.metas.metaDescription},
            {name : 'og:site_name', content : 'Jadaliyya'},
            {name : 'twitter:card', content :_globals.RESIZED_CONTENT_PATH + '500x500xo/' + data.metas.metaImage},
            {name : 'twitter:site', content :this.router.url},
            {name : 'twitter:title', content :data.metas.h1Content},
            {name : 'twitter:description', content :data.metas.metaDescription},
            {name : 'twitter:image', content : _globals.RESIZED_CONTENT_PATH + '500x500xo/' + data.metas.metaImage},

          ]);
        }
        //this.myFunctions.back_to_top(0);
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
  country:string;
  fbShareSrc:string;
  fbLikeLink:string;
  videoUrl:string;
  ArticleImages:{
    images:string;
    title:string;
  }
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
