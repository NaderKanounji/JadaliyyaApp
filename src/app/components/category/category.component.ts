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

  headerStructure:string;
  constructor(private http: HttpClient, private route: ActivatedRoute, private sharedService:SharedService, private myFunctions:FunctionsService) { }

  ngOnInit() {
    this.CONTENT_PATH = _globals.CONTENT_PATH;
    this.RESIZED_CONTENT_PATH = _globals.RESIZED_CONTENT_PATH;

    this.sharedService.serviceHeaderStructure.subscribe(sharedHeaderStructure => this.headerStructure = sharedHeaderStructure);
    this.sharedService.changeHeaderStructure("category");

    this.sharedService.alter_wrapper_classes('wrapper-secondary');
  }

}
