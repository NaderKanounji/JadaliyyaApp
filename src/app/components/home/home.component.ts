import { Component, OnInit, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { SharedService } from '../../services/shared.service';

import { _globals } from '../../includes/globals';

// import * as _globals from '../../includes/globals'; 

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  outputs:['headerStructure']
})
export class HomeComponent implements OnInit {
  CONTENT_PATH:string;
  RESIZED_CONTENT_PATH:string;

  headerStructure = new EventEmitter<string>();

  slideshow: HomeSlideShowModel[];
  constructor(private http: HttpClient, private sharedService:SharedService) { }

  ngOnInit() : void {
    this.headerStructure.emit('home-emmitted');
    this.sharedService.alter_wrapper_classes('');
    
    this.CONTENT_PATH = _globals.CONTENT_PATH;
    this.RESIZED_CONTENT_PATH = _globals.RESIZED_CONTENT_PATH;
    this.http.get(_globals.API_URL + "Data/GetHomeSlideshow").subscribe((data:any) =>{
      this.slideshow = data;
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