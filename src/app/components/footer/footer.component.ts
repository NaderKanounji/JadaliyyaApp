import { Component, OnInit, Input } from '@angular/core';
import { SharedService } from '../../services/shared.service';

import {_globals} from '../../includes/globals';
import {SharedModel, GlobalModel, SocialMedia} from '../../includes/Models';

@Component({
  selector: 'footer-component',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  ARABIC_SECTION_ID:number;
  @Input() globalModel:GlobalModel;
  sharedModel:SharedModel;
  constructor(private sharedService:SharedService) { }

  ngOnInit() {
    this.ARABIC_SECTION_ID = _globals.ARABIC_SECTION_ID;
    //console.log('123');
    
    this.sharedService.sharedModel.subscribe(sharedModel => this.sharedModel = sharedModel);
    
    //console.log('456');
    //console.log("footer" + this.sharedModel);
    
  }

}
