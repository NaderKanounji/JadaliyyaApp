import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

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
    console.log(_globals.testvar);
    this.route.params.subscribe(params => {
      this.CONTENT_PATH = _globals.CONTENT_PATH;
      this.RESIZED_CONTENT_PATH = _globals.RESIZED_CONTENT_PATH;
      //console.log(params['id']);
      
      this.http.get(_globals.API_URL + "Data/GetDetailsById?id=" + params['id']).subscribe((data:any) =>{
        this.articleModel = data;
        this.articleModel = data;
        //console.log(this.articleModel);
        //console.log(this.slideshow);
      });
   });
  }

}

interface ArticleModel{
  id:number;
  title:string;
  description:string;
  mainImage:string;
  writer:{
    id:number;
    name:string;
    image:string;
  },
  tags:{
    id:number;
    title:string;
  },
  relatedArticles:{
    id:number;
    title:string;
    thumbnail:string;
    smallDescription:string;
    date:string ;
  }
}
