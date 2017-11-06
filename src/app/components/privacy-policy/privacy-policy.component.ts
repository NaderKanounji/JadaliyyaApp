import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { SharedService } from '../../services/shared.service';
// import { FunctionsService } from '../../services/functions.service';

import { _globals } from '../../includes/globals';
import { CorporatePageTreeModel } from '../../includes/Models';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.css']
})
export class PrivacyPolicyComponent implements OnInit {

  constructor(private http:HttpClient, private sharedService:SharedService) { }

  policies:CorporatePageTreeModel[];
  ngOnInit() {
    this.sharedService.set_currentRoute("privacy-policy");
    this.sharedService.set_headerType("header-secondary");
    this.sharedService.set_categoryTitle("Privacy Policy");
    
    this.http.get(_globals.API_URL + 'Data/GetPrivacyPolicy').subscribe((data:any) => {
      this.policies = data;
    });
  }

}