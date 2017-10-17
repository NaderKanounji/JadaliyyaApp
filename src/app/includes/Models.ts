export interface ArticleModel{
  id:number;
  customUrlTitle:string;
  title:string;
  image:string;
  smallDescription:string;
  date:Date;
  isArabic:boolean;
  youtubeLink:string;
  galleryCount:number;
  writer:{
    id:number;
    name:string;
  }
}
export interface SocialMedia{
    title:string;
    link:string;
  }
  
 export interface SharedModel{
    currentRoute:string;
    categoryTitle:string;
    categoryId:number;
    customUrlTitle:string;
    isGoogleApiLoaded:boolean;
    socialMedia:SocialMedia[];
}