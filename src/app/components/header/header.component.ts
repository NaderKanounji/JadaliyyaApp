import { Component, OnInit } from '@angular/core';

import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'header-component',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  currentRoute:string;
  
  constructor(private sharedService:SharedService) { }

  ngOnInit() {
    this.sharedService.serviceHeaderStructure.subscribe(sharedHeaderStructure => this.currentRoute = sharedHeaderStructure);
    console.log(this.currentRoute);
  }

}
