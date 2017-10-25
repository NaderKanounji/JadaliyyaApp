import { Component, OnInit, HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

import { SharedService } from '../../services/shared.service';
import { FunctionsService } from '../../services/functions.service';

import { SortPipe } from '../../pipes/sort.pipe';

import { _globals } from '../../includes/globals';
import { ArticleModel, SocialMedia, SharedModel, MapMarker, TagModel, CategoryWithArticles } from '../../includes/Models';


@Component({
  selector: 'app-jad-navigation',
  templateUrl: './jad-navigation.component.html',
  styleUrls: ['./jad-navigation.component.css']
})
export class JadNavigationComponent implements OnInit {
  RESIZED_CONTENT_PATH:string;
  ARABIC_SECTION_ID:number;
  jadModel:JadModel;
  sharedModel:SharedModel;

  pageNumber:number = 0;
  listingType:number = 0;
  startScrollLoading:boolean = false;
  isSidebarLoaded:boolean = false;
  isLoadingMore:boolean = false;
  hasMoreToLoad:boolean = true;
  isHotAndMostRecentLoaded:boolean = false;

  constructor(private sort:SortPipe,private http: HttpClient, private route: ActivatedRoute, private sharedService:SharedService, private myFunctions:FunctionsService) { }

  ngOnInit() {
    this.RESIZED_CONTENT_PATH = _globals.RESIZED_CONTENT_PATH;
    this.ARABIC_SECTION_ID = _globals.ARABIC_SECTION_ID;
    this.jadModel = {
      markers:null,
      pages:null,
      arabicPages:null,
      topics:null,
      countries:null,
      hotOnFacebook:null,
      mostRead:null,
      categoryArticles:null,
      articles:null,
      articleIds:null
    };

    this.sharedService.sharedModel.subscribe(sharedModel => this.sharedModel = sharedModel);
    this.sharedService.set_currentRoute("jadnavigation");
    this.sharedService.set_headerType("header-secondary");
    this.sharedService.set_categoryTitle("Jad Navigation");

    this.myFunctions.load_google_map_api();
    this.http.get(_globals.API_URL + 'Data/GetJadNavigationInit').subscribe((data:any) => {

      this.jadModel = data;
      

      setTimeout(() => {
        this.pageNumber++;
        this.startScrollLoading = true;
        this.myFunctions.load_init_jadNavigation_page();
      },200);
      
    });

  }

  fetch_new_listing(listingType:number){
    if(listingType != this.listingType){
      this.startScrollLoading = false;
      this.listingType = listingType;
      this.pageNumber = 0;
      this.isHotAndMostRecentLoaded = false;
      this.hasMoreToLoad = true;
      this.jadModel.articleIds = "";


      this.get_articles();
    }
  } 
  get_articles(){
    this.http.get(_globals.API_URL + 'Data/GetJadListing?page=' + this.pageNumber + '&navigationType=' + this.listingType + '&idsToRemove=' + this.jadModel.articleIds).subscribe((data:any) =>{
      if(this.pageNumber == 0){
        this.jadModel.articles = null;
        this.jadModel.categoryArticles = null;
        
        //resetting
         if(this.jadModel.hotOnFacebook){
          this.jadModel.hotOnFacebook = null;
         }
         if(this.jadModel.mostRead){
          this.jadModel.mostRead = null;
         }
      }
      if(this.listingType == 0){
        if(this.pageNumber == 0){
          this.jadModel.categoryArticles = data.categoryArticles;
        }else{
          this.jadModel.categoryArticles = this.jadModel.categoryArticles.concat(data.categoryArticles);
        }
        if(data['categoryArticles'] == null || !data['categoryArticles'].length || (this.pageNumber >= 2 && data['categoryArticles'].length < 6)){
          this.hasMoreToLoad = false;
        }
      }else{
        if(this.pageNumber == 0){
          this.jadModel.articles = data.articles;
        }else{
          this.jadModel.articles = this.jadModel.articles.concat(data.articles);
        }
        if(data['articles'] == null || !data['articles'].length || (this.pageNumber >= 2 && data['articles'].length < 9)){
          this.hasMoreToLoad = false;
        }
      }
      this.jadModel.articleIds = data.articleIds;
      
      this.myFunctions.new_content_formatting();
      this.startScrollLoading = true;
      //this.homeModel.articleIds = data['articleIds'];
      this.pageNumber++;
      
      this.isLoadingMore = false;
    });
}

  @HostListener("window:scroll", [])
  onWindowScroll() {
    //console.log(this.startScrollLoading);
    
    
    if(this.startScrollLoading){
      //Hot Section
      if(this.myFunctions.is_dom_in_view('#hot-most-read', 500)){
          if(!this.isHotAndMostRecentLoaded && this.pageNumber > 1){
             this.isHotAndMostRecentLoaded = true;

            // this.isLoadingMore = true; 
            this.http.get(_globals.API_URL + 'Data/GetJadHotStories').subscribe((data:any) =>{
              this.jadModel.hotOnFacebook = data['hotOnFacebook'];
              this.jadModel.mostRead = data['mostRead'];   
              this.myFunctions.load_category_hot_section();
            });
          }
        
      }
      
      //Load more
      if(this.hasMoreToLoad && this.myFunctions.is_dom_in_view('#load-more-container', 600)){
        if(!this.isLoadingMore){
          this.isLoadingMore = true;
          
          this.get_articles();
        }
      }
      
      //Side Bar
      if(this.myFunctions.is_dom_in_view('#sidebar-container', 500)){
          if(!this.isSidebarLoaded){
             this.isSidebarLoaded = true;
            this.http.get(_globals.API_URL + 'Data/GetJadSidebar').subscribe((data:any) =>{
              this.jadModel.topics = data.topics;
              this.jadModel.arabicPages = data.arabicPages;
              this.jadModel.countries = data.countries;
              //this.homeModel.articleIds = data['articleIds']; 
              this.myFunctions.homeSidebar();

            });
          }
        
      }

    }
  }

}

export interface JadModel{
  markers:MapMarker[];
  pages:CategoryModel[];
  arabicPages:CategoryModel[];
  topics:TagModel[];
  countries:CountryModel[];
  categoryArticles:CategoryWithArticles[];
  hotOnFacebook:ArticleModel[];
  mostRead:ArticleModel[];
  articles:ArticleModel[];
  articleIds:string;
}
export interface CategoryModel{
  id:number,
  title:string,
  isOnMenu:boolean,
  customUrlTitle:string
}
export interface CountryModel{
  id:number,
  title:string,
  customUrlTitle:string
}