import { Component, OnInit } from '@angular/core';
import { Film } from 'src/app/models/film';
import { Genre } from 'src/app/models/genre';
import { TMDBService } from 'src/app/service/tmdb.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  //films:Film[]
  filmsByGenre:Genre[];

  constructor(private TMDB:TMDBService) { }

  ngOnInit(): void {
    this.filmsByGenre = Array<Genre>();
   /* this.TMDB.getFilm().subscribe(e =>{
      this.films = e.filter(f => f.backdrop_path);
    });*/

    //Gets an array of Genre and fills the Film array of each Genre object
    this.TMDB.getGenres().subscribe(genres =>{
      genres.forEach(g => {
        this.TMDB.getFilmByGenre(g.id).subscribe(f => {
          g.films = f.filter(f => f.backdrop_path).slice(0,6);
          this.filmsByGenre.push(g);})
      });
    });
  }

}
