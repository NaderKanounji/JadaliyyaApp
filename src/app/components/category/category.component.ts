import { Component, OnInit, HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

import { SharedService } from '../../services/shared.service';
import { FunctionsService } from '../../services/functions.service';

import { SortPipe } from '../../pipes/sort.pipe';

import { _globals } from '../../includes/globals';
import { ArticleModel, SocialMedia, SharedModel } from '../../includes/Models';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  CONTENT_PATH:string;
  RESIZED_CONTENT_PATH:string;
  VOX_POPULI_CATEGORY_TEMPLATE:number;
  PHOTOGRAPHY_CATEGORY_TEMPLATE:number;
  ARABIC_SECTION_ID:number;

  categoryId:any;
  categoryModel:CategoryModel;
  sharedModel:SharedModel;
  //pageListing:ArticleModel[];
  socialMedia:SocialMedia[];
   listingModel:ListingModel;

   isDefaultTemplate:boolean = true;
   isEditorPick:boolean = false;
   pageNumber:number = 0;
   isArabicSection:boolean = false;
   isSubCategory:boolean = false;
   //--Flags
   startScrollLoading:boolean = false;
   isHotAndMostRecentLoaded:boolean = false;
   isLoadingMore:boolean = false;
   hasMoreToLoad:boolean = true;
   isAnnouncementsLoaded:boolean = false;

   typeId:string = "";

  constructor(private http: HttpClient, private route: ActivatedRoute, private sharedService:SharedService, private myFunctions:FunctionsService, private sort:SortPipe) { }

  ngOnInit() {
    this.CONTENT_PATH = _globals.CONTENT_PATH;
    this.RESIZED_CONTENT_PATH = _globals.RESIZED_CONTENT_PATH;
    this.VOX_POPULI_CATEGORY_TEMPLATE = _globals.VOX_POPULI_CATEGORY_TEMPLATE;
    this.PHOTOGRAPHY_CATEGORY_TEMPLATE = _globals.PHOTOGRAPHY_CATEGORY_TEMPLATE;
    this.ARABIC_SECTION_ID = _globals.ARABIC_SECTION_ID;

    this.sharedService.sharedModel.subscribe(sharedModel => this.socialMedia = sharedModel.socialMedia);
    this.sharedService.set_currentRoute("category");
    this.sharedService.set_categoryTitle("");
    this.sharedService.alter_wrapper_classes('');
    this.sharedService.set_categoryId(null);
    this.sharedService.set_customUrlTitle('');

    this.listingModel = {
      mainArticle:null,
      primaryList:null,
      hotOnFacebook:null,
      mostRead:null,
      loadMoreArticles:null,
      video:null,
      photography:null,
      latestAnnouncements:null,
      jadalicious:null
    };
    
    this.route.params.subscribe(params => {
      this.categoryId = params['id'];
      //Check if arabic section page
      if(this.categoryId == this.ARABIC_SECTION_ID){
        this.isArabicSection = true;
        this.isSubCategory = true;
        if(params['subId']){
          //get sub category
          this.categoryId = params['subId']
        }
      }
      this.sharedService.set_categoryId(this.categoryId);
      this.sharedService.set_isArabicSection(this.isArabicSection);
     

      //Check if roundups
      if(this.categoryId == _globals.ROUNDUPS_CATEGORY_ID){
        this.sharedService.set_customUrlTitle(params['customUrlTitle']);
        if(params['customUrlTitle'] == _globals.ROUNDUPS_MEDIA_URL_TITLE){
          this.typeId = _globals.ROUNDUPS_MEDIA_DISPLAY_ID.toString();
        }
        if(params['customUrlTitle'] == _globals.ROUNDUPS_MONTHLY_URL_TITLE){
          this.typeId = _globals.ROUNDUPS_MONTHLY_DISPLAY_ID.toString();
        }
      }

      //Initial category call
      this.http.get(_globals.API_URL + "Data/GetCategoryInit?catId=" + this.categoryId + '&isSubCategory=' + this.isSubCategory  + (this.typeId && this.typeId != "" ? '&typeId=' + this.typeId : '') ).subscribe((data:any) =>{
        this.categoryModel = data;

        this.sharedService.set_categoryTitle(this.isArabicSection ? 'القسم العربي' : data['title']);

        this.isDefaultTemplate = data['templateId'] != this.VOX_POPULI_CATEGORY_TEMPLATE && data['templateId'] != this.PHOTOGRAPHY_CATEGORY_TEMPLATE;

         this.fetch_listing_data(data['recentStories'], data['templateId']);
          setTimeout(() => {
            this.pageNumber++;
            this.myFunctions.load_init_category_page();
            this.startScrollLoading = true;
          },200);
      });
    });
  }

  fetch_listing_data(all:ArticleModel[], templateId:number = 0){
    
    switch(templateId){
      case this.PHOTOGRAPHY_CATEGORY_TEMPLATE:
        this.listingModel.primaryList = this.sort.transform(all, 1, 1, false, 0, 0);
        break;
      case this.VOX_POPULI_CATEGORY_TEMPLATE:
        all = all.sort((a:ArticleModel, b:ArticleModel) => { // sorts by isArabic (false then true)
          return a.isArabic != b.isArabic ?(a.isArabic? 1 : -1) : 0; //sumamry : 1 = flip cells -1 = do not flip & 0 = same values
        });
        this.listingModel.primaryList = all.slice(0,1).concat(this.sort.transform(all.slice(1), 2, 1, true, 0, 0));
        break;
      default:
        if(this.isArabicSection && this.isSubCategory){
          this.listingModel.primaryList = all;
        }else{
          if(this.isArabicSection){
            this.listingModel.mainArticle = all[0];
            this.listingModel.primaryList = all.slice(1);
          }else{
            all = all.sort((a:ArticleModel, b:ArticleModel) => { // sorts by isArabic (false then true)
              return a.isArabic != b.isArabic ?(a.isArabic? 1 : -1) : 0; //sumamry : 1 = flip cells -1 = do not flip & 0 = same values
            });
            this.listingModel.mainArticle = all[0];
            this.listingModel.primaryList = this.sort.transform(all.slice(1), 2, 1, true, 0, 0);
          }
        }
        break;
    }
  }

  @HostListener("window:scroll", [])
  onWindowScroll() {
    //console.log(this.startScrollLoading);
    
    
    if(this.startScrollLoading){
      //Hot Section
      if(this.myFunctions.is_dom_in_view('#hot-most-read', 500)){
          if(!this.isHotAndMostRecentLoaded){
            this.isHotAndMostRecentLoaded = true;
            this.http.get(_globals.API_URL + 'Data/GetCategoryHotStories?catId=' + this.categoryId + '&isEditorPick=' + this.isEditorPick + (this.typeId && this.typeId != "" ? '&typeId=' + this.typeId : '')).subscribe((data:any) =>{
              this.listingModel.hotOnFacebook = data['hotOnFacebook'];
              this.listingModel.mostRead = data['mostRead'];   
              this.categoryModel.articleIds = data['articleIds'];        
              this.myFunctions.load_category_hot_section();
            });
          }
        
      }
      //Latest Announcements
      if(this.myFunctions.is_dom_in_view('#latest-announcements-container', 500)){
        if(!this.isAnnouncementsLoaded && this.pageNumber > 2){
          this.isAnnouncementsLoaded = true;
          this.http.get(_globals.API_URL + 'Data/GetCategoryLatestAnnouncements?catId=' + this.categoryId).subscribe((data:any) =>{
            this.listingModel.latestAnnouncements = data['entries'];
            //this.homeModel.articleIds = data['articleIds'];  
          });
        }

      }
      //Load more
      if(this.hasMoreToLoad && this.myFunctions.is_dom_in_view('#load-more-container', 300)){
          if(!this.isLoadingMore){
            this.isLoadingMore = true;
            this.http.get(_globals.API_URL + 'Data/GetCategoryListing?catId=' + this.categoryId + '&isEditorPick=' + this.isEditorPick + '&page=' + this.pageNumber + '&idsToRemove=' + this.categoryModel.articleIds +'&isSubCategory=' + this.isSubCategory + (this.typeId && this.typeId != "" ? '&typeId=' + this.typeId : '')).subscribe((data:any) =>{
              if(data['entries'] != null && data['entries'].length){
                if(this.categoryModel.templateId == this.VOX_POPULI_CATEGORY_TEMPLATE){
                  let all = data['entries'].sort((a:ArticleModel, b:ArticleModel) => { // sorts by isArabic (false then true)
                    return a.isArabic != b.isArabic ?(a.isArabic? 1 : -1) : 0; //sumamry : 1 = flip cells -1 = do not flip & 0 = same values
                  });
                  if(this.pageNumber > 1){
                    this.listingModel.loadMoreArticles = this.listingModel.loadMoreArticles.concat(all.slice(0,1).concat(this.sort.transform(all.slice(1), 2, 1, true, 0, 0)));
                  }else{
                    this.listingModel.loadMoreArticles = all.slice(0,1).concat(this.sort.transform(all.slice(1), 2, 1, true, 0, 0)); 
                  }
                }else{     
                  if(this.isArabicSection && this.isSubCategory){
                    if(this.pageNumber > 1){
                      this.listingModel.loadMoreArticles = this.listingModel.loadMoreArticles.concat(data['entries']);    
                    }else{
                      this.listingModel.loadMoreArticles = data['entries']; 
                    }
                  }else{
                    let enTake = 2, arTake = 1;
                    if(this.categoryModel.templateId == this.PHOTOGRAPHY_CATEGORY_TEMPLATE){
                      enTake = 1;
                      arTake = 1;
                    }
                    if(this.pageNumber > 1){
                      this.listingModel.loadMoreArticles = this.listingModel.loadMoreArticles.concat(this.sort.transform(data['entries'], enTake, arTake, false, 0, 0));    
                    }else{
                      this.listingModel.loadMoreArticles = this.sort.transform(data['entries'], enTake, arTake, false, 0, 0); 
                    }
                  }           
                  
                }
              }else{
                this.hasMoreToLoad = false;
              }
              console.log(this.listingModel);
              
              // console.log(data['entries']);
              // console.log(this.listingModel.loadMoreArticles);
              
              this.categoryModel.articleIds = data['articleIds'];
              this.pageNumber++;
              
              this.isLoadingMore = false;
            });
          }
        
      }
    }
  }
  fetch_new_listing(isEditorPick){
    if(isEditorPick != this.isEditorPick){
      this.isEditorPick = isEditorPick;
      this.isLoadingMore = true;
      //Empty ids
      let ids:number[] = this.categoryModel.articleIds != "" ? this.categoryModel.articleIds.split(',').map(function(a){return parseInt(a)}) : [];
      let articlesIdsArr:number[] = this.listingModel.primaryList.map(function(a){return a.id});
      if(this.listingModel.mainArticle != undefined){
        articlesIdsArr.push(this.listingModel.mainArticle.id);        
      }
      if(this.listingModel.hotOnFacebook != null && this.listingModel.hotOnFacebook.length){
        articlesIdsArr = articlesIdsArr.concat(this.listingModel.hotOnFacebook.map(function(a){return a.id}));
      }
      if(this.listingModel.mostRead != null && this.listingModel.mostRead.length){
        articlesIdsArr = articlesIdsArr.concat(this.listingModel.mostRead.map(function(a){return a.id}));
      }
      if(this.listingModel.loadMoreArticles != null && this.listingModel.loadMoreArticles.length){
        articlesIdsArr = articlesIdsArr.concat(this.listingModel.loadMoreArticles.map(function(a){return a.id}));
      }
      ids = ids.filter(function(a){
        return articlesIdsArr.indexOf(a) < 0;
      });
      
      this.categoryModel.articleIds = ids.join(',');
      this.hasMoreToLoad = true;
      this.http.get(_globals.API_URL + 'Data/GetCategoryListing?catId=' + this.categoryId + '&isEditorPick=' + this.isEditorPick + '&page=0&idsToRemove=' + this.categoryModel.articleIds + '&isSubCategory=' + this.isSubCategory + (this.typeId && this.typeId != "" ? '&typeId=' + this.typeId : '')).subscribe((data:any) => {
        
      this.isAnnouncementsLoaded = false;
        if(data['entries'] == null || !data['entries'].length){
          this.hasMoreToLoad = false;
        }
        this.fetch_listing_data(data['entries'],this.categoryModel.templateId);        
        this.listingModel.loadMoreArticles = [];
        this.categoryModel.articleIds = data['articleIds'];
        this.pageNumber = 1;
        this.isLoadingMore = false;
        this.isHotAndMostRecentLoaded = false;
      });
    }
  }
}


interface ListingModel{
  mainArticle:ArticleModel;
  primaryList:ArticleModel[];
  hotOnFacebook:ArticleModel[];
  mostRead:ArticleModel[];
  loadMoreArticles:ArticleModel[];
  photography:ArticleModel;
  video:ArticleModel;
  jadalicious:ArticleModel[];
  latestAnnouncements:ArticleModel[];
}



interface CategoryModel{
  isArabicSection:boolean;
  id:number;
  templateId:number;
  title:string;
  about:string;
  articleIds:string;
  youtubeLink:string;
  slideshow:ArticleModel[];
  mostRecent:ArticleModel[];
  moreFeatured:ArticleModel[];
  moreRecent:ArticleModel[];
  filmReviews:ArticleModel[];
  
}

