import { Component, OnInit, Input} from '@angular/core';
import { ActivatedRoute} from '@angular/router';

import { FunctionsService } from '../../../services/functions.service';
import { MembershipService } from '../../../services/membership.service';

import { FolderModel } from '../../../includes/Models';
@Component({
  selector: 'app-favorite-popup',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent implements OnInit {

  userFolders:FolderModel[];
  isDropdownOpen:boolean = false;
  isLoadingFolders:boolean = false;
  isAddingArticle:boolean = false;
  @Input() articleId:number;
  @Input() articleTitle:string;
  newFolder:FolderModel;
  formErrors:string[] = [];
  constructor(private route: ActivatedRoute, private myFunctions: FunctionsService, private membership: MembershipService) {
    this.newFolder = {
      articles:null,
      id:null,
      title:''
    }
   }

  ngOnInit() {
    
  }

  dispay_folders(e){
    e.stopPropagation();
    if(this.isDropdownOpen){
      this.myFunctions.close_popupDropdown();
      this.isDropdownOpen = false;
    }else{
      this.isLoadingFolders = true;
      this.isDropdownOpen = true;
      this.membership.GetAllFolders().subscribe((data:any) => {
        this.userFolders = data;
        this.isLoadingFolders = false;
        this.myFunctions.open_popupDropdown();
      });
    }
  }
  // create_folder(e){
  //   e.stopPropagation();
  // }
  create_folder_and_add_article(e, newFolder:FolderModel){
    e.stopPropagation();
    this.formErrors = [];
    if(newFolder.title && newFolder.title != ""){
      this.membership.CreateFolderWithArticle(newFolder.title, this.articleId).subscribe((data:any) => {
        this.myFunctions.close_popupDropdown();
        this.isDropdownOpen = false;
        this.myFunctions.close_popupDropdown();
        this.newFolder.title = '';
        this.myFunctions.psy_open_popup('popup-added-to-fav');
        setTimeout(() => {
          this.myFunctions.close_popup();
        }, 5000);
  
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

  add_article_to_folder(e){
    e.stopPropagation();
    this.formErrors = [];
    let folderId = this.myFunctions.get_popup_dropdown_selected();
    if(folderId && folderId != ''){
      this.isAddingArticle = true;
      this.membership.AddToFolder(folderId, this.articleId).subscribe((data:any) => {
        this.myFunctions.close_popupDropdown();
        this.isDropdownOpen = false;
        this.myFunctions.close_popupDropdown();
        this.myFunctions.psy_open_popup('popup-added-to-fav');
        this.isAddingArticle = false;
        setTimeout(() => {
          this.myFunctions.close_popup();
        }, 5000);
      }, (err:any) => {
        //console.log(err);
        
        if(err.error.message){
          this.formErrors.push(err.error.message);
        }else{
          this.formErrors.push(err.error);
        }
        this.isAddingArticle = false;
      });
    }else{
      this.formErrors.push('Select a folder first');
    }
  }
}
