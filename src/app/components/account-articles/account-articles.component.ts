import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpEventType, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

import { SharedService } from '../../services/shared.service';
import { FolderService } from '../../services/folder.service';
import { FunctionsService } from '../../services/functions.service';
import { MembershipService } from '../../services/membership.service';

import { _globals } from '../../includes/globals';
import { SharedModel, ArticleModel, FormsData, SubmitArticleModel  } from '../../includes/Models';

@Component({
  selector: 'app-account-articles',
  templateUrl: './account-articles.component.html',
  styleUrls: ['./account-articles.component.css']
})
export class AccountArticlesComponent implements OnInit {


  RESIZED_CONTENT_PATH:string;
  
  sharedModel:SharedModel;
  isPublishedSection:boolean = true;
  // initLoadDone:boolean = false;
  articles:ArticleModel[];
  deleteArticleId:number;
  deleteArticleTitle:string;
  isDeletingArticleWriter:boolean = false;
  isFetchingEdit:boolean = false;


  submitArticleModel:SubmitArticleModel;
  formsData:FormsData;
  formErrors:string[] = [];
  isSubmitted:boolean = false;
  editedArticleId:number;
  uploadedImages:{
    delete_url:string;
    name:string;
    progress:number;
    uniqueIdentifier:number;
    status:string;
  }[];
  identifier:number = 0;
  finalIdentifier:number = -1;
  
  constructor(private route:ActivatedRoute, private membership: MembershipService, private folder:FolderService, private myFunctions:FunctionsService, private http:HttpClient, private sharedService: SharedService) {
    
    this.submitArticleModel ={
      id:null,
      categoryId:null,
      countryId:null,
      description:'',
      images:null,
      quote:'',
      title:'',
      videoUrl:'',
      date:null
    };
    this.uploadedImages = [];
   }

  ngOnInit() {
    this.RESIZED_CONTENT_PATH = _globals.RESIZED_CONTENT_PATH;

    this.sharedService.sharedModel.subscribe((sharedModel:any) => this.sharedModel = sharedModel);
    this.sharedService.sharedModel.subscribe(mySharedService => this.formsData = mySharedService.formData)

    
    this.route.params.subscribe(params => {
      this.sharedService.set_currentRoute("published-articles");
      this.sharedService.set_headerType("header-secondary");
      this.sharedService.set_categoryTitle("My Articles");
      if(params['title']){
        if(params['title'].toLowerCase() == 'unpublished'){
          this.isPublishedSection = false;
          this.sharedService.set_currentRoute("unpublished-articles");
        }else{
          this.isPublishedSection = true;
          this.sharedService.set_currentRoute("published-articles");
        }
      }
      this.http.get(_globals.API_URL + 'Data/GetWriterArticles?isPublished=' + this.isPublishedSection).subscribe((data:any) => {
        
            this.articles = data;
            this.myFunctions.psy_popup();
            
          });
      
    });
    
  }

  delete_post(id:number, title:string){
    if(!this.isDeletingArticleWriter){
      this.deleteArticleTitle = title;
      this.deleteArticleId = id;
      this.myFunctions.psy_open_popup('popup-delete-post');
    }
  }
  delete_post_confirmed(id:number){
    let title = this.deleteArticleTitle;
    this.isDeletingArticleWriter = true;
    this.http.delete(_globals.API_URL + 'Data/DeleteWriterArticle?id=' + this.deleteArticleId).subscribe(data => {

      this.sharedService.set_messagePopup(title + ' has been deleted!');
      this.myFunctions.psy_open_popup('popup-message');
      this.articles = this.articles.filter(d => d.id != id);
      this.isDeletingArticleWriter = false;
    }, (err : any) => {
      if(err.error.message){
        this.sharedService.set_messagePopup(err.error.message);
      }else{
        this.sharedService.set_messagePopup(err.error);
      }
      this.myFunctions.psy_open_popup('popup-message');
      this.isDeletingArticleWriter = false;
    });
  }
  edit_post(id:number){
    
    this.isFetchingEdit = true;
    this.http.get(_globals.API_URL + 'Data/GetWriterArticle?id=' + id).subscribe((data:any) => {
      this.editedArticleId = id;
      this.submitArticleModel = data;
      this.uploadedImages = data.images;
      this.myFunctions.psy_open_popup('popup-edit-post');

      this.isFetchingEdit = false;
    }, (err : any) => {
      if(err.error.message){
        this.sharedService.set_messagePopup(err.error.message);
      }else{
        this.sharedService.set_messagePopup(err.error);
      }
      this.myFunctions.psy_open_popup('popup-message');
      this.isFetchingEdit = false;
    });
  }

  submit_edit(e, form:SubmitArticleModel){

    e.preventDefault();
    this.formErrors = [];
    this.isSubmitted = true;
    form.images = this.uploadedImages.map(a => a.name)
    form.id = this.editedArticleId;
    const headers = new HttpHeaders().set("Content-Type", "application/json");
    this.http.put(_globals.API_URL + 'Data/EditArticle', JSON.stringify(form), {headers}).subscribe((data:ArticleModel) => {
      this.sharedService.set_messagePopup("Thank you!<br/>Your article has been updated & waiting for approval.");
      this.myFunctions.psy_open_popup('popup-message');
      this.isSubmitted = false;
      this.submitArticleModel ={
        id:null,
        categoryId:null,
        countryId:null,
        description:'',
        images:null,
        quote:'',
        title:'',
        videoUrl:'',
        date:null
      }
    }, (err:any) => {
      this.isSubmitted = false;
      this.formErrors.push(err.error.message);
    });
  }



  fileChange(event){
    let fileList: FileList = event.target.files;
    console.log(fileList);
    let identifier = this.identifier++;
    if(fileList.length > 0) {
       // let file: File = fileList[0];
        let formData:FormData = new FormData();
        for (var i = 0; i < fileList.length; i++) {
          formData.append("uploadFile[]", fileList[i]);
          this.uploadedImages.push({
            name:fileList[i].name,
            progress:0,
            delete_url:'',
            uniqueIdentifier:identifier,
            status:'uploading'
          });
      }
        //formData.append('uploadFile', file, file.name);
        let headers = new HttpHeaders().set('Accept', 'application/json');

            const req = new HttpRequest('POST', _globals.API_URL + 'Upload/UploadFiles?inputName=images&directory=Article&hasCaption=False&hasDescription=False&hasCheckbox=False&maxNumberOfFiles=99', formData, {
              reportProgress: true,
              headers:headers
            });
            this.http.request(req).subscribe(event => {
              if (event.type === HttpEventType.UploadProgress) {
                const percentDone = Math.round(100 * event.loaded / event.total);
                // this.uploadedImages.find(d=> d.uniqueIdentifier == identifier).progress = percentDone;
                this.uploadedImages.filter(d => d.uniqueIdentifier == identifier).forEach(element => {
                  element.progress = percentDone;
                });
                
              } else if (event instanceof HttpResponse) {
                this.uploadedImages = this.uploadedImages.filter(d=> d.uniqueIdentifier != identifier);
                for(let i = 0 ; i < fileList.length; i++){
                  this.uploadedImages.push({
                    delete_url: event.body[i]['delete_url'],
                    progress: 100,
                    name: event.body[i]['name'],
                    uniqueIdentifier: this.finalIdentifier--,
                    status:'done'
                  })
                }
              }
            }, (err:any) => {
              // console.log('upload error : ');
              // console.log(err);
              // console.log(err.error);

            });
    }
  }

  delete_image(id){
    let delete_url = this.uploadedImages.find(d => d.uniqueIdentifier == id).delete_url;
    this.http.delete(delete_url);
    this.uploadedImages = this.uploadedImages.filter(d=> d.uniqueIdentifier != id);
  }

}
