import { Component, OnInit, Input } from '@angular/core';
import { FunctionsService } from '../../../services/functions.service';
import {ArticleModel} from '../../../includes/Models';
import {_globals} from '../../../includes/globals';

@Component({
  selector: '[jad-nav-widget]',
  templateUrl: './jad-nav-widget.component.html',
  styleUrls: ['./jad-nav-widget.component.css']
})
export class JadNavWidgetComponent implements OnInit {

  RESIZED_CONTENT_PATH:string;
  @Input() countries;

  constructor(private myFunctions:FunctionsService) { }

  ngOnInit() {
    this.RESIZED_CONTENT_PATH = _globals.RESIZED_CONTENT_PATH;
    this.myFunctions.svg_map_init();
  }

}
