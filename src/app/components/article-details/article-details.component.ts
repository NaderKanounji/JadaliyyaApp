import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

import { _globals } from '../../includes/globals';
// import * as _globals from '../../includes/globals'; 

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.css']
})
export class ArticleDetailsComponent implements OnInit {
  CONTENT_PATH:string;
  RESIZED_CONTENT_PATH:string;

  articleModel: ArticleModel;
  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit() {
    //console.log(_globals.testvar);
    document.body.classList.add('wrapper-secondary');
    this.route.params.subscribe(params => {
      this.CONTENT_PATH = _globals.CONTENT_PATH;
      this.RESIZED_CONTENT_PATH = _globals.RESIZED_CONTENT_PATH;
      //console.log(params['id']);
      
      this.http.get(_globals.API_URL + "Data/GetDetailsById?id=" + params['id']).subscribe((data:any) =>{
        this.articleModel = data;
      });
   });
  }

}

interface ArticleModel{
  id:number;
  title:string;
  description:string;
  mainImage:string;
  isArabic:boolean;
  middleQuote:string;
  descriptionArr:string[];
  date:Date;
  writer:{
    id:number;
    name:string;
    image:string;
  },
  alsoByAuthor:{
    id:number;
    title:string;
    smallDescription:string;
    mainImage:string;
    date:Date;
    customUrlTitle:string;
    isArabic:boolean;
  },
  relatedStories:{
    id:number;
    title:string;
    mainImage:string;
    customUrlTitle:string;
    isArabic:boolean;
  },
  recentStories:{
    id:number;
    title:string;
    mainImage:string;
    customUrlTitle:string;
    isArabic:boolean;
  },
  tags:{
    id:number;
    title:string;
  },
  nextArticle:{
    id:number;
    title:string;
  }
}
