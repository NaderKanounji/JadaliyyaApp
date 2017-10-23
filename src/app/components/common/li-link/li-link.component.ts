import { Component, OnInit, Input } from '@angular/core';

import {_globals} from '../../../includes/globals';

@Component({
  selector: '[li-link]',
  templateUrl: './li-link.component.html',
  styleUrls: ['./li-link.component.css']
})
export class LiLinkComponent implements OnInit {
  ARABIC_SECTION_ID:number;
  @Input() model:any;
  @Input() route:string;
  @Input() isArabic:boolean = false;
  constructor() { }

  ngOnInit() {
    this.ARABIC_SECTION_ID = _globals.ARABIC_SECTION_ID;
  }

}
