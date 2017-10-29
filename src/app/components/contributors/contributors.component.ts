import { Component, OnInit, HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { SharedService } from '../../services/shared.service';
import { FunctionsService } from '../../services/functions.service';

import { _globals } from '../../includes/globals';
import { ArticleModel, SocialMedia, SharedModel, ContributorsComponentModel } from '../../includes/Models';

@Component({
  selector: 'app-contributors',
  templateUrl: './contributors.component.html',
  styleUrls: ['./contributors.component.css']
})
export class ContributorsComponent implements OnInit {

  RESIZED_CONTENT_PATH:string;
  sharedModel:SharedModel;
  socialMedia:SocialMedia[];
  contributorsModel:ContributorsComponentModel;

  
  pageNumber:number = 0;
  startScrollLoading:boolean = false;
  isLoadingMore:boolean = false;
  hasMoreToLoad:boolean = true;

  constructor(private myFunctions:FunctionsService, private http:HttpClient, private sharedService:SharedService) { }

  ngOnInit() {
    this.RESIZED_CONTENT_PATH = _globals.RESIZED_CONTENT_PATH;
    this.sharedService.sharedModel.subscribe(sharedModel => this.socialMedia = sharedModel.socialMedia);
    this.sharedService.set_currentRoute("contributors");
    this.sharedService.set_categoryTitle("Authors");
    this.sharedService.set_headerType("header-secondary");

    this.http.get(_globals.API_URL + 'Data/GetWriters').subscribe((data:any) => {
      this.contributorsModel = data;
      setTimeout(() => {
        this.pageNumber++;
        this.startScrollLoading = true;
      },200);
    });
  }
  @HostListener("window:scroll", [])
  onWindowScroll() {
    //console.log(this.startScrollLoading);
    
    
    if(this.startScrollLoading){
      //Load more
      if(this.hasMoreToLoad && this.myFunctions.is_dom_in_view('#load-more-container', 300)){
          if(!this.isLoadingMore){
            this.isLoadingMore = true;
            this.http.get(_globals.API_URL + 'Data/GetWriters?page=' + this.pageNumber).subscribe((data:any) =>{
              if(data.writers != null && data.writers.length){
                this.contributorsModel.writers = this.contributorsModel.writers.concat(data.writers);
                if(data.writers.length < 15){
                  this.hasMoreToLoad = false;
                }
              }else{
                this.hasMoreToLoad = false;
              }
              
              // console.log(data['entries']);
              // console.log(this.listingModel.loadMoreArticles);
              
              this.pageNumber++;
              
              this.isLoadingMore = false;
            });
          }
        
      }
    }
  }
}


