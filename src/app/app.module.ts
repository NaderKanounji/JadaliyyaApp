import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RouterModule }   from '@angular/router';
import { HttpClientModule }   from '@angular/common/http';
import { Ng2Webstorage } from 'ng2-webstorage';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './Components/home/home.component';
import { FooterComponent } from './Components/footer/footer.component';
import { ArticleDetailsComponent } from './Components/article-details/article-details.component';
import { WriterComponent } from './Components/writer/writer.component';
import { CategoryComponent } from './Components/category/category.component';

// Services
import { SharedService } from './services/shared.service';
import { FunctionsService } from './services/functions.service';
import { SafeUrlPipePipe } from './pipes/safe-url-pipe.pipe';
import { TruncatePipe } from './pipes/truncate.pipe';
import { SocialIconPipe } from './pipes/social-icon.pipe';
import { FilterListingPipe } from './pipes/filter-listing.pipe';
import { SortPipe } from './pipes/sort.pipe';
import { JoinNewsletterComponent } from './components/common/join-newsletter/join-newsletter.component';
import { PostComponent } from './Components/common/post/post.component';
import { TinyPostComponent } from './Components/common/tiny-post/tiny-post.component';
import { CountryComponent } from './Components/country/country.component';
import { HotOnFacebookComponent } from './Components/common/hot-on-facebook/hot-on-facebook.component';
import { LatestAnnouncementsComponent } from './Components/common/latest-announcements/latest-announcements.component';
import { JadWidgetComponent } from './components/common/jad-widget/jad-widget.component';

var routes = [
  { path: '', component: HomeComponent, pathMatch: 'full'  },
  { path: 'Details/:id', component: ArticleDetailsComponent  },
  { path: 'Details/:id/:title', component: ArticleDetailsComponent  },
  { path: 'Writer/:id', component: WriterComponent  },
  { path: 'Category/:id', component: CategoryComponent  },
  { path: 'Category/:id/:customUrlTitle', component: CategoryComponent  },
  { path: 'Category/:id/:subId/:customUrlTitle', component: CategoryComponent  },
  { path: 'Country/:id', component: CategoryComponent  },
  { path: 'Country/:id/:customUrlTitle', component: CategoryComponent  },
  { path: '**', redirectTo:''  }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    ArticleDetailsComponent,
    WriterComponent,
    CategoryComponent,
    SafeUrlPipePipe,
    TruncatePipe,
    SocialIconPipe,
    FilterListingPipe,
    SortPipe,
    JoinNewsletterComponent,
    PostComponent,
    TinyPostComponent,
    CountryComponent,
    HotOnFacebookComponent,
    LatestAnnouncementsComponent,
    JadWidgetComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    Ng2Webstorage
  ],
  providers: [SharedService, FunctionsService, SortPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
