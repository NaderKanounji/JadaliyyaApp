import { Component, OnInit, HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

import { SharedService } from '../../services/shared.service';
import { FunctionsService } from '../../services/functions.service';

import { SortPipe } from '../../pipes/sort.pipe';
import { CustomSortPipe } from '../../pipes/custom-sort.pipe';

import { _globals } from '../../includes/globals';
import { ArticleModel, SocialMedia, SharedModel, MapMarker, PageModel, LabelValueModel, JadNavigationWidget, BannerModel } from '../../includes/Models';
@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {
  CONTENT_PATH:string;
  RESIZED_CONTENT_PATH:string;

  countryId:any;
  countryModel:CountryModel;
  sharedModel:SharedModel;

  pageNumber:number = 0;
  isEditorPick:boolean = false;
  startScrollLoading:boolean = false;
  isLoadingMore:boolean = false;
  hasMoreToLoad:boolean = true;
  isHotAndMostRecentLoaded:boolean = false;
  isAnnouncementsLoaded:boolean = false;

  constructor(private customSort:CustomSortPipe, private sort:SortPipe,private http: HttpClient, private route: ActivatedRoute, private sharedService:SharedService, private myFunctions:FunctionsService) { }

  ngOnInit() {
    this.CONTENT_PATH = _globals.CONTENT_PATH;
    this.RESIZED_CONTENT_PATH = _globals.RESIZED_CONTENT_PATH;

    this.countryModel = {
      id:null,
      hasTemplate:false,
      title:null,
      arTitle:null,
      about:null,
      image:null,
      customUrlTitle:null,
      banner:null,
      regression:{
        populationMillion:null,
        populationNb:null,
        populationTitle:null
      },
      marker:null,
      page:null,
      slideshow:null,
      mostRecent:null,
      info:null,
      moreFeatured:null,
      moreRecent:null,
      jadNavigation:null,
      listing:null,
      latestAnnouncements:null,
      hotOnFacebook:null,
      mostRead:null,
      photography:null,
      video:null,
      jadalicious:null,
      articleIds:null,
    };
    this.sharedService.sharedModel.subscribe(sharedModel => this.sharedModel = sharedModel);
    this.sharedService.set_country({'id': this.countryId, 'title' : null, 'arTitle' : null, 'hasTemplate' : false, 'image' : null});    
    this.sharedService.set_currentRoute("country");
    this.sharedService.set_headerType("header-secondary");


    this.myFunctions.load_google_map_api();
    
    this.route.params.subscribe(params => {
        this.countryId = params['id'];
        
        this.http.get(_globals.API_URL + 'Data/GetCountryInit?countryId=' + this.countryId).subscribe((data:any) => {
          this.myFunctions.DestroyAndClearCarousel();
          this.countryModel = data;
          if(data.hasTemplate){
            this.sharedService.alter_wrapper_classes('wrapper-secondary');
          }
          
          
          this.fetch_listing_data(data["listing"], 0);
          this.sharedService.set_country({'id': this.countryId, 'title' : data.title, 'arTitle' : data.arTitle, 'hasTemplate' : data.hasTemplate, 'image' : data.image});
          this.startScrollLoading = true;
          this.myFunctions.country_sidebar();
          this.myFunctions.load_slideshow();
          
        });
    });
  }
  fetch_listing_data(all:ArticleModel[], page:number){
    switch(page){
      case 0:

        // all = all.sort(function(a,b){
        //   return b.date > a.date ? 1 : -1;
        // }).sort((a:ArticleModel, b:ArticleModel) => { // sorts by isArabic (false then true)
        //   return a.isArabic != b.isArabic ?(a.isArabic? 1 : -1) : 0; //sumamry : 1 = flip cells -1 = do not flip & 0 = same values
        // });
        let tempEnglish = all.filter(d => !d.isArabic).sort(function(a,b){
            return b.date > a.date ? 1 : -1;
          });
        this.countryModel.listing = tempEnglish.slice(0,1).concat(this.sort.transform(all.filter(d => d.id != tempEnglish[0].id), 2, 1, true, 0, 0));
        break;
      case 1: 
        this.countryModel.listing = this.countryModel.listing.concat(this.customSort.transform(all, [2,1,1,1,2,1,2,1], false));
        break;
      case 2:
        this.countryModel.listing = this.countryModel.listing.concat(this.customSort.transform(all, [3,1,1,1,1,1,2,1], false));
        break;
      default:
        this.countryModel.listing = this.countryModel.listing.concat(this.sort.transform(all, 2, 1, false, 0, 0));
        break;
    }
    this.myFunctions.new_content_formatting();
  }
  fetch_new_listing(isEditorPick:boolean){
    isEditorPick = isEditorPick || false;
    if(this.isEditorPick != isEditorPick){
      this.pageNumber = 0;
      this.startScrollLoading = false;
      this.isHotAndMostRecentLoaded = false;
      this.isAnnouncementsLoaded = false;
      this.hasMoreToLoad = true;

      this.isEditorPick = isEditorPick;
      this.get_articles(true);

    }

  }
  get_articles(isListingChanged:boolean){
    this.isLoadingMore = true;
    isListingChanged = isListingChanged || false;
    this.http.get(_globals.API_URL + 'Data/GetCountryListing?countryId=' + this.countryId + '&isEditorPick=' + this.isEditorPick + '&page=' + this.pageNumber + '&idsToRemoves' + this.countryModel.articleIds).subscribe((data:any) =>{
      switch(this.pageNumber){
        case 1:
          this.countryModel.photography = data['inlineDisplayIn'];
          break;
        case 2:
          this.countryModel.video = data['inlineDisplayIn'];
          this.countryModel.jadalicious = data['inlineDisplayInEntries'];
          break;
        default:
          break;
      }
      if(isListingChanged){
        this.countryModel.listing = null;
        
        //resetting
         if(this.countryModel.latestAnnouncements){
          this.countryModel.latestAnnouncements = null;
         }
         if(this.countryModel.hotOnFacebook){
          this.countryModel.hotOnFacebook = null;
         }
         if(this.countryModel.mostRead){
          this.countryModel.mostRead = null;
         }
      }
      if(data['entries'] != null && data['entries'].length){
        this.fetch_listing_data(data['entries'], this.pageNumber);
      }else{
        this.hasMoreToLoad = false;
      }
      this.myFunctions.new_content_formatting();
      this.startScrollLoading = true;
      //this.countryModel.articleIds = data['articleIds'];
      this.pageNumber++;
      
      this.isLoadingMore = false;
    });
  } @HostListener("window:scroll", [])
  onWindowScroll() {
    //console.log(this.startScrollLoading);
    
    
    if(this.startScrollLoading){
      //Latest Announcements
      if(this.myFunctions.is_dom_in_view('#latest-announcements-container', 500)){
          if(!this.isAnnouncementsLoaded && this.pageNumber > 2){
             this.isAnnouncementsLoaded = true;
            this.http.get(_globals.API_URL + 'Data/GetCountryLatestAnnouncements?countryId=' + this.countryId + '&idsToRemove=' + this.countryModel.articleIds).subscribe((data:any) =>{
              this.countryModel.latestAnnouncements = data['entries'];
              //this.homeModel.articleIds = data['articleIds'];  
            });
          }        
      }
      //Hot Section
      if(this.myFunctions.is_dom_in_view('#hot-most-read', 500)){
          if(!this.isHotAndMostRecentLoaded && this.pageNumber > 1){
             this.isHotAndMostRecentLoaded = true;

            // this.isLoadingMore = true; 
            this.http.get(_globals.API_URL + 'Data/GetCountryHotStories?countryId=' + this.countryId + '&idsToRemove=' + this.countryModel.articleIds).subscribe((data:any) =>{
              this.countryModel.hotOnFacebook = data['hotOnFacebook'];
              this.countryModel.mostRead = data['mostRead'];   
              //this.homeModel.articleIds = data['articleIds']; 
            //  this.isLoadingMore = false;       
              this.myFunctions.load_category_hot_section();
            });
          }
        
      }
      //Load more
      if(this.hasMoreToLoad && this.myFunctions.is_dom_in_view('#load-more-container', 600)){
        if(!this.isLoadingMore && this.pageNumber < 2){
          this.isLoadingMore = true;
          this.get_articles(false);
        }
      }

    }
  }


}


interface CountryModel{
  id:number;
  hasTemplate:boolean;
  title:string;
  arTitle:string;
  about:string;
  image:string;
  customUrlTitle:string;
  banner:BannerModel;
  regression:{
    populationTitle:string;
    populationNb:string;
    populationMillion:string;
  };
  marker:MapMarker;
  page:PageModel;
  slideshow:ArticleModel[];
  mostRecent:ArticleModel[];
  info:LabelValueModel[];
  moreFeatured:ArticleModel[];
  moreRecent:ArticleModel[];
  jadNavigation:JadNavigationWidget[];
  listing:ArticleModel[];
  latestAnnouncements:ArticleModel[];
  hotOnFacebook:ArticleModel[];
  mostRead:ArticleModel[];
  photography:ArticleModel;
  video:ArticleModel;
  jadalicious:ArticleModel[];
  articleIds:string;
}

