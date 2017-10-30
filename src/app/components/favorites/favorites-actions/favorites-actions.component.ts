import { Component, OnInit } from '@angular/core';
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
  ngOnInit() {
    this.folder.favoritesModel.subscribe(favoritesModel => this.favoritesModel = favoritesModel);
  }

  delete(e){
    e.stopPropagation();
      let foldersToDelete = this.myFunctions.get_selected_folders();
      let articlesToDelete = this.myFunctions.get_selected_articles();
      console.log(foldersToDelete);
      console.log(articlesToDelete);
      
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
}
