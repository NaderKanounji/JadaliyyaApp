import { Component, OnInit, HostListener } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

import { SharedService } from '../../services/shared.service';
import { FunctionsService } from '../../services/functions.service';
import { UserService } from '../../services/user.service';
import { MembershipService } from '../../services/membership.service';

import { _globals } from '../../includes/globals';
import { ArticleModel, SocialMedia, SharedModel, ContributorDetailsModel, UserModel } from '../../includes/Models';

@Component({
  selector: 'app-contributor-details',
  templateUrl: './contributor-details.component.html',
  styleUrls: ['./contributor-details.component.css']
})
export class ContributorDetailsComponent implements OnInit {

  RESIZED_CONTENT_PATH:string;
  sharedModel:SharedModel;
  socialMedia:SocialMedia[];
  contributorModel:ContributorDetailsModel;
  user:UserModel;

  
  pageNumber:number = 0;
  startScrollLoading:boolean = false;
  isLoadingMore:boolean = false;
  hasMoreToLoad:boolean = true;
  filter:{
    categoryId:number;
    countryId:number;
    keyword:string;
  }
 
  followRequested:boolean = false;

  constructor(private membership:MembershipService, private userService:UserService, private route:ActivatedRoute, private myFunctions:FunctionsService, private http:HttpClient, private sharedService:SharedService) {  
    this.filter = {
      categoryId:0,
      countryId:0,
      keyword:""
    }
   }
//contributor-details
  ngOnInit() {    
    this.RESIZED_CONTENT_PATH = _globals.RESIZED_CONTENT_PATH;
    this.sharedService.sharedModel.subscribe(sharedModel => this.socialMedia = sharedModel.socialMedia);    
    this.userService.user.subscribe(user => this.user = user);
    this.sharedService.set_currentRoute("contributor-details");
    this.sharedService.set_categoryTitle("Authors");
    this.sharedService.set_headerType("header-secondary");

    this.route.params.subscribe(params => {
      this.http.get(_globals.LOCAL_API_URL + 'Data/GetWriterById?id=' + params['id'] + '&firstLoad=true').subscribe((data:any) => {
        this.contributorModel = data;
      setTimeout(() => {
        this.pageNumber++;
        this.startScrollLoading = true;
      },200);
      });
    });
    
  }

  fetch_new_listing(e:Event, form:any){
    console.log(form['countryId']);
    this.isLoadingMore = true;
    this.hasMoreToLoad = true;
    this.pageNumber = 0;
    this.http.get(_globals.API_URL + 'Data/GetWriterById?id=' + this.contributorModel.id + (form.countryId ? '&countryId=' + form.countryId : '') + (form.categoryId ? '&categoryId=' + form.categoryId  : '') + (form.keyword ? '&keyword=' + form.keyword : '')).subscribe((data:any) => {
      if(data.articles != null && data.articles.length){
        this.contributorModel.articles = data.articles;
        if(data.articles.length < 15){
          this.hasMoreToLoad = false;
        }
      }else{
        this.hasMoreToLoad = false;
      }
      
      this.pageNumber++;
      
      this.isLoadingMore = false;
    });
    this.filter = form;
  }
  @HostListener("window:scroll", [])
  onWindowScroll() {
    //console.log(this.startScrollLoading);
    
    
    if(this.startScrollLoading){
      //Load more
      if(this.hasMoreToLoad && this.myFunctions.is_dom_in_view('#load-more-container', 300)){
          if(!this.isLoadingMore){
            this.isLoadingMore = true;
            this.http.get(_globals.API_URL + 'Data/GetWriterById?id=' + this.contributorModel.id + '&page=' + this.pageNumber + (this.filter.countryId ? '&countryId=' + this.filter.countryId : '') + (this.filter.categoryId ? '&categoryId=' + this.filter.categoryId : '') + (this.filter.keyword ? '&keyword=' + this.filter.keyword : '')).subscribe((data:any) =>{
              if(data.articles != null && data.articles.length){
                this.contributorModel.articles = this.contributorModel.articles.concat(data.articles);
                if(data.articles.length < 15){
                  this.hasMoreToLoad = false;
                }
              }else{
                this.hasMoreToLoad = false;
              }
              
              this.pageNumber++;
              
              this.isLoadingMore = false;
            });
          }
        
      }
    }
  }

  ToggleFollow(){
    this.followRequested = true;
    
    if(this.user.follows && this.user.follows.indexOf(this.contributorModel.id) > -1){
      this.membership.UnfollowWriter(this.contributorModel.id).subscribe((data:any) => {
        this.userService.removeFollow(this.contributorModel.id);
        this.contributorModel.isFollowed = false;
        this.followRequested = false;
      }, (err:any) => {
        this.followRequested = false;
      });
    }else{
      this.membership.FollowWriter(this.contributorModel.id).subscribe((data:any) => {
        this.userService.addFollow(this.contributorModel.id);
        this.contributorModel.isFollowed = true;
        this.followRequested = false;
      }, (err:any) => {
        this.followRequested = false;
      });
    }
    
  }

}
