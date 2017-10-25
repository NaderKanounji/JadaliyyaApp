import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { SharedService } from '../../services/shared.service';
import { FunctionsService } from '../../services/functions.service';

import { _globals } from '../../includes/globals';
import { RolesWithWriters, SharedModel } from '../../includes/Models';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {

  RESIZED_CONTENT_PATH:string;
  BASE_URL:string;

  model:AboutModel;
  sharedModel:SharedModel;
  constructor(private sharedService:SharedService, private http:HttpClient) { }

  ngOnInit() {
    this.RESIZED_CONTENT_PATH = _globals.RESIZED_CONTENT_PATH;
    this.BASE_URL = _globals.BASE_URL;

    this.sharedService.sharedModel.subscribe(sharedModel => this.sharedModel = sharedModel);
    
    this.sharedService.set_currentRoute("aboutus");
    this.sharedService.set_categoryTitle("About Us");
    this.sharedService.set_headerType("header-secondary");

    this.http.get(_globals.API_URL + 'Data/GetAboutUs').subscribe((data:any) => {
      this.model = data;
      console.log(this.model);
      
    });
  }

}

interface AboutModel{
  title:string;
  subtitle:string;
  descriptions:string[];
  rolesWithWriters:RolesWithWriters[];
  jadaliyyaCoEditor:RolesWithWriters[];
}