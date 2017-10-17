import { Component, OnInit, Input } from '@angular/core';

import {ArticleModel} from '../../includes/Models';
import {_globals} from '../../includes/globals';
@Component({
  selector: '[tiny-post]',
  templateUrl: './tiny-post.component.html',
  styleUrls: ['./tiny-post.component.css']
})
export class TinyPostComponent implements OnInit {

  RESIZED_CONTENT_PATH:string;
  @Input() item:ArticleModel;
  @Input() imageSize:string;
  @Input() truncate:number;

  constructor() { }

  ngOnInit() {
    this.RESIZED_CONTENT_PATH = _globals.RESIZED_CONTENT_PATH;
    this.truncate = this.truncate ? this.truncate : 80;
    this.imageSize = this.imageSize ? this.imageSize : '60x58xo/';
  }

}
