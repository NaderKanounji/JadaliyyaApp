import { Component, OnInit, Input } from '@angular/core';
import { _globals } from './../../../includes/globals'; 
import { ArticleModel } from './../../../includes/Models'; 

import { FunctionsService } from './../../../services/functions.service';

@Component({
  selector: '[slideshow]',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.css']
})
export class SlideshowComponent implements OnInit {
  RESIZED_CONTENT_PATH:string;
  @Input() model:ArticleModel[];
  constructor(public myFunctions:FunctionsService) {

 }

  ngOnInit() {
    this.RESIZED_CONTENT_PATH = _globals.RESIZED_CONTENT_PATH;
    this.myFunctions.DestroyAndClearCarousel();
    this.myFunctions.load_slideshow();
  }

}
