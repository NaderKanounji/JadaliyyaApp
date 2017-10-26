import { Component,OnInit , NgModule } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
//import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms'

import { SharedService } from '../../../services/shared.service';

// import { _globals } from '../../../includes/globals';
import { RegisterForm, SharedModel } from '../../../includes/Models';

import {MembershipService} from '../../../services/membership.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent  implements OnInit{

  registerForm:RegisterForm;
  sharedModel:SharedModel;
  
  constructor(private sharedService:SharedService, private membership: MembershipService) { }

  ngOnInit(){

    this.sharedService.sharedModel.subscribe(sharedModel => this.sharedModel = sharedModel);
    
  } 
}
