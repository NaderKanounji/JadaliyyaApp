import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { SharedService } from '../../services/shared.service';
import { FolderService } from '../../services/folder.service';
import { FunctionsService } from '../../services/functions.service';
import { MembershipService } from '../../services/membership.service';

import { _globals } from '../../includes/globals';
import { SharedModel, FolderModel, FavoritesModel } from '../../includes/Models';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

  RESIZED_CONTENT_PATH:string;

  sharedModel:SharedModel;
  favoritesModel:FavoritesModel;
  initLoadDone:boolean = false;
  formErrors:string[];
  shareFormErrors:string[];
  newFolder:FolderModel;
  shareEmail:string;
  isAddingFolder:boolean = false;
  isRenamingFolder:boolean = false;
  shareSubmitted:boolean = false;

  constructor(private membership: MembershipService, private folder:FolderService, private myFunctions:FunctionsService, private http:HttpClient, private sharedService: SharedService) { 
    this.favoritesModel = {
      folders:null,
    }
    this.newFolder = {
      id:null,
      title:null,
      articles:null
    }

  }

  ngOnInit() {
    this.RESIZED_CONTENT_PATH = _globals.RESIZED_CONTENT_PATH;
    
    
    this.sharedService.sharedModel.subscribe((sharedModel:any) => this.sharedModel = sharedModel);
    this.folder.favoritesModel.subscribe((favoritesModel:any) => this.favoritesModel = favoritesModel);

    this.sharedService.set_currentRoute("favorites");
    this.sharedService.set_headerType("header-secondary");
    this.sharedService.set_categoryTitle("My Favorites");

    this.folder.InitFavorites().subscribe((data:any) => {
      this.folder.setFolders(data);
      //console.log(this.favoritesModel);
      
      if(this.favoritesModel.folders.length){
        this.sharedService.set_displayActions(true);
      }
      this.initLoadDone = true;
      this.myFunctions.accordion_init();
      this.myFunctions.psy_popup();
    });
    //this.sharedService.set_displayActions(true);    
  }

  create_folder(e, newFolder:FolderModel){
    e.stopPropagation();
    this.formErrors = [];
    if(newFolder.title && newFolder.title != ""){
      this.isAddingFolder = true;
      this.membership.CreateFolder(newFolder.title).subscribe((data:FolderModel) => {
        this.folder.AddFolder(data);
        this.isAddingFolder =false;
        this.myFunctions.close_popup();
        this.newFolder.title = '';
  
      }, (err:any) => {
        //console.log(err);
        if(err.error.message){
          this.formErrors.push(err.error.message);
        }else{
          this.formErrors.push(err.error);
        }
      });
    }

  }
  rename_folder(e, newFolder:FolderModel){
    e.stopPropagation();
    this.formErrors = [];
    let folder = this.myFunctions.get_selected_folders();
    if(newFolder.title && newFolder.title != "" && folder && folder != ''){
      this.isRenamingFolder = true;
      this.membership.RenameFolder(parseInt(folder), newFolder.title).subscribe((data:FolderModel) => {
        this.folder.RenameFolder(data);
        this.isRenamingFolder =false;
        this.myFunctions.close_popup();
        this.newFolder.title = '';
  
      }, (err:any) => {
        this.isRenamingFolder = false;
        //console.log(err);
        if(err.error.message){
          this.formErrors.push(err.error.message);
        }else{
          this.formErrors.push(err.error);
        }
      });
    }

  }
  

  share_with_friends(e, shareForm:any){
    this.shareFormErrors = [];
    this.shareSubmitted = true;
    let folders = this.myFunctions.get_selected_folders();
    let articles = this.myFunctions.get_selected_articles();
    let first = folders != '' && articles != '';
    if(folders != ''){
      this.membership.ShareFoldersWithFriend(folders, shareForm.email).subscribe((data:any) => {
        if(first){
          first = false;
        }else{
          this.after_share_actions();
        }
      }, (err:any) => {
        this.shareSubmitted = false;
        if(err.error.message){
          this.shareFormErrors.push(err.error.message);
        }else{
          this.shareFormErrors.push(err.error);
        }
      });
    }
    if(articles != ''){
      this.membership.ShareArticlesWithFriend(articles, shareForm.email).subscribe((data:any) => {
        if(first){
          first = false;
        }else{
          this.after_share_actions();
        }
      }, (err:any) => {
        this.shareSubmitted = false;
        if(err.error.message){
          this.shareFormErrors.push(err.error.message);
        }else{
          this.shareFormErrors.push(err.error);
        }
      });
    }
  }

  after_share_actions(){    
    this.shareSubmitted = false;
    this.shareEmail = '';
    this.myFunctions.close_popup();
    this.sharedService.set_messagePopup('THANK YOU!<br/>AN EMAIL HAS BEEN SENT TO YOUR FRIEND.');
    this.myFunctions.psy_open_popup('popup-message');
  }
}