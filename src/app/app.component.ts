import { Component, OnInit } from '@angular/core';

import { SharedService } from './services/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  // styleUrls: ['./app.component.css', './../assets/style.css']
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  headerStructure:string;

  constructor(private sharedService:SharedService){}


  ngOnInit(){
      this.sharedService.serviceHeaderStructure.subscribe(sharedHeaderStructure => this.headerStructure = sharedHeaderStructure);
      //console.log(this.headerStructure);
  }

  
}
