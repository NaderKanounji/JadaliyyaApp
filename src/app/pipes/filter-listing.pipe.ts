import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'myfilter'
})
export class FilterListingPipe implements PipeTransform {

  transform(value: any[], action: string, take:number, skip:number, isSeperated:boolean, isArabic:boolean ): any {
    take = take || 0;
    skip = skip || 0;
    isSeperated = isSeperated || false;
    isArabic = isArabic || false;
    if(action === 'first'){
      let returned = value;
      if(isSeperated){
          returned =  returned.filter(d => d.isArabic == isArabic);
      }
      return value.slice(skip)[0];
    }
    return null;
  }

}
