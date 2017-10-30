import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { SharedService } from '../../services/shared.service';
import { FolderService } from '../../services/folder.service';
import { FunctionsService } from '../../services/functions.service';

import { _globals } from '../../includes/globals';
import { SharedModel, FolderModel, FavoritesModel } from '../../includes/Models';
@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

  RESIZED_CONTENT_PATH:string;
  BASE_URL:string;

  sharedModel:SharedModel;
  favoritesModel:FavoritesModel;
  initLoadDone:boolean = false;

  constructor(private folder:FolderService, private myFunctions:FunctionsService, private http:HttpClient, private sharedService: SharedService) { 
    this.favoritesModel = {
      folders:null,
    }

  }

  ngOnInit() {
    this.RESIZED_CONTENT_PATH = _globals.RESIZED_CONTENT_PATH;
    this.BASE_URL = _globals.BASE_URL;
    
    
    this.sharedService.sharedModel.subscribe((sharedModel:any) => this.sharedModel = sharedModel);
    this.folder.favoritesModel.subscribe((favoritesModel:any) => this.favoritesModel = favoritesModel);

    this.sharedService.set_currentRoute("favorites");
    this.sharedService.set_headerType("header-secondary");
    this.sharedService.set_categoryTitle("My Favorites");

    this.folder.InitFavorites().subscribe((data:any) => {
      this.folder.setFolders(data);
      console.log(this.favoritesModel);
      
      if(this.favoritesModel.folders.length){
        this.sharedService.set_displayActions(true);
      }
      this.initLoadDone = true;
      this.myFunctions.accordion_init();
    });
    //this.sharedService.set_displayActions(true);    
  }

}