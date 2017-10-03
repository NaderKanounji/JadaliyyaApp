import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { SharedService } from '../../services/shared.service';
import { FunctionsService } from '../../services/functions.service';

import { _globals } from '../../includes/globals';

// import * as _globals from '../../includes/globals'; 

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  CONTENT_PATH:string;
  RESIZED_CONTENT_PATH:string;

  //headerStructure:string;

  slideshow: HomeSlideShowModel[];
  constructor(private http: HttpClient, private sharedService:SharedService, private myFunctions:FunctionsService) { }

  ngOnInit() {
    //this.sharedService.serviceHeaderStructure.subscribe(sharedHeaderStructure => this.headerStructure = sharedHeaderStructure);
    this.sharedService.set_currentRoute("home");
    //console.log(this.headerStructure);

    this.sharedService.alter_wrapper_classes('');
    
    this.CONTENT_PATH = _globals.CONTENT_PATH;
    this.RESIZED_CONTENT_PATH = _globals.RESIZED_CONTENT_PATH;
    this.http.get(_globals.API_URL + "Data/GetHomeSlideshow").subscribe((data:any) =>{
      this.slideshow = data;

      this.myFunctions.load_details_page();
      //console.log(this.slideshow);
      //console.log(this.slideshow);
    });
  }

}

interface HomeSlideShowModel {  
    id:number,
    title: string,
    smallDescription: string,
    mainImage: string
}