import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';

import { SharedService } from '../../services/shared.service';
import { UserService } from '../../services/user.service';
import { MembershipService } from '../../services/membership.service';
import { FunctionsService } from '../../services/functions.service';


import { _globals } from '../../includes/globals';
import { GlobalModel, ArticleModel, SharedModel, Category, Country, UserModel } from '../../includes/Models';

@Component({
  selector: 'header-component',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  CONTENT_PATH:string;
  RESIZED_CONTENT_PATH:string;
  ARABIC_SECTION_ID:number;
  ROUNDUPS_CATEGORY_ID:number;
  ARABIAN_PENINSULA:number;
  ROUNDUPS_MEDIA_URL_TITLE:string;
  ROUNDUPS_MONTHLY_URL_TITLE:string;

  headerType:string = "";
  routeId:number;
  customUrlTitle:string;
  user:UserModel;
  keyword:string = '';


  sharedModel:SharedModel;

  @Input() globalModel:GlobalModel;
  
  headerCategoryArticles:[ArticleModel[]] = [[]];
  constructor(private router:Router,private membership:MembershipService,private userService:UserService, private route: ActivatedRoute, private sharedService:SharedService, private http:HttpClient, private myFunction:FunctionsService) { }

  ngOnInit() {
    
    this.CONTENT_PATH = _globals.CONTENT_PATH;
    this.RESIZED_CONTENT_PATH = _globals.RESIZED_CONTENT_PATH;
    this.ARABIC_SECTION_ID = _globals.ARABIC_SECTION_ID;
    this.ROUNDUPS_CATEGORY_ID = _globals.ROUNDUPS_CATEGORY_ID;
    this.ROUNDUPS_MEDIA_URL_TITLE = _globals.ROUNDUPS_MEDIA_URL_TITLE;
    this.ROUNDUPS_MONTHLY_URL_TITLE = _globals.ROUNDUPS_MONTHLY_URL_TITLE;
    this.ARABIAN_PENINSULA = _globals.ARABIAN_PENINSULA;
    
    this.sharedService.sharedModel.subscribe((sharedModel:any) => this.sharedModel = sharedModel);

    this.userService.user.subscribe(user => this.user = user);
    // this.route.params.subscribe(params => {
    //   if(params['customUrlTitle']){
    //     this.customUrlTitle = params['customUrlTitle'];
    //   }
    // });
    // setTimeout(function(){
    //   console.log(this.sharedModel);
    // },5000);
    //this.sharedService.categoryTitle.subscribe(categoryTitle => this.categoryTitle = categoryTitle);
    //console.log(this.currentRoute);

       //this.myFunction.header_bindings();


    // this.http.get(_globals.API_URL + "Data/GetHeader").subscribe((data:any) =>{
    //   this.headerCategories = data.categories.filter(d => d.isOnMenu == true && d.id != _globals.ARABIC_SECTION_ID).slice(0, 10);
    //   this.submenuCategories = data.categories.filter(d => d.isOnMenu == true && d.id != _globals.ARABIC_SECTION_ID).slice(10);
    
    //   this.submenuCategories = this.submenuCategories.concat(data.categories.filter(d => !d.isOnMenu == true && d.id != _globals.ARABIC_SECTION_ID));
    //   this.headerSubCategories = data.subcategories;
    //   //console.log(this.submenuCategories);
    //   this.headerCountries = data.countries.slice(0, 6);
    //   this.submenuCountries = data.countries.slice(6);
    //   this.myFunction.header_bindings();
    // });
  }

  load_cat_articles(catId:number, catNumber:number){
    if(!(this.headerCategoryArticles != undefined && this.headerCategoryArticles[catNumber] != undefined && this.headerCategoryArticles[catNumber].length)){
      this.http.get(_globals.API_URL + "Data/GetHeaderCategoryArticles?catId=" + catId).subscribe((data:any) =>{
          this.headerCategoryArticles[catNumber] = data;
          //console.log(this.headerCategoryArticles);
          //console.log(this.headerCategoryArticles[catId]);
        
      });
    }
  }
  openSubMenu(){
    this.myFunction.openSubMenu();
  }
  open_search(){
    this.myFunction.open_search();
  }
  submit_search(e, form:any){
    e.preventDefault();
    if(form.keyword){
      let navigationExtras: NavigationExtras = {
        queryParams: { 'keyword': form.keyword }
      };
      this.router.navigate(['/Search'], navigationExtras);
      this.keyword = '';
    }
  }

}


interface HeaderCategoryArr{
  articles: ArticleModel[];
}
interface SocialMedia{
  title:string;
  link:string;
}