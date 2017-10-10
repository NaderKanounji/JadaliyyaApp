import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-join-newsletter',
  templateUrl: './join-newsletter.component.html',
  styleUrls: ['./join-newsletter.component.css']
})
export class JoinNewsletterComponent {

  submitted:boolean = false;
  constructor(private http:HttpClient) { }

  model = new newsletter('nkanounji@koein.com');

  onSubmit() { this.submitted = true; }
  
  //get diagnostic() { return JSON.stringify(this.model); }
}


export class newsletter{
  constructor(
    public email:string
  ){}
}