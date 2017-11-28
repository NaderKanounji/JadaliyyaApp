import { Component, OnInit, HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

import { SortPipe } from '../../pipes/sort.pipe';
import { SharedService } from '../../services/shared.service';
import { FunctionsService } from '../../services/functions.service';

import { _globals } from '../../includes/globals';
import { SharedModel, SearchModel } from '../../includes/Models';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  RESIZED_CONTENT_PATH:string;
  BASE_URL:string;

  model:SearchModel;
  sharedModel:SharedModel;
  hasMoreToLoad:boolean = true;
  isLoadingMore:boolean = true;
  pageNumber:number = 0;
  constructor(private sort:SortPipe, private myFunctions: FunctionsService, private route:ActivatedRoute, private sharedService:SharedService, private http:HttpClient) { 

    this.model = {
      countryId:null,
      categoryId:null,
      writerId:null,
      articles:null,
      keyword:'',
      total:0,
      month:null
    }
  }

  ngOnInit() {
    this.RESIZED_CONTENT_PATH = _globals.RESIZED_CONTENT_PATH;
    this.BASE_URL = _globals.BASE_URL;

    this.sharedService.sharedModel.subscribe(sharedModel => this.sharedModel = sharedModel);
    //GetFilterCriteria
    //SearchArticles
    this.sharedService.set_currentRoute("search");
    this.sharedService.set_headerType("header-secondary");
    this.sharedService.set_searchCount(0);

    this.route.queryParams.subscribe((params:any) => {
      if(params['keyword']){
        this.model.keyword = params['keyword'] ? params['keyword'] : '';
        this.model.categoryId = params['categoryId'] ? params['categoryId'] : '';
        this.model.countryId = params['countryId'] ? params['countryId'] : '';
        this.model.writerId = params['writerId'] ? params['writerId'] : '';
        this.model.month = params['month'] ? params['month'] : '';
        this.sharedService.set_categoryTitle('Search Results For “ ' + this.model.keyword + ' ” ');
        this.model.articles = [];
        this.hasMoreToLoad = true;
        this.isLoadingMore = true;
        this.sharedService.set_searchCount(0);
  
        
        this.http.get(_globals.API_URL + 'Data/SearchArticles?page=0' 
        + (this.model.keyword ? '&keyword=' + this.model.keyword : '')
        + (this.model.categoryId ? '&categoryId=' + this.model.categoryId : '')
        + (this.model.countryId ? '&countryId=' + this.model.countryId : '')
        + (this.model.writerId ? '&writerId=' + this.model.writerId : '')
        + (this.model.month ? '&month=' + this.model.month : ''))
        .subscribe((data:any) => {
          this.model = data;
          this.model.articles = this.sort.transform(this.model.articles, 3, 1, false, 0, 0)
          this.sharedService.set_searchCount(this.model.total);
          
          if(this.model.total <= this.model.articles.length){
            this.hasMoreToLoad = false;
          }else{
            this.pageNumber++;
          }
          this.isLoadingMore = false;
          
        });
      }

    });

  }
  @HostListener("window:scroll", [])
  onWindowScroll() {
    //console.log(this.startScrollLoading);
    
    
    //Load more
    if(this.hasMoreToLoad && this.myFunctions.is_dom_in_view('#load-more-container', 600)){
      if(!this.isLoadingMore){
        this.isLoadingMore = true;
        this.http.get(_globals.API_URL + 'Data/SearchArticles?page=' + this.pageNumber 
        + (this.model.keyword ? '&keyword=' + this.model.keyword : '')
        + (this.model.categoryId ? '&categoryId=' + this.model.categoryId : '')
        + (this.model.countryId ? '&countryId=' + this.model.countryId : '')
        + (this.model.writerId ? '&writerId=' + this.model.writerId : ''))
        .subscribe((data:any) => {
          if(data.articles && data.articles.length > 0){
            this.model.articles = this.model.articles.concat(this.sort.transform(data.articles, 3, 1, false, 0, 0));
          }else{
            this.hasMoreToLoad = false;
          }
          if(this.model.total <= this.model.articles.length){
            this.hasMoreToLoad = false;
          }else{
            this.pageNumber++;
          }
          this.isLoadingMore = false;
        });
      }
    }
      

  }

}
