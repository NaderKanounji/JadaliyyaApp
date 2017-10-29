import { Component, OnInit } from '@angular/core';

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
  constructor(private myFunctions: FunctionsService, private membership: MembershipService) { }

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
  create_folder(e){
    e.stopPropagation();
  }

}
