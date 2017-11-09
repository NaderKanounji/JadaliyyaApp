import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

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
  constructor(private route:ActivatedRoute, private sharedService:SharedService, private http:HttpClient) { 

    this.model = {
      countryId:null,
      categoryId:null,
      writerId:null,
      articles:null,
      keyword:'',
      total:0
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
      this.model.keyword = params['keyword'] ? params['keyword'] : '';
      this.model.categoryId = params['categoryId'] ? params['categoryId'] : '';
      this.model.countryId = params['countryId'] ? params['countryId'] : '';
      this.model.writerId = params['writerId'] ? params['writerId'] : '';
      this.sharedService.set_categoryTitle('Search Results For “ ' + this.model.keyword + ' ” ');
      this.sharedService.set_searchCount(this.model.total);

      
      this.http.get(_globals.API_URL + 'Data/SearchArticles?page=0' 
      + (this.model.keyword ? '&keyword=' + this.model.keyword : '')
      + (this.model.categoryId ? '&categoryId=' + this.model.categoryId : '')
      + (this.model.countryId ? '&countryId=' + this.model.countryId : '')
      + (this.model.writerId ? '&writerId=' + this.model.writerId : ''))
      .subscribe((data:any) => {
        this.model = data;
        this.sharedService.set_searchCount(this.model.total);
        
      });

    });

  }

}
