import { Component, OnInit, Input } from '@angular/core';

import {FunctionsService} from '../../../services/functions.service';

import {ArticleModel} from '../../../includes/Models';
import {_globals} from '../../../includes/globals';
@Component({
  selector: '[more-stories-widget]',
  templateUrl: './more-stories.component.html',
  styleUrls: ['./more-stories.component.css']
})
export class MoreStoriesComponent implements OnInit {

  RESIZED_CONTENT_PATH:string;
  @Input() featured;
  @Input() recent;
  @Input() isArabic:boolean = false;
  constructor(private myFunctions:FunctionsService) { }

  ngOnInit() {
    this.RESIZED_CONTENT_PATH = _globals.RESIZED_CONTENT_PATH;
    this.myFunctions.more_stories_widget();
  }

}
