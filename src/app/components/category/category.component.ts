import { Component, OnInit, HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

import { SharedService } from '../../services/shared.service';
import { FunctionsService } from '../../services/functions.service';

import { SortPipe } from '../../pipes/sort.pipe';

import { _globals } from '../../includes/globals';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  CONTENT_PATH:string;
  RESIZED_CONTENT_PATH:string;

  categoryId:any;
  sharedModel:SharedModel;
  //pageListing:ArticleModel[];
  socialMedia:SocialMedia[];
   listingModel:ListingModel;

   //--Flags
   isHotAndMostRecentLoaded:boolean = false;
   startScrollLoading:boolean = false;

  categoryModel:CategoryModel;
  constructor(private http: HttpClient, private route: ActivatedRoute, private sharedService:SharedService, private myFunctions:FunctionsService, private sort:SortPipe) { }

  ngOnInit() {
    this.CONTENT_PATH = _globals.CONTENT_PATH;
    this.RESIZED_CONTENT_PATH = _globals.RESIZED_CONTENT_PATH;

    this.sharedService.sharedModel.subscribe(sharedModel => this.socialMedia = sharedModel.socialMedia);
    this.sharedService.set_currentRoute("category");
    this.sharedService.set_categoryTitle("");
    this.sharedService.alter_wrapper_classes('wrapper-secondary');

    this.listingModel = {
      mainArticle:null,
      primaryList:null,
      hotOnFacebook:null,
      mostRead:null
    };
    
    this.route.params.subscribe(params => {
      this.categoryId = params['id'];
      this.http.get(_globals.API_URL + "Data/GetCategoryInit?catId=" + params['id']).subscribe((data:any) =>{
        this.categoryModel = data;

        this.sharedService.set_categoryTitle(data['title']);
        this.myFunctions.load_category_page();
        //console.log(data['recentStories']);
        this.fetch_listing_data(data['recentStories'].sort((a:ArticleModel, b:ArticleModel) => { // sorts by isArabic (false then true)
            return a.isArabic != b.isArabic ?(a.isArabic? 1 : -1) : 0; //sumamry : 1 = flip cells -1 = do not flip & 0 = same values
          }).slice(1));
          setTimeout(function(){
            this.startScrollLoading = true;
            console.log(this.startScrollLoading);
            
          },200);
      });
    });
  }

  fetch_listing_data(all:ArticleModel[]){
    this.listingModel.mainArticle = all[0];
    this.listingModel.primaryList = this.sort.transform(all, 2, 1, true);
  }
  @HostListener("window:scroll", [])
  onWindowScroll() {
    console.log(this.startScrollLoading);
    
    //Hot Section
    if(this.startScrollLoading){
      if(this.myFunctions.is_dom_in_view('#hot-most-read', 500)){
        console.log(this.isHotAndMostRecentLoaded);
          if(!this.isHotAndMostRecentLoaded){
            this.http.get(_globals.API_URL + 'Data/GetCategoryHotStories?catId=' + this.categoryId).subscribe((data:any) =>{
              this.listingModel.hotOnFacebook = data['hotOnFacebook'];
              this.listingModel.mostRead = data['mostRead'];
              this.isHotAndMostRecentLoaded = true;
            });
          }
        
      }
    }
  }
}


interface ListingModel{
  mainArticle:ArticleModel;
  primaryList:ArticleModel[];
  hotOnFacebook:ArticleModel[];
  mostRead:ArticleModel[];
}

interface SharedModel{
    currentRoute:string;
    categoryTitle:string;
    isGoogleApiLoaded:boolean;
    socialMedia:SocialMedia[];
}

interface CategoryModel{
  id:number;
  templateId:number;
  title:string;
  about:string;
  articleIds:string;
  youtubeLink:string;
  slideshow:ArticleModel[];
  mostRecent:ArticleModel[];
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

interface SocialMedia{
  title:string;
  link:string;
}
