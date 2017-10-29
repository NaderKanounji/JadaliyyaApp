import { Component, OnInit, Input } from '@angular/core';

import {FunctionsService} from '../../../services/functions.service';
import {TagModel} from '../../../includes/Models';
@Component({
  selector: '[popular-tags-widget]',
  templateUrl: './popular-tags-widget.component.html',
  styleUrls: ['./popular-tags-widget.component.css']
})
export class PopularTagsWidgetComponent implements OnInit {

  @Input() model:TagModel[];
  constructor(private myFunctions: FunctionsService) { }

  ngOnInit() {
    this.myFunctions.tags_widget_init();
  }

}
