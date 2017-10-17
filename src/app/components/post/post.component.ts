import { Component, OnInit, Input } from '@angular/core';

import {ArticleModel} from '../../includes/Models';
import {_globals} from '../../includes/globals';
@Component({
  selector: 'post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  RESIZED_CONTENT_PATH:string;
  @Input() post:ArticleModel;
  constructor() { }

  ngOnInit() {
    this.RESIZED_CONTENT_PATH = _globals.RESIZED_CONTENT_PATH;
  }

}
