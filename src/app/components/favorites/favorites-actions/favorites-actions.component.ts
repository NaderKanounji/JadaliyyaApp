import { Component, OnInit } from '@angular/core';
import { MembershipService } from '../../../services/membership.service';
import { FunctionsService } from '../../../services/functions.service';
import { FolderService } from '../../../services/folder.service';
import { FavoritesModel } from '../../../includes/Models';

@Component({
  selector: '[app-favorites-actions]',
  templateUrl: './favorites-actions.component.html',
  styleUrls: ['./favorites-actions.component.css']
})
export class FavoritesActionsComponent implements OnInit {

  constructor(private folder:FolderService, private membership: MembershipService, private myFunctions: FunctionsService) { }

  favoritesModel:FavoritesModel;
  ngOnInit() {
    this.folder.favoritesModel.subscribe(favoritesModel => this.favoritesModel = favoritesModel);
  }

  delete($event){
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
}
