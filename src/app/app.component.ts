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
      //this.sharedService.set_shared_model.subscribe(sharedHeaderStructure => this.headerStructure = sharedHeaderStructure);
      //console.log(this.headerStructure);
  }

  
}
