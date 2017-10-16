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