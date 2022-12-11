import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './components/header/header.component';
import { MovieInfoComponent } from './components/movie-info/movie-info.component';
import { HomeComponent } from './components/home/home.component';
import { RecommendationsComponent } from './components/recommendations/recommendations.component';
import { ActorInfoComponent } from './components/actor-info/actor-info.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { SearchComponent } from './components/search/search.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CategorieComponent } from './components/categorie/categorie.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MovieInfoComponent,
    HomeComponent,
    RecommendationsComponent,
    ActorInfoComponent,
    FooterComponent,
    SearchComponent,
    LoginComponent,
    RegisterComponent,
    CategorieComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
