import { Component, OnInit, HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

import { SharedService } from '../../services/shared.service';
import { FunctionsService } from '../../services/functions.service';

import { _globals } from '../../includes/globals';
import { ArticleModel, SocialMedia, SharedModel, MapMarker, PageModel } from '../../includes/Models';
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

  constructor(private http: HttpClient, private route: ActivatedRoute, private sharedService:SharedService, private myFunctions:FunctionsService) { }

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
    this.sharedService.set_categoryTitle("");
    this.sharedService.alter_wrapper_classes('');
    this.route.params.subscribe(params => {
        this.countryId = params['id'];
        
        this.http.get(_globals.API_URL + 'Data/GetCountryInit?countryId=' + this.countryId).subscribe((data:any) => {
          this.countryModel = data;
          this.sharedService.set_country({'id': this.countryId, 'title' : data.title, 'arTitle' : data.arTitle, 'hasTemplate' : data.hasTemplate, 'image' : data.image});
        });
    });
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
  regression:{
    populationTitle:string;
    populationNb:string;
    populationMillion:string;
  };
  marker:MapMarker;
  page:PageModel;
  slideshow:ArticleModel[];
  mostRecent:ArticleModel[];
  info:[{'key' : string, 'value' : string}];
  moreFeatured:ArticleModel[];
  moreRecent:ArticleModel[];
  jadNavigation:[{
    id:number;
    title:string;
  }];
  listing:ArticleModel[];
  latestAnnouncements:ArticleModel[];
  hotOnFacebook:ArticleModel[];
  mostRead:ArticleModel[];
  photography:ArticleModel;
  video:ArticleModel;
  jadalicious:ArticleModel[];
  articleIds:string;
}

