import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RouterModule }   from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS  }   from '@angular/common/http';
import { Ng2Webstorage } from 'ng2-webstorage';
import { FacebookModule } from 'ngx-facebook';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { ArticleDetailsComponent } from './components/article-details/article-details.component';
import { CategoryComponent } from './components/category/category.component';
import { JoinNewsletterComponent } from './components/common/join-newsletter/join-newsletter.component';
import { PostComponent } from './components/common/post/post.component';
import { TinyPostComponent } from './components/common/tiny-post/tiny-post.component';
import { CountryComponent } from './components/country/country.component';
import { HotOnFacebookComponent } from './components/common/hot-on-facebook/hot-on-facebook.component';
import { LatestAnnouncementsComponent } from './components/common/latest-announcements/latest-announcements.component';
import { MoreStoriesComponent } from './components/common/more-stories/more-stories.component';
import { JadNavWidgetComponent } from './components/common/jad-nav-widget/jad-nav-widget.component';
import { JadNavigationComponent } from './components/jad-navigation/jad-navigation.component';
import { LiLinkComponent } from './components/common/li-link/li-link.component';
import { SocialBlockComponent } from './components/common/social-block/social-block.component';
import { SlideshowComponent } from './components/common/slideshow/slideshow.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { RegisterComponent } from './components/popups/register/register.component';
import { LoginComponent } from './components/popups/login/login.component';
import { AccountComponent } from './components/account/account.component';
import { ForgotPasswordComponent } from './components/popups/forgot-password/forgot-password.component';
import { ContributorsComponent } from './components/contributors/contributors.component';
import { ContributorDetailsComponent } from './components/contributor-details/contributor-details.component';

// Services
import { SharedService } from './services/shared.service';
import { FunctionsService } from './services/functions.service';
import { MembershipService } from './services/membership.service';
import { UserService } from './services/user.service';
import { FolderService } from './services/folder.service';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { SafeUrlPipePipe } from './pipes/safe-url-pipe.pipe';
import { TruncatePipe } from './pipes/truncate.pipe';
import { SocialIconPipe } from './pipes/social-icon.pipe';
import { FilterListingPipe } from './pipes/filter-listing.pipe';
import { SortPipe } from './pipes/sort.pipe';
import { CustomSortPipe } from './pipes/custom-sort.pipe';

//Guards
import { AuthGuard } from './guards/auth.guard';
import { OldDetailsRedirectGuard } from './guards/old-details-redirect.guard';
import { PopularTagsWidgetComponent } from './components/common/popular-tags-widget/popular-tags-widget.component';
import { FavoriteComponent } from './components/popups/favorite/favorite.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { FavoritesActionsComponent } from './components/favorites/favorites-actions/favorites-actions.component';
import { AccountSharedComponent } from './components/account-shared/account-shared.component';
import { AccountArticlesComponent } from './components/account-articles/account-articles.component';
import { SubmitArticleComponent } from './components/popups/submit-article/submit-article.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { SearchComponent } from './components/search/search.component';
import { DetailedNewsletterComponent } from './components/popups/detailed-newsletter/detailed-newsletter.component';
import { GalleryComponent } from './components/common/gallery/gallery.component';
import { SafeHTMLPipe } from './pipes/safe-html.pipe';

var routes = [
  { path: '', component: HomeComponent, pathMatch: 'full'  },
  { path: 'ContactUs', component: ContactUsComponent  },
  { path: 'pages/index/:id/:title', component: ArticleDetailsComponent, canActivate:[OldDetailsRedirectGuard]  },
  { path: 'Pages/index/:id/:title', component: ArticleDetailsComponent, canActivate:[OldDetailsRedirectGuard]  },
  { path: 'Search', component: SearchComponent  },
  { path: 'PrivacyPolicy', component: PrivacyPolicyComponent  },
  { path: 'Account/Articles/:title', component: AccountArticlesComponent, canActivate:[AuthGuard]  },
  { path: 'Account/Favorites', component: FavoritesComponent, canActivate:[AuthGuard]  },
  { path: 'Account/Shared', component: AccountSharedComponent, canActivate:[AuthGuard]  },
  { path: 'Account', component: AccountComponent, canActivate:[AuthGuard]   },
  { path: 'Details/:id', component: ArticleDetailsComponent  },
  { path: 'Details/:id/:title', component: ArticleDetailsComponent  },
  { path: 'Contributor/:id', component: ContributorDetailsComponent  },
  { path: 'Contributors', component: ContributorsComponent  },
  { path: 'Category/:id', component: CategoryComponent  },
  { path: 'Category/:id/:customUrlTitle', component: CategoryComponent  },
  { path: 'Category/:id/:subId/:customUrlTitle', component: CategoryComponent  },
  { path: 'Country/:id', component: CountryComponent  },
  { path: 'Country/:id/:customUrlTitle', component: CountryComponent  },
  { path: 'JadNavigation', component: JadNavigationComponent  },
  { path: 'AboutUs', component: AboutUsComponent  },
  { path: '**', redirectTo:''  }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    ArticleDetailsComponent,
    CategoryComponent,
    SafeUrlPipePipe,
    TruncatePipe,
    SocialIconPipe,
    FilterListingPipe,
    SortPipe,
    CustomSortPipe,
    JoinNewsletterComponent,
    PostComponent,
    TinyPostComponent,
    CountryComponent,
    HotOnFacebookComponent,
    LatestAnnouncementsComponent,
    MoreStoriesComponent,
    JadNavWidgetComponent,
    JadNavigationComponent,
    LiLinkComponent,
    SocialBlockComponent,
    SlideshowComponent,
    AboutUsComponent,
    RegisterComponent,
    LoginComponent,
    AccountComponent,
    ForgotPasswordComponent,
    ContributorsComponent,
    ContributorDetailsComponent,
    PopularTagsWidgetComponent,
    FavoriteComponent,
    FavoritesComponent,
    FavoritesActionsComponent,
    AccountSharedComponent,
    AccountArticlesComponent,
    SubmitArticleComponent,
    PrivacyPolicyComponent,
    ContactUsComponent,
    SearchComponent,
    DetailedNewsletterComponent,
    GalleryComponent,
    SafeHTMLPipe
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    Ng2Webstorage,
    FormsModule,
    FacebookModule.forRoot()
  ],
  providers: [
    SharedService, 
    FunctionsService, 
    SortPipe, 
    CustomSortPipe, 
    MembershipService, 
    UserService, 
    FolderService,
    AuthGuard, 
    OldDetailsRedirectGuard,
    {
      provide: HTTP_INTERCEPTORS, 
      useClass:AuthInterceptorService, 
      multi:true 
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
