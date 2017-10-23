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
    isArabicSection:boolean;
    customUrlTitle:string;
    isGoogleApiLoaded:boolean;
    socialMedia:SocialMedia[];
    country:SharedCountryModel;
}

export interface TagModel{
  id:number;
  title:string; 
}

export interface FeaturedRecentModel{
  featured:ArticleModel[];
  recent:ArticleModel[];
}
export interface MapMarker{
  latitude:number;
  longitude:number;
  zoom:number;
}

export interface PageModel{
  id:number;
  smallDescription:string;
  email:string;
  twitter:string;
}

export interface Profile{
  id:number;
  name:string;
  image:string;
}

export interface SharedCountryModel{
  id:number;
  hasTemplate:boolean;
  title:string;
  arTitle:string;
  image:string;
}
export interface LabelValueModel{
  label:string;
  value:string;
}
export interface CategoryWithArticles{
  id:number;
  title:string;
  customUrlTitle:string;
  articles:ArticleModel[];
}