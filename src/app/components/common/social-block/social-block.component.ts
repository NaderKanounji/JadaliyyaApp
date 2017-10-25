import { Component, OnInit, Input } from '@angular/core';

import { SocialMedia} from '../../../includes/Models';


@Component({
  selector: '[social-block]',
  templateUrl: './social-block.component.html',
  styleUrls: ['./social-block.component.css']
})
export class SocialBlockComponent implements OnInit {

  @Input() model:SocialMedia[];
  @Input() addClass:boolean = true;
  @Input() showAll:boolean = false;
  constructor() { }

  ngOnInit() {
    if(!this.showAll){
      this.model = this.model.filter(d => d.id != 8 && d.id != 9);
    }
      
    
  }

}
