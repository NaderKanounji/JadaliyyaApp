import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RouterModule }   from '@angular/router';
import { HttpClientModule }   from '@angular/common/http';

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

var routes = [
  { path: 'Category/:id', component: CategoryComponent  },
  { path: 'Writer/:id', component: WriterComponent  },
  { path: 'Details/:id', component: ArticleDetailsComponent  },
  { path: '', component: HomeComponent  },
  { path: '**', component: HomeComponent  }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    ArticleDetailsComponent,
    WriterComponent,
    CategoryComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule
  ],
  providers: [SharedService, FunctionsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
