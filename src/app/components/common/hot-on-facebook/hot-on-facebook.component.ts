import { Component, OnInit, Input } from '@angular/core';

import { _globals } from '../../../includes/globals';
import { ArticleModel } from '../../../includes/Models';
@Component({
  selector: '[hot-on-facebook]',
  templateUrl: './hot-on-facebook.component.html',
  styleUrls: ['./hot-on-facebook.component.css']
})
export class HotOnFacebookComponent implements OnInit {

  RESIZED_CONTENT_PATH:string;
  @Input() model:{
    hotOnFacebook:ArticleModel[],
    mostRead:ArticleModel[]
  }

  constructor() { }

  ngOnInit() {
    this.RESIZED_CONTENT_PATH = _globals.RESIZED_CONTENT_PATH;
  }

}
