import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customSort'
})
export class CustomSortPipe implements PipeTransform {

  transform(value: ArticleModel[], order:number[], isArabicFirst:boolean): any {
    isArabicFirst = isArabicFirst || false;
    let returnedList:ArticleModel[] = [];
    let arList = value.filter(d => d.isArabic);
    let enList = value.filter(d => !d.isArabic);
    let isArListing = isArabicFirst;
    let arCount = 0, enCount = 0;

     for(let i = 0 ; i < order.length; i++){
    //   if(arList.length <= arCount + 1 || enList.length <= enCount + 1){
    //     if(arList.length <= arCount + 1){
    //       returnedList = returnedList.concat(enList.slice(enCount, enList.length - 1));
    //     }else{
    //       returnedList = returnedList.concat(enList.slice(enCount, enList.length - 1));
    //     }
    //     break;
    //   }else{
        if(isArListing){
          if(arList.length < arCount + order[i]){
            let difference = arList.length - arCount;
            if(difference > 0){
              returnedList = returnedList.concat(arList.slice(arCount, arCount + difference));
            }
            returnedList = returnedList.concat(enList.slice(enCount, enList.length));
            break;
          }
          returnedList = returnedList.concat(arList.slice(arCount, arCount + order[i]));
          arCount += order[i];
          isArListing = false;
        }else{
          if(enList.length < enCount + order[i]){
            let difference = enList.length - enCount;
            if(difference > 0){
              returnedList = returnedList.concat(enList.slice(enCount, enCount + difference));
            }
            returnedList = returnedList.concat(arList.slice(arCount, arList.length));
            break;
          }
          returnedList = returnedList.concat(enList.slice(enCount, enCount + order[i]));
          enCount += order[i];
          isArListing = true;
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