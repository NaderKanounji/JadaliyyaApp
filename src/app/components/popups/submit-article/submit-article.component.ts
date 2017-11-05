import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpEventType, HttpResponse } from '@angular/common/http';

import { UserService } from '../../../services/user.service';
import { SharedService } from '../../../services/shared.service';
import { FunctionsService } from '../../../services/functions.service';

import { _globals } from '../../../includes/globals';
import { UserModel, SubmitArticleModel, FormsData, ArticleModel } from '../../../includes/Models';

@Component({
  selector: 'app-submit-article',
  templateUrl: './submit-article.component.html',
  styleUrls: ['./submit-article.component.css']
})
export class SubmitArticleComponent implements OnInit {

  submitArticleModel:SubmitArticleModel;
  formsData:FormsData;
  formErrors:string[] = [];
  uploadedImages:{
    delete_url:string;
    name:string;
    progress:number;
    uniqueIdentifier:number;
    status:string;
  }[];
  identifier:number = 0;
  finalIdentifier:number = -1;
  uploadIndex:number = 0;
  isSubmitted:boolean = false;

  constructor(private userService:UserService, private sharedService:SharedService, private http:HttpClient, private myFunctions:FunctionsService) { 
    this.submitArticleModel ={
      categoryId:null,
      countryId:null,
      description:'',
      images:null,
      quote:'',
      title:'',
      videoUrl:'',
      date:null
    }
    this.uploadedImages = [];
  }

  ngOnInit() {
    this.sharedService.sharedModel.subscribe(mySharedService => this.formsData = mySharedService.formData)
  }

  onSubmit(e, form:SubmitArticleModel){
    e.preventDefault();
    this.formErrors = [];
    this.isSubmitted = true;
    form.images = this.uploadedImages.map(a => a.name)
    const headers = new HttpHeaders().set("Content-Type", "application/json");
    this.http.post(_globals.API_URL + 'Data/SubmitArticle', JSON.stringify(form), {headers}).subscribe((data:ArticleModel) => {
      this.sharedService.set_messagePopup("Thank you!<br/>Your article has been submitted and waiting for approval.");
      this.myFunctions.psy_open_popup('popup-message');
      this.isSubmitted = false;
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

            const req = new HttpRequest('POST', _globals.BASE_API_URL + 'Upload/UploadHandler.ashx?fieldName=images&imagesPathController=Article&IsRemoteUpload=true&hasCaption=False&hasDescription=False&hasCheckbox=False', formData, {
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
