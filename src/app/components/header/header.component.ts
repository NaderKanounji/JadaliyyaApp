import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'header-component',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  inputs:['headerStructure']
})
export class HeaderComponent implements OnInit {
  public headerStructure:string;
  constructor() { }

  ngOnInit() {
    console.log(this.headerStructure);
  }

}
