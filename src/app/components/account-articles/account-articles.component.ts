import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

import { SharedService } from '../../services/shared.service';
import { FolderService } from '../../services/folder.service';
import { FunctionsService } from '../../services/functions.service';
import { MembershipService } from '../../services/membership.service';

import { _globals } from '../../includes/globals';
import { SharedModel, SharedWithMeModel  } from '../../includes/Models';

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
  sharedWithMeModel:SharedWithMeModel[];

  constructor(private route:ActivatedRoute, private membership: MembershipService, private folder:FolderService, private myFunctions:FunctionsService, private http:HttpClient, private sharedService: SharedService) { }

  ngOnInit() {
    this.RESIZED_CONTENT_PATH = _globals.RESIZED_CONTENT_PATH;

    this.sharedService.sharedModel.subscribe((sharedModel:any) => this.sharedModel = sharedModel);
    this.folder.sharedWithModel.subscribe((sharedWithMeModel:any) => this.sharedWithMeModel = sharedWithMeModel);

    this.sharedService.set_currentRoute("shared-with-me");
    this.sharedService.set_headerType("header-secondary");
    this.sharedService.set_categoryTitle("My Articles");
    this.sharedService.set_displayActions(true);
    this.route.params.subscribe(params => {
      if(params['title']){
        if(params['title'] == 'Unpublished'){
          this.isPublishedSection = false;
        }
      }
      this.http.get(_globals.API_URL + 'Data/GetWriterArticles?isPublished=' + this.isPublishedSection).subscribe((data:any) => {
        
              this.folder.setSharedWithMe(data);
              
              // if(this.favoritesModel.folders.length){
              //   this.sharedService.set_displayActions(true);
              // }
              // this.initLoadDone = true;
              this.myFunctions.accordion_init();
              this.myFunctions.psy_popup();
              
            });
    });
    
  }

}
