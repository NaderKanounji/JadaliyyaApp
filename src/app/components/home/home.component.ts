import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

  slideshow: HomeSlideShowModel[];
  constructor(private http: HttpClient) { }

  ngOnInit() : void {
    this.CONTENT_PATH = _globals.CONTENT_PATH;
    this.RESIZED_CONTENT_PATH = _globals.RESIZED_CONTENT_PATH;
    this.http.get(_globals.API_URL + "Data/GetHomeSlideshow").subscribe((data:any) =>{
      this.slideshow = data;
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