import { Component, OnInit, EventEmitter, Output, HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { SharedService } from '../../services/shared.service';
import { FunctionsService } from '../../services/functions.service';

import { SortPipe } from '../../pipes/sort.pipe';

import { _globals } from '../../includes/globals';
import { ArticleModel, SocialMedia } from '../../includes/Models';

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
  isArabStudiesLoaded:boolean = false;
  isSidebarLoaded:boolean = false;
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
    
    //Initializing model
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
      arabStudies:{
        list1:null,
        list2:null,
        list3:null
      },
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
    this.myFunctions.new_content_formatting();
    // all = all.sort((a:ArticleModel, b:ArticleModel) => { // sorts by isArabic (false then true)
    //   return a.isArabic != b.isArabic ?(a.isArabic? 1 : -1) : 0; //sumamry : 1 = flip cells -1 = do not flip & 0 = same values
    // })
    // this.homeModel.listing = all.slice(0,1).concat(this.sort.transform(all.slice(1), 2, 1, true));
    //this.listingModel.primaryList = this.sort.transform(all.slice(1), 2, 1, true);
  }
  
  fetch_new_listing(listType:number){
    if(listType == 1 || listType == 2 || (listType == 3 && true)){
      this.pageNumber = 0;
      this.startScrollLoading = false;
      this.isRoundupsLoaded = false;
      this.isAnnouncementsLoaded = false;
      this.isHotAndMostRecentLoaded = false;
      this.isArabStudiesLoaded = false;
      this.hasMoreToLoad = true;

      if(listType != 2){
        this.isEditorPick = false;
        if(listType == 1){
          this.get_articles(true);
        }
        if(listType == 3){
          this.get_articles(true);
        }
      }else{
        this.isEditorPick = true;
        this.get_articles(true);
      }
    }
  }
  get_articles(isListingChanged:boolean){
      isListingChanged = isListingChanged || false;
      this.http.get(_globals.API_URL + 'Data/GetHomeListing?isEditorPick=' + this.isEditorPick + '&page=' + this.pageNumber ).subscribe((data:any) =>{
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
        if(isListingChanged){
          this.homeModel.latestAnnouncements2 = null;
          this.homeModel.listing = null;
          
          //resetting
          if(this.homeModel.arabStudies){
            if(this.homeModel.arabStudies.list1){
              this.homeModel.arabStudies.list1 = null;
            }
            if(this.homeModel.arabStudies.list2){
              this.homeModel.arabStudies.list2 = null;
            }
            if(this.homeModel.arabStudies.list3){
              this.homeModel.arabStudies.list3 = null;
            }
           }
           if(this.homeModel.roundups){
            if(this.homeModel.roundups.media){
              this.homeModel.roundups.media = null;
            }
            if(this.homeModel.roundups.monthly){
              this.homeModel.roundups.monthly = null;
            }
           }
           if(this.homeModel.latestAnnouncements2){
            this.homeModel.latestAnnouncements2 = null;
           }
           if(this.homeModel.hotOnFacebook){
            this.homeModel.hotOnFacebook = null;
           }
           if(this.homeModel.mostRead){
            this.homeModel.mostRead = null;
           }
        }
        if(data['articles'] != null && data['articles'].length){
          this.fetch_listing_data(data['articles'], this.pageNumber);
        }else{
          this.hasMoreToLoad = false;
        }
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
      //Arab Studies Institute Section
      if(this.myFunctions.is_dom_in_view('#arab-studies-container', 500)){
          if(!this.isArabStudiesLoaded && this.pageNumber > 3){
             this.isArabStudiesLoaded = true;

            // this.isLoadingMore = true;
            this.http.get(_globals.API_URL + 'Data/GetHomeArabInstitute').subscribe((data:any) =>{
              this.homeModel.arabStudies = data;
              //this.homeModel.articleIds = data['articleIds'];    
          //    this.isLoadingMore = false;
            });
          }
      }
      //Roundups Section
      if(this.myFunctions.is_dom_in_view('#roundups-container', 500)){
          if(!this.isRoundupsLoaded && this.homeModel.listing.length){
             this.isRoundupsLoaded = true;

            // this.isLoadingMore = true;
            this.http.get(_globals.API_URL + 'Data/GetHomeRoundups').subscribe((data:any) =>{
              this.homeModel.roundups = data;
              //this.homeModel.articleIds = data['articleIds'];    
              //this.isLoadingMore = false;
              this.myFunctions.load_home_roundups_section();
            });
          }
        
      }
      //Latest Announcements
      if(this.myFunctions.is_dom_in_view('#latest-announcements-container', 500)){
          if(!this.isAnnouncementsLoaded && this.pageNumber > 2){
             this.isAnnouncementsLoaded = true;
            // this.isLoadingMore = true; 
            this.http.get(_globals.API_URL + 'Data/GetHomeLatestAnnouncements').subscribe((data:any) =>{
              this.homeModel.latestAnnouncements2 = data['entries'];
              //this.homeModel.articleIds = data['articleIds'];   
           //   this.isLoadingMore = false; 
              //this.myFunctions.load_home_roundups_section();
            });
          }
        
      }
      //Hot Section
      if(this.myFunctions.is_dom_in_view('#hot-most-read', 500)){
          if(!this.isHotAndMostRecentLoaded && this.pageNumber > 1){
             this.isHotAndMostRecentLoaded = true;

            // this.isLoadingMore = true; 
            this.http.get(_globals.API_URL + 'Data/GetHomeHotStories').subscribe((data:any) =>{
              this.homeModel.hotOnFacebook = data['hotOnFacebook'];
              this.homeModel.mostRead = data['mostRead'];   
              //this.homeModel.articleIds = data['articleIds']; 
            //  this.isLoadingMore = false;       
              this.myFunctions.load_category_hot_section();
            });
          }
        
      }
      //Load more
      if(this.hasMoreToLoad && this.myFunctions.is_dom_in_view('#load-more-container', 600)){
        if(!this.isLoadingMore){
          this.isLoadingMore = true;
          this.get_articles(false);
        }
      }
      
      //SIde Bar
      if(this.myFunctions.is_dom_in_view('#sidebar-container', 500)){
          if(!this.isSidebarLoaded){
             this.isSidebarLoaded = true;
            this.http.get(_globals.API_URL + 'Data/GetHomeSideBar').subscribe((data:any) =>{
              this.homeModel.sidebar = data;
              //this.homeModel.articleIds = data['articleIds']; 
              this.myFunctions.homeSidebar();

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
  arabStudies:{
    list1:ArticleModel;
    list2:ArticleModel;
    list3:ArticleModel;
  }
  sidebar:{
    newton:featuredRecentModel;
    pedagogy:featuredRecentModel;
    quickThoughts:featuredRecentModel;
    jadNavigation:[{
      id:number;
      title:string;
    }];
    profiles:Profile[];
    popularTags:TagModel[];
  }
}
interface Profile{
  id:number;
  name:string;
  image:string;
}

interface featuredRecentModel{
  featured:ArticleModel[];
  recent:ArticleModel[];
}
interface TagModel{
  id:number;
  title:string; 
}

