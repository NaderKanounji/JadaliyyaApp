import { Component, OnInit, Input } from '@angular/core';

import { FunctionsService } from '../../../services/functions.service';
import { _globals } from '../../../includes/globals';
import { ArticleModel } from '../../../includes/Models';
@Component({
  selector: '[hot-on-facebook]',
  templateUrl: './hot-on-facebook.component.html',
  styleUrls: ['./hot-on-facebook.component.css']
})
export class HotOnFacebookComponent implements OnInit {

  RESIZED_CONTENT_PATH:string;
  BASE_URL:string;
  FACEBOOK_APP_ID:string;
  @Input() model:{
    hotOnFacebook:ArticleModel[],
    mostRead:ArticleModel[]
  }

  constructor(private myFunctions:FunctionsService) { }

  ngOnInit() {
    this.RESIZED_CONTENT_PATH = _globals.RESIZED_CONTENT_PATH;
    this.BASE_URL = _globals.BASE_URL;
    this.FACEBOOK_APP_ID = _globals.FACEBOOK_APP_ID;

    this.myFunctions.load_category_hot_section();
  }

}
