export interface UserModel{
  isLogged:boolean;
  user:{
    id:string;
    fullname:string;
    UserName:string;
  }
  token:{
    access_token:string;
    token_type:string;
    expires_in:number;
    refresh_token:string;
  },
  follows:number[]
}
export interface FavoritesModel{
  folders:FolderModel[];
}
export interface FolderModel{
  id:number;
  title:string;
  articles:ArticleModel[];
}

export interface LoginForm{
  username:string;
  password:string;
  grant_type:string;
}
export interface RegisterForm{
  fullName:string;
  identifies:number;
  year:string;
  countryId:number;
  UserName:string;
  password:string;
  ConfirmPassword:string;
}
export interface ContributorsComponentModel{
  writers:WriterModel[];
  jadNavigation:JadNavigationWidget[];
  popularTags:TagModel[];
  featured:ArticleModel[];
  recent:ArticleModel[];
}
export interface ContributorDetailsModel{
  id:number;
  isFollowed:boolean;
  title:string;
  image:string;
  bio:string;
  articleCount:number;
  socialMedia:SocialMediaModel;
  articles:ArticleModel[];
  writerCountries:IntStringModel[];
  writerCategories:IntStringModel[];

  
  jadNavigation:JadNavigationWidget[];
  popularTags:TagModel[];
  featured:ArticleModel[];
  recent:ArticleModel[];
}
export interface JadNavigationWidget{
  id:number;
  title:string;
}
export interface RolesWithWriters{
  title:string;
  writers:WriterModel[];
}
export interface WriterModel{
  id:number;
  name:string;
  title:string;// same as name - to eliminate confusion
  image:string;
  articleCount:number;
  socialMedia:SocialMediaModel;
}
export interface GlobalModel{
  headerCategories:Category[];
  arabicSubCategories:Category[];
  submenuCategories:Category[];
  headerCountries:Country[];
 submenuCountries:Country[];
 footerCategories:Category[];
 footerCountries:Country[];
 mobileLinks:SocialMedia[];
}
export interface FormsData{
  countries:IntStringModel[];
  userIdentifications:IntStringModel[];
}
export interface IntStringModel{
  key:number;
  value:string;
}
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
    id:number;
    title:string;
    link:string;
  }
export interface SocialMediaModel{
    facebook:string;
    twitter:string;
    linkedin:string;
    email:string;
  }
  
 export interface SharedModel{
    headerType:string;
    currentRoute:string;
    categoryTitle:string;
    categoryId:number;
    isArabicSection:boolean;
    displayActions:boolean;
    customUrlTitle:string;
    isGoogleApiLoaded:boolean;
    socialMedia:SocialMedia[];
    country:SharedCountryModel;
    formData:FormsData;
    messagePopup:string;
}

export interface Country{
  id:number;
  title:string;
  customUrlTitle:string;
}
export interface Category{
  id:number,
  title:string,
  isOnMenu:boolean,
  customUrlTitle:string
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