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

  startScrollLoading:boolean = false;
  isSidebarLoaded:boolean = false;
  isLoadingMore:boolean = false;
  hasMoreToLoad:boolean = true;

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
      categoryArticles:null,
      articles:null,
      articlesIds:null
    };

    this.sharedService.sharedModel.subscribe(sharedModel => this.sharedModel = sharedModel);
    this.sharedService.set_currentRoute("jadnavigation");
    this.sharedService.set_categoryTitle("Jad Navigation");
    this.sharedService.alter_wrapper_classes('');

    this.myFunctions.load_google_map_api();
    this.http.get(_globals.API_URL + 'Data/GetJadNavigationInit').subscribe((data:any) => {

      this.jadModel = data;
      console.log(this.jadModel);
      

      setTimeout(() => {
        this.pageNumber++;
        this.startScrollLoading = true;
        this.myFunctions.load_init_jadNavigation_page();
      },200);
      
    });

  }
  @HostListener("window:scroll", [])
  onWindowScroll() {
    //console.log(this.startScrollLoading);
    
    
    if(this.startScrollLoading){
      //Latest Announcements
      // if(this.myFunctions.is_dom_in_view('#latest-announcements-container', 500)){
      //     if(!this.isAnnouncementsLoaded && this.pageNumber > 2){
      //        this.isAnnouncementsLoaded = true;
      //       this.http.get(_globals.API_URL + 'Data/GetHomeLatestAnnouncements').subscribe((data:any) =>{
      //         this.homeModel.latestAnnouncements2 = data['entries'];
      //         //this.homeModel.articleIds = data['articleIds'];  
      //       });
      //     }        
      // }
      //Hot Section
      // if(this.myFunctions.is_dom_in_view('#hot-most-read', 500)){
      //     if(!this.isHotAndMostRecentLoaded && this.pageNumber > 1){
      //        this.isHotAndMostRecentLoaded = true;

      //       // this.isLoadingMore = true; 
      //       this.http.get(_globals.API_URL + 'Data/GetHomeHotStories').subscribe((data:any) =>{
      //         this.homeModel.hotOnFacebook = data['hotOnFacebook'];
      //         this.homeModel.mostRead = data['mostRead'];   
      //         //this.homeModel.articleIds = data['articleIds']; 
      //       //  this.isLoadingMore = false;       
      //         this.myFunctions.load_category_hot_section();
      //       });
      //     }
        
      // }
      
      //Load more
      if(this.hasMoreToLoad && this.myFunctions.is_dom_in_view('#load-more-container', 600)){
        if(!this.isLoadingMore){
          this.isLoadingMore = true;
          this.http.get(_globals.API_URL + 'Data/GetJadListing?page=' + this.pageNumber ).subscribe((data:any) =>{
            
            //this.startScrollLoading = true;
            
        if(data.categoryArticles != null && data.categoryArticles.length){
          this.jadModel.categoryArticles = this.jadModel.categoryArticles.concat(data.categoryArticles);
          this.myFunctions.new_content_formatting();
          if(data.categoryArticles.length < 6){
            this.hasMoreToLoad = false;
          }
        }else{
          this.hasMoreToLoad = false;
        }
            this.pageNumber++;
            
            this.isLoadingMore = false;
          });
          //this.get_articles(false);
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
  articles:ArticleModel[];
  articlesIds:string;
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