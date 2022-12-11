import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActorInfoComponent } from './components/actor-info/actor-info.component';
import { CategorieComponent } from './components/categorie/categorie.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MovieInfoComponent } from './components/movie-info/movie-info.component';
import { RegisterComponent } from './components/register/register.component';
import { SearchComponent } from './components/search/search.component';

const routes: Routes = [
  {path:'login', component:LoginComponent},
  {path:'register', component:RegisterComponent},
  {path:'actorinfo/:credit_id', component:ActorInfoComponent},
  {path:'moviedetails/:id', component:MovieInfoComponent},
  {path:'categorie/:id', component:CategorieComponent},
  {path:'search/:str', component:SearchComponent},
  {path:'', component:HomeComponent},
  {path:'**', component:HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
