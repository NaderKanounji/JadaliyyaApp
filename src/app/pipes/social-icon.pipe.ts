import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'social'
})
export class SocialIconPipe implements PipeTransform {

  transform(value: any, linkClass:boolean = false): string {
    if(value.toLowerCase().includes('twitter')){
      return 'twitter';
    }
    if(value.toLowerCase().includes('facebook')){
      return 'facebook';
    }
    if(value.toLowerCase().includes('youtube')){
      return linkClass ? 'youtube' : 'youtube-play';
    }
    if(value.toLowerCase().includes('vimeo')){
      return 'vimeo';
    }
    if(value.toLowerCase().includes('cloud')){
      return 'cloud';
    }
    return '';
  }

}
