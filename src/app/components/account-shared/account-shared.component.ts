import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { SharedService } from '../../services/shared.service';
import { FolderService } from '../../services/folder.service';
import { FunctionsService } from '../../services/functions.service';
import { MembershipService } from '../../services/membership.service';

import { _globals } from '../../includes/globals';
import { SharedModel, SharedWithMeModel  } from '../../includes/Models';

@Component({
  selector: 'app-account-shared',
  templateUrl: './account-shared.component.html',
  styleUrls: ['./account-shared.component.css']
})
export class AccountSharedComponent implements OnInit {


  RESIZED_CONTENT_PATH:string;
  
  sharedModel:SharedModel;
  initLoadDone:boolean = false;
  sharedWithMeModel:SharedWithMeModel[];

  constructor(private membership: MembershipService, private folder:FolderService, private myFunctions:FunctionsService, private http:HttpClient, private sharedService: SharedService) { }

  ngOnInit() {
    this.RESIZED_CONTENT_PATH = _globals.RESIZED_CONTENT_PATH;

    this.sharedService.sharedModel.subscribe((sharedModel:any) => this.sharedModel = sharedModel);
    this.folder.sharedWithModel.subscribe((sharedWithMeModel:any) => this.sharedWithMeModel = sharedWithMeModel);

    this.sharedService.set_currentRoute("shared-with-me");
    this.sharedService.set_headerType("header-secondary");
    this.sharedService.set_categoryTitle("My Favorites");
    this.sharedService.set_displayActions(true);

    this.folder.InitSharedWithMe().subscribe((data:any) => {

      this.folder.setSharedWithMe(data);
      
      // if(this.favoritesModel.folders.length){
      //   this.sharedService.set_displayActions(true);
      // }
      this.initLoadDone = true;
      this.myFunctions.accordion_init();
      this.myFunctions.psy_popup();
      
    });
  }

}
