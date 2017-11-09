import { Component, OnInit, Input } from '@angular/core';
import { MembershipService } from '../../../services/membership.service';
import { FunctionsService } from '../../../services/functions.service';
import { FolderService } from '../../../services/folder.service';
import { SharedService } from '../../../services/shared.service';
import { FavoritesModel } from '../../../includes/Models';

@Component({
  selector: '[app-favorites-actions]',
  templateUrl: './favorites-actions.component.html',
  styleUrls: ['./favorites-actions.component.css']
})
export class FavoritesActionsComponent implements OnInit {

  constructor(private sharedService:SharedService, private folder:FolderService, private membership: MembershipService, private myFunctions: FunctionsService) { }

  favoritesModel:FavoritesModel;
@Input() route:string;
isAddingFolder:boolean = false;
addToFavoriteModel:{
  folders:string;
  articles:string;
  toFolderId:number;
}
  ngOnInit() {
    this.folder.favoritesModel.subscribe(favoritesModel => this.favoritesModel = favoritesModel);
  }

  delete(e, route:string){
    e.stopPropagation();
    if(route == 'shared-with-me'){
      let selectedArticlesInFolders = this.myFunctions.get_selected_articles();
      if(selectedArticlesInFolders != ''){
        this.sharedService.set_messagePopup('You cannot delete articles within a folder');
        this.myFunctions.psy_open_popup('popup-message');
      }else{
        let foldersToDelete = this.myFunctions.get_shared_folders_by_ids();
        let articlesToDelete = this.myFunctions.get_shared_articles_by_ids();
        if(foldersToDelete == '' && articlesToDelete == ''){
          this.sharedService.set_messagePopup('You must select at least 1 folder or article');
          this.myFunctions.psy_open_popup('popup-message');
        }else{
          this.membership.DeleteSharedFoldersAndArticles(foldersToDelete, articlesToDelete).subscribe((data:any) => {
            let foldersIds = data.filter(d => d.isFolder).map(a => a.id);
            let articlesIds = data.filter(d => !d.isFolder).map(a => a.id);
            this.folder.RemoveEntriesFromShares(foldersIds, true);
            this.folder.RemoveEntriesFromShares(articlesIds, false);

            this.sharedService.set_messagePopup('Your selected entries have been removed');
            this.myFunctions.psy_open_popup('popup-message');
          });
        }
          
  
      }
      
    }else{
      let foldersToDelete = this.myFunctions.get_selected_folders();
      let articlesToDelete = this.myFunctions.get_selected_articles_in_folders();
      
      if(foldersToDelete && foldersToDelete != ''){
        this.membership.DeleteFolders(foldersToDelete).subscribe((data:any) => {
          let ids = data.map(a => a.id);
          this.folder.RemoveFolders(ids);
          
        });
      }
      if(articlesToDelete && articlesToDelete != ''){

        this.membership.RemoveArticlesFromFolders(articlesToDelete).subscribe((data:any) => {
          this.folder.RemoveArticlesFromFolders(data);
        });
      }
    }
  }
  rename_popup(e){
    e.stopPropagation();
    let folder = this.myFunctions.get_selected_folders();
    let isValid = true;
    if(!folder || folder == ''){
      this.sharedService.set_messagePopup('You must select a folder first');
      isValid = false;
    }
    if(folder.indexOf(',') > -1){
      this.sharedService.set_messagePopup('Please select one folder only');
      isValid = false;
    }
    if(isValid){
      this.myFunctions.psy_open_popup('popup-rename-folder');
    }else{
      this.myFunctions.psy_open_popup('popup-message');
    }
  }

  open_share(e){
    let folders = this.myFunctions.get_selected_folders();
    let articles = this.myFunctions.get_selected_articles();
    //console.log(folders + ' - ' + articles);
    if(folders != '' || articles != ''){
      this.myFunctions.psy_open_popup('popup-share-to-email');

    }else{
      this.sharedService.set_messagePopup('You must select at least 1 folder or article');
      this.myFunctions.psy_open_popup('popup-message');
    }

  }
  check_favorite(){
    let folders = this.myFunctions.get_selected_folders();
    let articles = this.myFunctions.get_shared_selected_articles();
    if(folders != '' || articles != ''){
      if(folders != ''){
        this.addToFavoriteModel.folders = folders;
      }
      if(articles != ''){
        this.myFunctions.psy_open_popup('popup-add-share-to-fav');
      }else{
        this.favorite(undefined);
      }
    }else{
      this.sharedService.set_messagePopup('You must select at least 1 folder or article');
      this.myFunctions.psy_open_popup('popup-message');
    }
  }
  favorite(e){
    if(e){
      e.preventDefault();
      this.isAddingFolder = true;
    }
    this.membership.FavoriteSharedArticlesAndFolders(this.addToFavoriteModel.folders, this.addToFavoriteModel.articles, this.addToFavoriteModel.toFolderId)
    .subscribe((data:any) => {
      this.sharedService.set_messagePopup('Items successfully added to favorites');
      this.myFunctions.psy_open_popup('popup-message');
      this.isAddingFolder = false;
    }, (err:any) => {
      this.isAddingFolder = false;
    })
  }
}
