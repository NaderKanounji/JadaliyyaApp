import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

import { SharedService } from '../../services/shared.service';
import { FunctionsService } from '../../services/functions.service';

import { _globals } from '../../includes/globals';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  CONTENT_PATH:string;
  RESIZED_CONTENT_PATH:string;

  sharedModel:SharedModel;

  categoryModel:CategoryModel;
  constructor(private http: HttpClient, private route: ActivatedRoute, private sharedService:SharedService, private myFunctions:FunctionsService) { }

  ngOnInit() {
    this.CONTENT_PATH = _globals.CONTENT_PATH;
    this.RESIZED_CONTENT_PATH = _globals.RESIZED_CONTENT_PATH;

    //this.sharedService.serviceHeaderStructure.subscribe(sharedHeaderStructure => this.headerStructure = sharedHeaderStructure);
    this.sharedService.set_currentRoute("category");
    this.sharedService.set_categoryTitle("");

    this.sharedService.alter_wrapper_classes('wrapper-secondary');
    
    this.route.params.subscribe(params => {
      this.http.get(_globals.API_URL + "Data/GetCategoryInit?catId=" + params['id']).subscribe((data:any) =>{
        this.categoryModel = data["category"];
        this.sharedService.set_categoryTitle(this.categoryModel.title);
        //this.sharedService.set_category_title(this.categoryModel.title);
      });
    });
  }
}


interface SharedModel{
    currentRoute:string;
    categoryTitle:string;
  }
interface CategoryModel{
  id:number;
  templateId:number;
  title:string;
  about:string;
  slideshow:[{
    id:number;
    customUrlTitle:string;
    title:string;
    smallDescription:string;
    image:string;
  }]
}
