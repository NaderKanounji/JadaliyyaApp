import { Component, OnInit, Input } from '@angular/core';

import { _globals } from '../../../includes/globals';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

  RESIZED_CONTENT_PATH:String;
  @Input() ArticleImages:{
    image:string;
    title:string;
  }
  @Input() videoUrl:String;
  constructor() { }

  ngOnInit() {
    this.RESIZED_CONTENT_PATH = _globals.RESIZED_CONTENT_PATH;
  }

}
