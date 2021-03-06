export interface UserModel{
  isLogged:boolean;
  user:{
    id:string;
    fullname:string;
    UserName:string;
    isWriter:boolean;
  }
  token:{
    access_token:string;
    token_type:string;
    expires_in:number;
    refresh_token:string;
  },
  follows:number[],
  writer:{
    articles:number;
    followers:number;
  }
}
export interface ContactInfoModel{
  phone:string;
  address:string;
  email:string;
  marker:MapMarker;
}
export interface ContactFormModel{
  fullName:string;
  countryId:number;
  identifies:number;
  email:string;
  profession:string;
  phone:string;
  inquiryType:number;
  message:string;
}
export interface FavoritesModel{
  folders:FolderModel[];
}
export interface FolderModel{
  id:number;
  title:string;
  articles:ArticleModel[];
}
export interface SharerModel{
  id:number;
  image:string;
  name:string;
}
export interface SharedWithMeModel{
  id:number;
  isFolder:boolean;
  shareDate:Date;
  sharer:SharerModel;
  article:ArticleModel;
  folder:FolderModel;
}
export interface NewsletterModel{
  email:string;
}
export interface NewsletterFormModel{
  name:string;
  email:string;
  countryId:number;
  profession:string;
  phone:string;
}
export interface PasswordModel{
  OldPassword:string;
  ConfirmNewPassword:string;
  NewPassword:string;
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
  website:String;
  twitter:string;
  facebook:string;
  linkedin:string;
  bio:string;
  image:string;
  agreement:string;
  isWriter:boolean;
}

export interface ProfileModel{
  id:string;
  fullname:string;
  identifies:number;
  year:string;
  countryId:number;
  UserName:string;
  password:string;
  ConfirmPassword:string;
  website:String;
  twitter:string;
  facebook:string;
  linkedin:string;
  bio:string;
  image:string;
  isWriter:boolean;
}
export interface ContributorsComponentModel{
  writers:WriterModel[];
  jadNavigation:JadNavigationWidget[];
  popularTags:TagModel[];
  featured:ArticleModel[];
  recent:ArticleModel[];
  banner:BannerModel;
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
export interface StatusModel{
  JadaliyaInterviews:[{
    title:string;
    hostTitle:string;
    arHostTitle:string;
    guestTitle:string;
    arGuestTitle:string;
    imgHost:String;
    imgGuest:string;
    img:string;
    link:string;
  }],
  latestInterviews:[{
    title:string;
    hostTitle:string;
    arHostTitle:string;
    guestTitle:string;
    arGuestTitle:string;
    imgHost:String;
    imgGuest:string;
    img:string;
    link:string;
  }],
  latestPrograms:[{
    id:number;
    title:string;
    arTitle:string;
    description:string;
    smallDescription:string;
    img:string;
    link:string;
  }]
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
export interface BannerModel{
  title:string;
  image:string;
  link:string;
}
export interface FormsData{
  countries:IntStringModel[];
  categories:IntStringModel[];
  articleCountries:IntStringModel[];
  inquiryTypes:IntStringModel[];
  userIdentifications:IntStringModel[];
  agreement:string;
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

  export interface SearchModel{
    countryId:number;
    categoryId:number;
    writerId;
    month:number;
    keyword:string;
    articles:ArticleModel[];
    total:number;
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
    isGoogleMapApiLoaded:boolean;
    socialMedia:SocialMedia[];
    country:SharedCountryModel;
    formData:FormsData;
    messagePopup:string;
    searchCount:number;
}

export interface Country{
  id:number;
  title:string;
  arTitle:string;
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
export interface CorporatePageTreeModel{
  title:string;
  description:string;
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

export interface SubmitArticleModel{
  id:number;
  title:string;
  categoryId:number;
  countryId:number;
  images:string[];
  //file:string;
  videoUrl:string;
  //audioUrl:string;
  quote:string;
  description:string;
  date:Date;
}