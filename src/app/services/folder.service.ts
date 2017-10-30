import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { SharedModel, FolderModel, FavoritesModel } from '../includes/Models';
import { _globals } from '../includes/globals';
@Injectable()
export class FolderService {

  private folderSource = new BehaviorSubject<FavoritesModel>(
    {folders:[]}
  );
  favoritesModel = this.folderSource.asObservable();
  constructor(private http:HttpClient) { }

  InitFavorites(){
    return this.http.get(_globals.API_URL + 'Data/GetAllFolders?withArticles=true').map(response => response);
  }

  setFolders(folders:FolderModel[]){
    let tempModel = this.folderSource.getValue();
    tempModel.folders = folders;
    this.folderSource.next(tempModel);
  }
  RemoveFolders(ids:number[]){
    let tempModel = this.folderSource.getValue();
    tempModel.folders = tempModel.folders.filter(d => ids.indexOf(d.id) < 0);
    this.folderSource.next(tempModel);
  }
  RemoveArticlesFromFolders(folders:FolderModel[]){
    let tempModel = this.folderSource.getValue();
    for(let i = 0 ; i < folders.length; i++){
      let ids = folders[i].articles.map(a => a.id)
      tempModel.folders[i].articles = tempModel.folders[0].articles.filter(d => ids.indexOf(d.id) < 0);
    }
    this.folderSource.next(tempModel);
  }

  AddFolder(folder:FolderModel){
    let tempModel = this.folderSource.getValue();
    tempModel.folders.push(folder);
    this.folderSource.next(tempModel);
  }
  RenameFolder(folder:FolderModel){
    let tempModel = this.folderSource.getValue();
    let itemToUpdate = tempModel.folders.filter(d => d.id == folder.id)[0];
    let itemIndex =  tempModel.folders.indexOf(itemToUpdate);
    tempModel.folders[itemIndex].title = folder.title; 
    this.folderSource.next(tempModel);
  }
}
