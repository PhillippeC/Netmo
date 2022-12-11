import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { first, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Film } from '../models/film';
import { Cast } from '../models/cast';
import { Person } from '../models/person';
import { Genre } from '../models/genre';
@Injectable({
  providedIn: 'root'
})
export class TMDBService {

  private api_key:String = "&api_key=";
  
  genreCache:Genre[];
  FilmByGenreCache = {};

  constructor(private http:HttpClient) { }


  getFilm():Observable<Film[]>{
    return this.http.get<any[]>('https://api.themoviedb.org/3/discover/movie?language=fr-FR&sort_by=popularity.desc&page=1' + this.api_key)
    .pipe(
      map (response => {return response["results"];})
    )
  }
  //Request with basic caching because its mostly static content and makes a lot of requests
  getFilmByGenre(genreId:number):Observable<Film[]>{
    if (this.FilmByGenreCache[genreId]) {
      //console.log('Returning cached value!')
      return of(this.FilmByGenreCache[genreId]);
    }
    //console.log('Rerun call')
    return this.http.get<any[]>('https://api.themoviedb.org/3/discover/movie?language=fr-FR&with_genres='+genreId+'&sort_by=popularity.desc&page=1' + this.api_key)
    .pipe(
      map (response => {this.FilmByGenreCache[genreId] = response["results"]; return response["results"];})
    )
  }

  getFilmByName(name): Observable<Film>{
    return this.http.get<Film>('https://api.themoviedb.org/3/movie/'+name+'?append_to_response=videos&language=fr-FR' + this.api_key);
  }

  getFilmReleaseDatesByName(name): Observable<Date>{
    return this.http.get<any>('https://api.themoviedb.org/3/movie/'+name+'/release_dates?language=fr-FR' + this.api_key)
    .pipe(
      map (response => {return new Date(response["results"][0]["release_dates"][0]["release_date"]);})
    )
  }

  getCastByMovie(name): Observable<Cast[]>{
    return this.http.get<any[]>('https://api.themoviedb.org/3/movie/'+name+'/credits?language=fr-FR' + this.api_key)
    .pipe(
      map (response => {return response["cast"];})
    )
  }

  getRecommendationsByMovie(name): Observable<Film[]>{
    return this.http.get<any[]>('https://api.themoviedb.org/3/movie/'+name+'/recommendations?language=fr-FR' + this.api_key)
    .pipe(
      map (response => {return response["results"];})
    )
  }
  getPersonByCredit(credit_id): Observable<Person>{
    return this.http.get<any>('https://api.themoviedb.org/3/credit/'+credit_id+'?language=fr-FR' + this.api_key)
    .pipe(
      map (response => {return response["person"];})
    )
  }
  getMovieCreditsByPersonId(person_id): Observable<Film[]>{
    return this.http.get<any>('https://api.themoviedb.org/3/person/'+person_id+'/movie_credits?language=fr-FR' + this.api_key)
    .pipe(
      map (response => {return response["cast"];})
    )
  }
  getPersonInfoById(person_id): Observable<Person>{
    return this.http.get<any>('https://api.themoviedb.org/3/person/'+person_id+'?language=fr-FR' + this.api_key);
  }

  searchMovie(name):Observable<Film[]>{
    return this.http.get<any[]>('https://api.themoviedb.org/3/search/movie?query='+name+'&language=fr-FR&page=1' + this.api_key)
    .pipe(
      map (response => {return response["results"];})
    )
  }

  //Request with basic caching because its mostly static content
  getGenres():Observable<Genre[]>{
    if (this.genreCache) {
      //console.log('Returning cached value!')
      return of(this.genreCache);
    }
    //console.log('Do the request again')
    return this.http.get<any[]>('https://api.themoviedb.org/3/genre/movie/list?language=fr-FR' + this.api_key)
    .pipe(
      map (response => {this.genreCache = response["genres"]; return response["genres"];})
    );
  }

  getGenreById(id:number):Observable<Genre>{
    return this.getGenres().pipe(map(genres => genres.find(genre => genre.id == id)));
  }
  
}