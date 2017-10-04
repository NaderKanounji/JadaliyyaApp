import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import { SharedService } from './services/shared.service';


import {_globals} from './includes/globals';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  // styleUrls: ['./app.component.css', './../assets/style.css']
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  headerStructure:string;

  constructor(private sharedService:SharedService, private http:HttpClient){}


  ngOnInit(){
      //this.sharedService.set_shared_model.subscribe(sharedHeaderStructure => this.headerStructure = sharedHeaderStructure);
      //console.log(this.headerStructure);
      this.http.get(_globals.API_URL + 'Data/GetGlobalData').subscribe((data:any) => {
        this.sharedService.set_socialMedia(data['socialMedia']);
        //console.log(data['socialMedia']);
      });
  }

  
}

