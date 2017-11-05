import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

import { SharedService } from '../../services/shared.service';
import { FolderService } from '../../services/folder.service';
import { FunctionsService } from '../../services/functions.service';
import { MembershipService } from '../../services/membership.service';

import { _globals } from '../../includes/globals';
import { SharedModel, ArticleModel  } from '../../includes/Models';

@Component({
  selector: 'app-account-articles',
  templateUrl: './account-articles.component.html',
  styleUrls: ['./account-articles.component.css']
})
export class AccountArticlesComponent implements OnInit {


  RESIZED_CONTENT_PATH:string;
  
  sharedModel:SharedModel;
  isPublishedSection:boolean = true;
  // initLoadDone:boolean = false;
  articles:ArticleModel[];

  constructor(private route:ActivatedRoute, private membership: MembershipService, private folder:FolderService, private myFunctions:FunctionsService, private http:HttpClient, private sharedService: SharedService) { }

  ngOnInit() {
    this.RESIZED_CONTENT_PATH = _globals.RESIZED_CONTENT_PATH;

    this.sharedService.sharedModel.subscribe((sharedModel:any) => this.sharedModel = sharedModel);

    this.sharedService.set_currentRoute("published-articles");
    this.sharedService.set_headerType("header-secondary");
    this.sharedService.set_categoryTitle("My Articles");
    
    this.route.params.subscribe(params => {
      if(params['title']){
        if(params['title'].toLowerCase() == 'unpublished'){
          this.isPublishedSection = false;
          this.sharedService.set_currentRoute("unpublished-articles");
        }
      }
      this.http.get(_globals.API_URL + 'Data/GetWriterArticles?isPublished=' + this.isPublishedSection).subscribe((data:any) => {
        
            this.articles = data;
            this.myFunctions.psy_popup();
            
          });
      
    });
    
  }

}
