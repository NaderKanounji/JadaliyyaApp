import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(value: ArticleModel[], enCount:number, arCount:number, isArabicFirst:boolean): any {
    enCount = enCount || 1;
    arCount = arCount || 1;
    isArabicFirst = isArabicFirst || false;

    let returnedList:ArticleModel[] = [];
    let arList = value.filter(d => d.isArabic);
    let enList = value.filter(d => !d.isArabic);
    let listArCount = 0, listEnCount = 0;
    let isArListing = isArabicFirst;

    for(let i = 0; i < value.length; i++ ){
      if(i > 0 && !isArListing && listEnCount % enCount == 0 && arList.length > listArCount && i == returnedList.length){
        isArListing = true;
      }else{
        if(i > 0 && isArListing && listArCount % arCount == 0 && enList.length > listEnCount && i == returnedList.length){
          isArListing = false;
        }
      }
      if(isArListing){
        if(arList.length - 1 < listArCount){

          returnedList.push(enList[listEnCount]);
          listEnCount++;
          continue;
        }
        returnedList.push(arList[listArCount]);
        listArCount++;
      }
      if(!isArListing){
        if(enList.length - 1 < listEnCount){

          returnedList.push(arList[listArCount]);
          listArCount++;
          continue;
        }
        returnedList.push(enList[listEnCount]);
        listEnCount++;
      }
    }
    return returnedList;
  }

}

interface ArticleModel{
  id:number;
  customUrlTitle:string;
  title:string;
  image:string;
  smallDescription:string;
  date:Date;
  isArabic:boolean;
  writer:{
    id:number;
    name:string;
  }
}