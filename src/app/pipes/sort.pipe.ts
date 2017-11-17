import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(value: ArticleModel[], enCount:number, arCount:number, isArabicFirst:boolean, enSkip:number, arSkip:number): any {
    enCount = enCount || 1;
    arCount = arCount || 1;
    isArabicFirst = isArabicFirst || false;
    enSkip = enSkip || 0;
    arSkip = arSkip || 0;
    let returnedList:ArticleModel[] = [];
    let arList = value.filter(d => d.isArabic).sort(function(a,b){
      return b.date > a.date ? 1 : -1;
    });
    let enList = value.filter(d => !d.isArabic).sort(function(a,b){
      return b.date > a.date ? 1 : -1;
    });
    let listArCount = arSkip, listEnCount = enSkip;
    let isArListing = isArabicFirst;

    for(let i = 0; i < value.length; i++ ){
      if(i > 0 && !isArListing && listEnCount % enCount == 0 && arList.length > listArCount && i == returnedList.length){
        // console.log("isArListing:" + isArListing);
        // console.log("listEnCount:" + listEnCount);
        // console.log("enCount:" + enCount);
        // console.log("arList.length:" + arList.length);
        // console.log("listArCount:" + listArCount);
        // console.log("i:" + i);
        // console.log("returnedList.length:" + returnedList.length);
        isArListing = true;
      }else{
        if(i > 0 && isArListing && listArCount % arCount == 0 && enList.length > listEnCount && i == returnedList.length){
          // console.log("isArListing:" + isArListing);
          // console.log("listArCount:" + listArCount);
          // console.log("arCount:" + arCount);
          // console.log("enList.length:" + enList.length);
          // console.log("listEnCount:" + listEnCount);
          // console.log("i:" + i);
          // console.log("returnedList.length:" + returnedList.length);
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
      //console.log(returnedList);
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