import { Component, OnInit, EventEmitter, Output, HostListener } from '@angular/core';
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

  
  isEditorPick:boolean = false;
  pageNumber:number = 0;

  //--Flags
  startScrollLoading:boolean = false;
  isRoundupsLoaded:boolean = false;
  isAnnouncementsLoaded:boolean = false;
  isHotAndMostRecentLoaded:boolean = false;
  isLoadingMore:boolean = false;
  hasMoreToLoad:boolean = true;

  //headerStructure:string;

  homeModel: HomeModel;
  socialMedia:SocialMedia[];
  constructor(private http: HttpClient, private sharedService:SharedService, private myFunctions:FunctionsService, private sort:SortPipe) { }

  ngOnInit() {
    //this.sharedService.serviceHeaderStructure.subscribe(sharedHeaderStructure => this.headerStructure = sharedHeaderStructure);
    
    this.sharedService.sharedModel.subscribe(sharedModel => this.socialMedia = sharedModel.socialMedia);
    this.sharedService.set_currentRoute("home");
    this.sharedService.alter_wrapper_classes('');
    
    this.homeModel = {
      slideshow:null,
      rightBox:null,
      latestAnnouncements1:null,
      latestAnnouncements2:null,
      tags:null,
      listing:null,
      articleIds:null,
      roundups:{
        media:null,
        monthly:null
      },
      photography:null,
      video:null,
      jadalicious:null,
      hotOnFacebook:null,
      mostRead:null,
      sidebar:{
        newton:null,
        pedagogy:null,
        quickThoughts:null,
        jadNavigation:null,
        profiles:null,
        popularTags:null
      }
    };
    this.CONTENT_PATH = _globals.CONTENT_PATH;
    this.RESIZED_CONTENT_PATH = _globals.RESIZED_CONTENT_PATH;
    this.http.get(_globals.API_URL + "Data/GetHomeInit").subscribe((data:any) =>{
      this.homeModel = data;
      this.fetch_listing_data(data['recentStories']['articles'], 0);
      //console.log(this.homeModel);
      
      // this.pageNumber++;
      // this.startScrollLoading = true;
      // this.myFunctions.load_home_page();
      setTimeout(() => {
        this.pageNumber++;
        this.startScrollLoading = true;
        this.myFunctions.load_home_page();
      },200);
    });
  }
  fetch_listing_data(all:ArticleModel[], page:number){
    switch(page){
      case 0:
        all = all.sort((a:ArticleModel, b:ArticleModel) => { // sorts by isArabic (false then true)
          return a.isArabic != b.isArabic ?(a.isArabic? 1 : -1) : 0; //sumamry : 1 = flip cells -1 = do not flip & 0 = same values
        })
        this.homeModel.listing = all.slice(0,1).concat(this.sort.transform(all.slice(1), 2, 1, true, 0, 0));
        break;
      case 1:
        this.homeModel.listing = this.homeModel.listing.concat(this.sort.transform(all, 4, 2, false, 0, 0));
        break;
      case 2:
        this.homeModel.listing = this.homeModel.listing.concat(this.sort.transform(all, 5, 3, false, 0, 0));
        break;
      case 3:
      this.homeModel.listing = this.homeModel.listing.concat(this.sort.transform(all, 4, 3, false, 0, 0));
        break;
      case 4:
        this.homeModel.listing = this.homeModel.listing.concat(this.sort.transform(all, 7, 4, false, 0, 0));
        break;
      default:
        this.homeModel.listing = this.homeModel.listing.concat(this.sort.transform(all, 2, 1, false, 0, 0));
        break;
    }
    // all = all.sort((a:ArticleModel, b:ArticleModel) => { // sorts by isArabic (false then true)
    //   return a.isArabic != b.isArabic ?(a.isArabic? 1 : -1) : 0; //sumamry : 1 = flip cells -1 = do not flip & 0 = same values
    // })
    // this.homeModel.listing = all.slice(0,1).concat(this.sort.transform(all.slice(1), 2, 1, true));
    //this.listingModel.primaryList = this.sort.transform(all.slice(1), 2, 1, true);
  }
  @HostListener("window:scroll", [])
  onWindowScroll() {
    //console.log(this.startScrollLoading);
    
    
    if(this.startScrollLoading){
      //Roundups Section
      if(this.myFunctions.is_dom_in_view('#roundups-container', 500)){
          if(!this.isRoundupsLoaded){
             this.isRoundupsLoaded = true;
             this.isLoadingMore = true;
            this.http.get(_globals.API_URL + 'Data/GetHomeRoundups?idsToRemove=' + this.homeModel.articleIds).subscribe((data:any) =>{
              this.homeModel.roundups = data;
              this.homeModel.articleIds = data['articleIds'];    
              this.isLoadingMore = false;
              this.myFunctions.load_home_roundups_section();
            });
          }
        
      }
      //Latest Announcements
      if(this.myFunctions.is_dom_in_view('#latest-announcements-container', 500)){
          if(!this.isAnnouncementsLoaded && this.pageNumber > 2){
             this.isAnnouncementsLoaded = true;
             this.isLoadingMore = true; 
            this.http.get(_globals.API_URL + 'Data/GetHomeLatestAnnouncements?idsToRemove=' + this.homeModel.articleIds).subscribe((data:any) =>{
              this.homeModel.latestAnnouncements2 = data['entries'];
              this.homeModel.articleIds = data['articleIds'];   
              this.isLoadingMore = false; 
              this.myFunctions.load_home_roundups_section();
            });
          }
        
      }
      //Hot Section
      if(this.myFunctions.is_dom_in_view('#hot-most-read', 500)){
          if(!this.isHotAndMostRecentLoaded && this.pageNumber > 1){
             this.isHotAndMostRecentLoaded = true;
             this.isLoadingMore = true; 
            this.http.get(_globals.API_URL + 'Data/GetHomeHotStories?idsToRemove=' + this.homeModel.articleIds).subscribe((data:any) =>{
              this.homeModel.hotOnFacebook = data['hotOnFacebook'];
              this.homeModel.mostRead = data['mostRead'];   
              this.homeModel.articleIds = data['articleIds']; 
              this.isLoadingMore = false;       
              this.myFunctions.load_category_hot_section();
            });
          }
        
      }
      //Load more
      if(this.hasMoreToLoad && this.myFunctions.is_dom_in_view('#load-more-container', 500)){
          if(!this.isLoadingMore){
            this.isLoadingMore = true;
            this.http.get(_globals.API_URL + 'Data/GetHomeListing?isEditorPick=' + this.isEditorPick + '&page=' + this.pageNumber + '&idsToRemove=' + this.homeModel.articleIds ).subscribe((data:any) =>{
              switch(this.pageNumber){
                case 3:
                  this.homeModel.photography = data['inlineDisplayIn'];
                  break;
                case 4:
                  this.homeModel.video = data['inlineDisplayIn'];
                  this.homeModel.jadalicious = data['inlineDisplayInEntries'];
                  break;
                default:
                  break;
              }
              if(data['articles'] != null && data['articles'].length){
                this.fetch_listing_data(data['articles'], this.pageNumber);
              }else{
                this.hasMoreToLoad = false;
              }
              
              
              this.homeModel.articleIds = data['articleIds'];
              this.pageNumber++;
              
              this.isLoadingMore = false;
            });
          }
        
      }
    }
  }
}

interface HomeModel{
  slideshow:ArticleModel[];
  rightBox:ArticleModel;
  latestAnnouncements1:ArticleModel[];
  latestAnnouncements2:ArticleModel[];
  tags:TagModel[];
  listing:ArticleModel[];
  articleIds:string;
  roundups:{
    media:ArticleModel[];
    monthly:ArticleModel[];
  };
  hotOnFacebook:ArticleModel[];
  mostRead:ArticleModel[];
  photography:ArticleModel;
  video:ArticleModel;
  jadalicious:ArticleModel[];
  sidebar:{
    newton:featuredRecentModel;
    pedagogy:featuredRecentModel;
    quickThoughts:featuredRecentModel;
    jadNavigation:string[];
    profiles:Profile[];
    popularTags:TagModel[];
  }
}
interface Profile{
  id:number;
  name:string;
  image:string;
}
interface ArticleModel{
  id:number;
  customUrlTitle:string;
  title:string;
  image:string;
  smallDescription:string;
  date:Date;
  isArabic:boolean;
  galleryCount:number;
  writer:{
    id:number;
    name:string;
  }
}
interface featuredRecentModel{
  featured:ArticleModel[];
  recent:ArticleModel[];
}
interface TagModel{
  id:number;
  title:string; 
}

interface SocialMedia{
  title:string;
  link:string;
}
