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
  }[];
  uploadingImages:{
    name:string;
    progress:string;
  }[];
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
  }

  ngOnInit() {
    this.sharedService.sharedModel.subscribe(mySharedService => this.formsData = mySharedService.formData)
  }

  onSubmit(e, form:SubmitArticleModel){
    e.preventDefault();
    this.formErrors = [];
    this.isSubmitted = true;
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
    
    if(fileList.length > 0) {
       // let file: File = fileList[0];
        let formData:FormData = new FormData();
        for (var i = 0; i < fileList.length; i++) {
          formData.append("uploadFile[]", fileList[i]);
          this.uploadingImages.push({
            name:fileList[i].name,
            progress:''
          });
      }
        //formData.append('uploadFile', file, file.name);
        let headers = new HttpHeaders().set('Accept', 'application/json');
        // this.http.request(_globals.BASE_API_URL + 'Upload/UploadHandler.ashx?fieldName=images&imagesPathController=Article&IsRemoteUpload=true&hasCaption=False&hasDescription=False&hasCheckbox=False', formData, {headers})
        //     .subscribe((data:any) => {
        //       console.log('upload return : ');
        //       console.log(data);
              
              
        //     }, (err:any) => {
        //       console.log('upload error : ');
        //       console.log(err);
        //       console.log(err.error);
              
        //     });
            const req = new HttpRequest('POST', _globals.BASE_API_URL + 'Upload/UploadHandler.ashx?fieldName=images&imagesPathController=Article&IsRemoteUpload=true&hasCaption=False&hasDescription=False&hasCheckbox=False', formData, {
              reportProgress: true,
              headers:headers
            });
            this.http.request(req).subscribe(event => {
              // Via this API, you get access to the raw event stream.
              // Look for upload progress events.
              if (event.type === HttpEventType.UploadProgress) {
                // This is an upload progress event. Compute and show the % done:
                const percentDone = Math.round(100 * event.loaded / event.total);
                this.uploadingImages.forEach(element => {
                  element.progress = percentDone.toString();
                });
                //console.log(`File is ${percentDone}% uploaded.`);
                
              } else if (event instanceof HttpResponse) {
                this.uploadingImages = this.uploadingImages.filter(d => fileList.item.name.indexOf(d.name) < 0);
                for(let i = 0; i < fileList.length; i++){
                  this.uploadedImages.push({
                    delete_url:'',
                    name:fileList[i].name
                  });
                }
                this.uploadedImages.push()
                console.log('File is completely uploaded!');
                console.log('upload return : ');
                console.log(event);
              }
            }, (err:any) => {
              console.log('upload error : ');
              console.log(err);
              console.log(err.error);

            });
    }
  }

}
