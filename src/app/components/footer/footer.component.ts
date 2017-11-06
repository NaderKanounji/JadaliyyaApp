import { Component, OnInit, Input } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { UserService } from '../../services/user.service';

import {_globals} from '../../includes/globals';
import {SharedModel, GlobalModel, SocialMedia, UserModel} from '../../includes/Models';

@Component({
  selector: 'footer-component',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  ARABIC_SECTION_ID:number;
  @Input() globalModel:GlobalModel;
  sharedModel:SharedModel;
  user:UserModel;

  constructor(private sharedService:SharedService, private userService:UserService) { }

  ngOnInit() {
    this.ARABIC_SECTION_ID = _globals.ARABIC_SECTION_ID;
    //console.log('123');
    
    this.sharedService.sharedModel.subscribe(sharedModel => this.sharedModel = sharedModel);
    this.userService.user.subscribe(user => this.user = user);
    
    //console.log('456');
    //console.log("footer" + this.sharedModel);
    
  }

}
